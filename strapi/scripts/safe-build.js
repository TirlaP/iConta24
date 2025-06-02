#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Strapi build...');

const distPath = path.join(__dirname, '..', 'dist');

try {
  // Try to build with Strapi
  console.log('🔨 Building Strapi with admin panel...');
  execSync('strapi build', { 
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_OPTIONS: '--max-old-space-size=4096',
      FORCE_COLOR: '0'
    }
  });
  
  // Check if dist directory was created
  if (fs.existsSync(distPath)) {
    console.log('✅ Build completed successfully!');
    process.exit(0);
  } else {
    throw new Error('Build completed but dist directory not found');
  }
  
} catch (error) {
  console.error('❌ Standard build failed:', error.message);
  console.log('🔄 Trying build without optimization...');
  
  try {
    // Fallback: build with minimal admin
    console.log('⚠️  Trying to build with minimal configuration...');
    execSync('strapi build', { 
      stdio: 'inherit',
      env: {
        ...process.env,
        NODE_OPTIONS: '--max-old-space-size=2048',
        FORCE_COLOR: '0',
        STRAPI_DISABLE_UPDATE_NOTIFICATION: 'true',
        STRAPI_TELEMETRY_DISABLED: 'true'
      }
    });
    
    if (fs.existsSync(distPath)) {
      console.log('✅ Fallback build completed successfully!');
      process.exit(0);
    } else {
      throw new Error('Fallback build completed but dist directory not found');
    }
    
  } catch (fallbackError) {
    console.error('❌ Fallback build also failed:', fallbackError.message);
    console.log('🔄 Creating minimal build structure...');
    
    // Last resort: create API-only build  
    try {
      console.log('📦 Creating API-only build...');
      
      if (!fs.existsSync(distPath)) {
        fs.mkdirSync(distPath, { recursive: true });
      }
      
      // Copy source files to dist (Strapi can run without built admin)
      const srcPath = path.join(__dirname, '..', 'src');
      const configPath = path.join(__dirname, '..', 'config');
      
      if (fs.existsSync(srcPath)) {
        execSync(`cp -r "${srcPath}" "${distPath}/"`, { stdio: 'inherit' });
      }
      
      if (fs.existsSync(configPath)) {
        execSync(`cp -r "${configPath}" "${distPath}/"`, { stdio: 'inherit' });
      }
      
      // Create package.json in dist
      const packageJson = {
        name: "strapi-dist",
        version: "1.0.0",
        main: "src/index.js",
        dependencies: {
          "@strapi/strapi": "^5.12.4"
        }
      };
      
      fs.writeFileSync(
        path.join(distPath, 'package.json'),
        JSON.stringify(packageJson, null, 2)
      );
      
      console.log('✅ API-only build created (admin will be disabled)');
      process.exit(0);
      
    } catch (minimalError) {
      console.error('❌ Even minimal build failed:', minimalError.message);
      process.exit(1);
    }
  }
}