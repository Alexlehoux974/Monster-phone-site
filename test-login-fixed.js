const { chromium } = require('playwright');

async function testLogin() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  try {
    console.log('🔍 Testing admin login with alexlehoux@gmail.com...\n');
    
    // 1. Navigate to login page
    console.log('📄 Step 1: Navigating to login page...');
    await page.goto('https://monster-phone.re/admin/login', { waitUntil: 'networkidle' });
    console.log('✅ Login page loaded\n');
    
    // 2. Fill in credentials
    console.log('📝 Step 2: Filling credentials...');
    await page.fill('input[type="email"]', 'alexlehoux@gmail.com');
    await page.fill('input[type="password"]', 'Monster@phone2025!');
    console.log('✅ Credentials filled\n');
    
    // 3. Click login button
    console.log('🖱️  Step 3: Clicking login button...');
    await page.click('button[type="submit"]');
    
    // 4. Wait for navigation or error
    console.log('⏳ Step 4: Waiting for response...\n');
    
    await Promise.race([
      page.waitForURL('https://monster-phone.re/admin/dashboard', { timeout: 10000 }),
      page.waitForSelector('.error', { timeout: 10000 }).catch(() => null)
    ]);
    
    const currentUrl = page.url();
    console.log('📍 Current URL:', currentUrl);
    
    if (currentUrl.includes('/admin/dashboard')) {
      console.log('\n✅ SUCCESS: Login successful! Redirected to dashboard');
      
      // Check dashboard content
      const title = await page.title();
      console.log('📄 Page title:', title);
      
      const hasContent = await page.locator('h1, h2').first().isVisible();
      console.log('📊 Dashboard content visible:', hasContent);
    } else {
      console.log('\n❌ FAILED: Not redirected to dashboard');
      
      // Check for errors
      const errorElement = await page.locator('.error').first().textContent().catch(() => null);
      if (errorElement) {
        console.log('❌ Error message:', errorElement);
      }
    }
    
  } catch (error) {
    console.error('\n❌ Test failed with error:', error.message);
  } finally {
    await browser.close();
  }
}

testLogin();
