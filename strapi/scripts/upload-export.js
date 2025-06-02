#!/usr/bin/env node

const fs = require('fs');
const FormData = require('form-data');
const axios = require('axios');
const path = require('path');

async function uploadExportFile() {
  try {
    const exportFile = path.join(__dirname, '..', 'export_20250602163313.tar.gz');
    
    if (!fs.existsSync(exportFile)) {
      console.error('Export file not found:', exportFile);
      process.exit(1);
    }

    console.log('🚀 Uploading export file to production...');
    
    const form = new FormData();
    form.append('files', fs.createReadStream(exportFile));
    
    const response = await axios.post(
      'https://iconta24-strapi.onrender.com/api/upload',
      form,
      {
        headers: {
          ...form.getHeaders(),
          'Authorization': 'Bearer 149eb80d97141b1d756b734c3ca7e28e11b47f4cc699ddad27d2fd055a3a192b1b7192863feac00815d3bad4551519d8fa0b1a8ac2e765ec4a1363630c7094f7298d8c76cf5335bef607a9d5668f807f08ce6b4393f8b8bd4dd0fad1c6ebca2dc096d23064af44e93f013abf8ed0a632a8f499f1173db7b8be7ef0d81a3e5947'
        }
      }
    );
    
    console.log('✅ File uploaded successfully:', response.data);
    console.log('📁 File URL:', response.data[0]?.url);
    
  } catch (error) {
    console.error('❌ Upload failed:', error.response?.data || error.message);
  }
}

uploadExportFile();