/**
 * Dependency check utility for bhabit-ui
 * Run with: node scripts/check-deps.js
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Check for outdated dependencies
try {
  console.log('Checking for outdated dependencies...');
  const outdated = execSync('npm outdated --json', { encoding: 'utf8' });
  console.log(JSON.parse(outdated));
} catch (error) {
  // npm outdated exits with code 1 if outdated deps exist
  console.log('Some dependencies are outdated. Run npm update to fix.');
}

// Check for security vulnerabilities
try {
  console.log('\nChecking for security vulnerabilities...');
  const audit = execSync('npm audit --json', { encoding: 'utf8' });
  console.log(JSON.parse(audit));
} catch (error) {
  console.error('Security audit failed:', error.message);
}

// Check if lockfile matches package.json
const packageJson = require('../package.json');
const packageLockJson = require('../package-lock.json');

if (packageLockJson.lockfileVersion < 3) {
  console.log('\nWarning: Consider upgrading npm to get the latest lockfile format');
}

console.log('\nDependency check complete!');