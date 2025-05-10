/**
 * Dependency update utility for bhabit-ui
 * Run with: node scripts/update-deps.js
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
  // Update all dependencies to latest versions
  console.log('Updating dependencies to their latest versions...');
  execSync('npx npm-check-updates -u', { stdio: 'inherit' });
  
  // Install updated dependencies
  console.log('\nInstalling updated dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  
  // Run security audit
  console.log('\nRunning security audit...');
  execSync('npm audit', { stdio: 'inherit' });
  
  console.log('\nDependency update complete!');
} catch (error) {
  console.error('Update failed:', error.message);
  process.exit(1);
}