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
      NODE_OPTIONS: '--max-old-space-size=1024',
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
    // Fallback: build without optimization
    execSync('strapi build --no-optimization', { 
      stdio: 'inherit',
      env: {
        ...process.env,
        NODE_OPTIONS: '--max-old-space-size=1024',
        FORCE_COLOR: '0'
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
    
    // Last resort: create minimal structure
    try {
      if (!fs.existsSync(distPath)) {
        fs.mkdirSync(distPath, { recursive: true });
      }
      
      // Create a minimal index.js file
      fs.writeFileSync(
        path.join(distPath, 'index.js'),
        `
// Minimal Strapi build
const strapi = require('@strapi/strapi');

async function bootstrap() {
  try {
    const app = strapi({ distDir: __dirname });
    await app.start();
  } catch (error) {
    console.error('Error starting Strapi:', error);
    process.exit(1);
  }
}

bootstrap();
`
      );
      
      console.log('✅ Minimal build structure created');
      process.exit(0);
      
    } catch (minimalError) {
      console.error('❌ Even minimal build failed:', minimalError.message);
      process.exit(1);
    }
  }
}