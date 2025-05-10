/**
 * Checks dependencies for all bhabit projects
 * Run with: node check-all-deps.js
 * Run with update flag: node check-all-deps.js update
 */
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

// Remove root directory ('.') from the list since it doesn't have a package.json
const projects = ['bhabit-web', 'bhabit-ui', 'bhabit-polished-ui'];
const originalDir = process.cwd();
const shouldUpdate = process.argv.includes('update');

// Check for lockfile and create if missing - fixed implementation
function ensureLockfile(projectPath) {
  const lockfilePath = path.join(projectPath, 'package-lock.json');
  const packageJsonPath = path.join(projectPath, 'package.json');
  
  // Skip if no package.json exists
  if (!fs.existsSync(packageJsonPath)) {
    console.log(`\nSkipping lockfile creation - no package.json found in ${projectPath}`);
    return false;
  }
  
  if (!fs.existsSync(lockfilePath)) {
    console.log('\n⚠️ No package-lock.json found. Creating one...');
    try {
      // Add proper cwd to make sure we're in the right directory
      execSync('npm install --package-lock-only', { 
        stdio: 'inherit',
        cwd: projectPath 
      });
      console.log('✅ package-lock.json created successfully');
      return true;
    } catch (error) {
      console.error('❌ Failed to create package-lock.json:', error.message);
      return false;
    }
  }
  return true;
}

projects.forEach(project => {
  const projectPath = path.join(__dirname, project);
  
  if (!fs.existsSync(projectPath)) {
    console.log(`\nSkipping ${project} - directory not found`);
    return;
  }
  
  // Skip if no package.json exists
  if (!fs.existsSync(path.join(projectPath, 'package.json'))) {
    console.log(`\nSkipping ${project} - no package.json found`);
    return;
  }
  
  console.log(`\n====== Checking dependencies for ${project} ======`);
  
  try {
    // Run within the project directory
    process.chdir(projectPath);
    
    // Check for outdated packages
    try {
      console.log('Checking for outdated dependencies...');
      execSync('npm outdated', { stdio: 'inherit' });
    } catch (e) {
      // npm outdated exits with code 1 if outdated deps exist
      console.log('Some dependencies need updating.');
    }
    
    // Check for security vulnerabilities (ensure lockfile exists first)
    if (ensureLockfile(projectPath)) {
      try {
        console.log('\nChecking for security vulnerabilities...');
        execSync('npm audit', { 
          stdio: 'inherit',
          cwd: projectPath // Always specify cwd to avoid directory issues
        });
      } catch (e) {
        console.log('Security audit found issues.');
      }
    }
    
    // Add update functionality if requested
    if (shouldUpdate) {
      console.log('\nUpdating dependencies...');
      try {
        execSync('npm update', { 
          stdio: 'inherit',
          cwd: projectPath 
        });
        console.log('✅ Dependencies updated successfully');
      } catch (error) {
        console.error('❌ Failed to update dependencies:', error.message);
      }
    }
    
  } catch (error) {
    console.error(`Error checking ${project}:`, error.message);
  } finally {
    // Return to original directory
    process.chdir(originalDir);
  }
});

// Run a project-wide audit at the end from the root directory
console.log('\n====== Running project-wide security audit ======');
try {
  execSync('npm audit', { stdio: 'inherit' });
} catch (e) {
  console.log('Security audit found issues in nested packages.');
}

console.log('\nDependency check complete for all projects!');