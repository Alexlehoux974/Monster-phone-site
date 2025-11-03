// Script de test pour envoyer un email de confirmation
const sessionId = process.argv[2];

if (!sessionId) {
  console.error('❌ Usage: node test-email.js <session_id>');
  console.error('Exemple: node test-email.js cs_test_b1at8wVDFNTzCDVVerbc7bmTwYHLY8b1dlE6VsCbFDA2MvLVF8u7hgY9Rz');
  process.exit(1);
}

async function testEmail() {
  try {
    console.log('🔄 Envoi de l\'email de test...');
    console.log(`📧 Session ID: ${sessionId}`);

    const response = await fetch('http://localhost:3001/api/send-test-confirmation', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sessionId }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log('✅ Email envoyé avec succès !');
      console.log('📬 Vérifie ta boîte email');
    } else {
      console.error('❌ Erreur:', data.error);
    }
  } catch (error) {
    console.error('❌ Erreur:', error.message);
  }
}

testEmail();
