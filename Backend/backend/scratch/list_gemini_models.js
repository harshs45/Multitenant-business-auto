require('dotenv').config();

async function listModels() {
  const apiKey = process.env.GEMINI_API_KEY;
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
  
  console.log('Listing models...');
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (response.ok) {
      console.log('Models found:');
      data.models.forEach(m => {
        console.log(`- ${m.name}: ${m.displayName} (Methods: ${m.supportedGenerationMethods.join(', ')})`);
      });
    } else {
      console.log(`Failed to list models: ${response.status} - ${JSON.stringify(data)}`);
    }
  } catch (e) {
    console.error('Error listing models:', e.message);
  }
}

listModels();
