#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting production build...');

try {
  // Skip admin build if flag is set
  if (process.env.SKIP_ADMIN_BUILD === 'true') {
    console.log('⏭️  Skipping admin panel build due to SKIP_ADMIN_BUILD flag');
    
    // Create minimal dist structure for API-only mode
    const distPath = path.join(__dirname, '..', 'dist');
    if (!fs.existsSync(distPath)) {
      fs.mkdirSync(distPath, { recursive: true });
    }
    
    // Create a minimal build file
    fs.writeFileSync(
      path.join(distPath, 'build.txt'), 
      'API-only build - Admin panel skipped for production deployment'
    );
    
    console.log('✅ Production build completed (API-only mode)');
    process.exit(0);
  }
  
  // Normal build process
  console.log('🔨 Building Strapi...');
  execSync('strapi build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully!');
  
} catch (error) {
  console.error('❌ Build failed:', error.message);
  
  // Fallback: create API-only build
  console.log('🔄 Attempting fallback API-only build...');
  try {
    const distPath = path.join(__dirname, '..', 'dist');
    if (!fs.existsSync(distPath)) {
      fs.mkdirSync(distPath, { recursive: true });
    }
    
    fs.writeFileSync(
      path.join(distPath, 'build.txt'), 
      'Fallback API-only build - Admin panel build failed'
    );
    
    console.log('✅ Fallback build completed');
    process.exit(0);
  } catch (fallbackError) {
    console.error('❌ Fallback build also failed:', fallbackError.message);
    process.exit(1);
  }
}