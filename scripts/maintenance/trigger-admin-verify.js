const https = require('https');

console.log('🔍 Test direct de l\'API /api/admin/verify\n');

const data = JSON.stringify({
  email: 'alexlehoux@gmail.com'
});

const options = {
  hostname: 'monster-phone.re',
  port: 443,
  path: '/api/admin/verify',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = https.request(options, (res) => {
  console.log(`📊 Status Code: ${res.statusCode}`);
  console.log(`📋 Headers:`, JSON.stringify(res.headers, null, 2));

  let responseBody = '';

  res.on('data', (chunk) => {
    responseBody += chunk;
  });

  res.on('end', () => {
    console.log('\n📦 Response Body:');
    try {
      const parsed = JSON.parse(responseBody);
      console.log(JSON.stringify(parsed, null, 2));
    } catch (e) {
      console.log(responseBody);
    }

    if (res.statusCode === 403) {
      console.log('\n❌ ERREUR 403 CONFIRMÉE');
      console.log('   Cela signifie que:');
      console.log('   1. L\'email n\'existe pas dans admin_users, OU');
      console.log('   2. L\'utilisateur existe mais is_active = false, OU');
      console.log('   3. La clé SUPABASE_SERVICE_ROLE_KEY est invalide');
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Erreur réseau:', error.message);
});

req.write(data);
req.end();
