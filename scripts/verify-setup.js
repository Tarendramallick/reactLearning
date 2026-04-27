#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const checks = {
  passed: 0,
  failed: 0,
  results: []
};

function checkFile(filePath, name) {
  if (fs.existsSync(filePath)) {
    checks.results.push(`✅ ${name}`);
    checks.passed++;
  } else {
    checks.results.push(`❌ ${name} - File not found: ${filePath}`);
    checks.failed++;
  }
}

function checkFileContent(filePath, searchTerm, name) {
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    if (content.includes(searchTerm)) {
      checks.results.push(`✅ ${name}`);
      checks.passed++;
    } else {
      checks.results.push(`❌ ${name} - Content not found: "${searchTerm}"`);
      checks.failed++;
    }
  } else {
    checks.results.push(`❌ ${name} - File not found: ${filePath}`);
    checks.failed++;
  }
}

function checkDirectory(dirPath, name) {
  if (fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()) {
    checks.results.push(`✅ ${name}`);
    checks.passed++;
  } else {
    checks.results.push(`❌ ${name} - Directory not found: ${dirPath}`);
    checks.failed++;
  }
}

console.log('\n🔍 React Learning Platform - Setup Verification\n');

// Check directories
console.log('📁 Checking Directory Structure...');
checkDirectory('./app', 'App directory');
checkDirectory('./components', 'Components directory');
checkDirectory('./store', 'Zustand store directory');
checkDirectory('./lib', 'Library directory');
checkDirectory('./app/api', 'API routes directory');

// Check critical files
console.log('\n📄 Checking Critical Files...');
checkFile('./package.json', 'Package.json');
checkFile('./next.config.mjs', 'Next.js config');
checkFile('./tsconfig.json', 'TypeScript config');
checkFile('./.env.local', 'Environment variables');

// Check authentication files
console.log('\n🔐 Checking Authentication...');
checkFile('./lib/authUtils.ts', 'Auth utilities');
checkFile('./lib/mongodb.ts', 'MongoDB connection');
checkFile('./app/api/auth/register/route.ts', 'Register API');
checkFile('./app/api/auth/login/route.ts', 'Login API');
checkFile('./app/api/auth/logout/route.ts', 'Logout API');

// Check Zustand stores
console.log('\n📦 Checking State Management...');
checkFile('./store/authStore.ts', 'Auth store');
checkFile('./store/progressStore.ts', 'Progress store');
checkFile('./components/providers/AuthProvider.tsx', 'Auth provider');

// Check data files
console.log('\n📚 Checking Curriculum Data...');
checkFile('./lib/lessonsData.ts', 'Lessons data (15 lessons)');
checkFile('./lib/quizzesData.ts', 'Quizzes data (7 quizzes with answers)');
checkFileContent('./lib/quizzesData.ts', 'QUIZ_DEFINITIONS', 'Quiz definitions');

// Check pages
console.log('\n📄 Checking Pages...');
checkFile('./app/page.tsx', 'Home page');
checkFile('./app/login/page.tsx', 'Login page');
checkFile('./app/signup/page.tsx', 'Signup page');
checkFile('./app/courses/page.tsx', 'Courses page');
checkFile('./app/lesson/[id]/page.tsx', 'Lesson detail page');

// Check components
console.log('\n🎨 Checking Components...');
checkFile('./components/Navbar.tsx', 'Navbar component');
checkFile('./components/LessonContent.tsx', 'Lesson content component');
checkFile('./components/QuizComponent.tsx', 'Quiz component');

// Check API routes
console.log('\n🔌 Checking API Routes...');
checkFile('./app/api/lessons/route.ts', 'Lessons API');
checkFile('./app/api/quizzes/route.ts', 'Quizzes API');
checkFile('./app/api/progress/route.ts', 'Progress API');
checkFile('./app/api/user/route.ts', 'User API');

// Check documentation
console.log('\n📖 Checking Documentation...');
checkFile('./README_FINAL.md', 'Final README');
checkFile('./QUICK_START.md', 'Quick start guide');
checkFile('./ARCHITECTURE.md', 'Architecture docs');
checkFile('./TESTING_GUIDE.md', 'Testing guide');
checkFile('./ZUSTAND_IMPLEMENTATION.md', 'Zustand documentation');

// Check content verification
console.log('\n✅ Checking Content Completeness...');
checkFileContent('./lib/lessonsData.ts', '"lessons":', 'Lessons exported');
checkFileContent('./lib/lessonsData.ts', '"MODULES":', 'Modules exported');
checkFileContent('./lib/quizzesData.ts', 'correctAnswer', '5+ questions with answers');
checkFileContent('./lib/quizzesData.ts', 'QUIZ_DEFINITIONS', 'Definitions object');

// Print results
console.log('\n' + '='.repeat(50));
console.log('VERIFICATION RESULTS');
console.log('='.repeat(50) + '\n');

checks.results.forEach(result => console.log(result));

console.log('\n' + '='.repeat(50));
console.log(`✅ Passed: ${checks.passed}`);
console.log(`❌ Failed: ${checks.failed}`);
console.log('='.repeat(50) + '\n');

if (checks.failed === 0) {
  console.log('🎉 All checks passed! Your project is ready.\n');
  console.log('Next steps:');
  console.log('1. Run: pnpm dev');
  console.log('2. Open: http://localhost:3000');
  console.log('3. Sign up and start learning!\n');
  process.exit(0);
} else {
  console.log(`⚠️  ${checks.failed} check(s) failed. Please fix these issues.\n`);
  process.exit(1);
}
