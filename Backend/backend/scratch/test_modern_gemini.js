require('dotenv').config();

async function testGemini(model) {
  const apiKey = process.env.GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  
  console.log(`Testing model ${model}...`);
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: 'Hi' }] }]
      })
    });
    
    const data = await response.json();
    if (response.ok) {
      console.log(`Success with ${model}:`, data.candidates?.[0]?.content?.parts?.[0]?.text);
      return true;
    } else {
      console.log(`Failed with ${model}: ${response.status} - ${JSON.stringify(data.error || data)}`);
      return false;
    }
  } catch (e) {
    console.error(`Error with ${model}:`, e.message);
    return false;
  }
}

async function runTests() {
  await testGemini('gemini-2.0-flash');
  await testGemini('gemini-flash-latest');
  await testGemini('gemini-1.5-flash'); // Test again just in case
}

runTests();
