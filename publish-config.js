#!/usr/bin/env node

/**
 * Nexus Repository Publishing Configuration
 * This script helps publish your Recipe Finder project to Nexus
 */

const fs = require('fs');

// Configuration
const NEXUS_URL = 'http://localhost:8081';
const NPM_HOSTED_REPO = 'npm-hosted';
const NPM_GROUP_REPO = 'npm-group';

console.log('🍳 Recipe Finder - Nexus Publishing Setup');
console.log('==========================================');

// Check if package.json exists
if (!fs.existsSync('package.json')) {
  console.error('❌ package.json not found. Please run this from the project root.');
  process.exit(1);
}

// Read package.json
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

console.log(`📦 Project: ${packageJson.name}`);
console.log(`📋 Version: ${packageJson.version}`);
console.log(`🔗 Nexus URL: ${NEXUS_URL}`);

// Update package.json for publishing
if (packageJson.private) {
  console.log('⚠️  Package is marked as private. Removing private flag for publishing...');
  delete packageJson.private;
  fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
}

// Add repository information
packageJson.repository = {
  type: 'git',
  url: 'https://github.com/YOUR_USERNAME/recipe-finder.git'
};

packageJson.publishConfig = {
  registry: `${NEXUS_URL}/repository/${NPM_HOSTED_REPO}/`
};

fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));

console.log('✅ Package configuration updated for Nexus publishing');
console.log('');
console.log('📝 Next steps:');
console.log('1. Update the repository URL in package.json with your actual GitHub URL');
console.log('2. Configure authentication in .npmrc');
console.log('3. Run: npm publish');
console.log('');
console.log('🔐 Authentication setup:');
console.log('   - Go to Nexus UI → Security → Users');
console.log('   - Create a user with npm publishing permissions');
console.log('   - Update .npmrc with the auth token');
