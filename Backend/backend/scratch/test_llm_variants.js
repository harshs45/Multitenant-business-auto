require('dotenv').config();

async function testGemini(version, model) {
  const apiKey = process.env.GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/${version}/models/${model}:generateContent?key=${apiKey}`;
  
  console.log(`Testing ${version} with model ${model}...`);
  
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
      console.log(`Success with ${version}/${model}:`, data.candidates?.[0]?.content?.parts?.[0]?.text);
      return true;
    } else {
      console.log(`Failed with ${version}/${model}: ${response.status} - ${JSON.stringify(data.error || data)}`);
      return false;
    }
  } catch (e) {
    console.error(`Error with ${version}/${model}:`, e.message);
    return false;
  }
}

async function runTests() {
  await testGemini('v1beta', 'gemini-1.5-flash');
  await testGemini('v1', 'gemini-1.5-flash');
  await testGemini('v1beta', 'gemini-1.5-pro');
  await testGemini('v1', 'gemini-1.5-pro');
}

runTests();
