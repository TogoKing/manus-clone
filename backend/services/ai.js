// AI Service - Integrates with free AI APIs
// Priority: 1. Ollama (local), 2. Groq (free tier), 3. Hugging Face (free tier)

const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434'
const GROQ_API_KEY = process.env.GROQ_API_KEY
const HUGGING_FACE_TOKEN = process.env.HUGGING_FACE_TOKEN

// Model configurations
const MODELS = {
  ollama: {
    llama3: 'llama3',
    mistral: 'mistral',
    codellama: 'codellama'
  },
  groq: {
    llama: 'llama3-8b-8192',
    mixtral: 'mixtral-8x7b-32768'
  },
  huggingface: {
    llama: 'meta-llama/Llama-2-7b-chat-hf',
    mistral: 'mistralai/Mistral-7B-Instruct-v0.1'
  }
}

export async function completeText(prompt, options = {}) {
  const { model = 'llama3', maxTokens = 1000, temperature = 0.7 } = options
  
  let result = null
  let error = null

  // Try Ollama first (local, no limits)
  try {
    result = await callOllama(prompt, model, maxTokens, temperature)
    return result
  } catch (e) {
    console.warn('Ollama not available:', e.message)
  }

  // Try Groq (free tier with generous limits)
  try {
    result = await callGroq(prompt, model, maxTokens, temperature)
    return result
  } catch (e) {
    console.warn('Groq not available:', e.message)
  }

  // Try Hugging Face (free tier)
  try {
    result = await callHuggingFace(prompt, model, maxTokens, temperature)
    return result
  } catch (e) {
    console.warn('Hugging Face not available:', e.message)
  }

  // Fallback: Return a simulated response for demo
  console.warn('All AI services unavailable, returning fallback response')
  return generateFallbackResponse(prompt)
}

async function callOllama(prompt, modelName, maxTokens, temperature) {
  const model = MODELS.ollama[modelName] || 'llama3'
  
  const response = await fetch(`${OLLAMA_URL}/api/generate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model,
      prompt,
      stream: false,
      options: {
        num_predict: maxTokens,
        temperature
      }
    })
  })

  if (!response.ok) {
    throw new Error(`Ollama error: ${response.statusText}`)
  }

  const data = await response.json()
  return data.response
}

async function callGroq(prompt, modelName, maxTokens, temperature) {
  if (!GROQ_API_KEY) {
    throw new Error('Groq API key not configured')
  }

  const model = MODELS.groq[modelName] || 'llama3-8b-8192'

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${GROQ_API_KEY}`
    },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: 'You are a helpful AI writing assistant.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: maxTokens,
      temperature
    })
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(`Groq error: ${error.error?.message || response.statusText}`)
  }

  const data = await response.json()
  return data.choices[0].message.content
}

async function callHuggingFace(prompt, modelName, maxTokens, temperature) {
  if (!HUGGING_FACE_TOKEN) {
    throw new Error('Hugging Face token not configured')
  }

  const model = MODELS.huggingface[modelName] || 'mistralai/Mistral-7B-Instruct-v0.1'

  const response = await fetch(
    `https://api-inference.huggingface.co/models/${model}`,
    {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HUGGING_FACE_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: maxTokens,
          temperature,
          return_full_text: false
        }
      })
    }
  )

  if (!response.ok) {
    const error = await response.json()
    throw new Error(`Hugging Face error: ${error.error || response.statusText}`)
  }

  const data = await response.json()
  // Hugging Face returns array of generated text
  if (Array.isArray(data) && data[0]) {
    return data[0].generated_text || ''
  }
  return ''
}

function generateFallbackResponse(prompt) {
  // Return a helpful message when all AI services are unavailable
  return `I understand you'd like help with: "${prompt.substring(0, 100)}..."

However, all AI services are currently unavailable. To enable AI features:

1. **Install Ollama** (Recommended - runs locally, free):
   - Visit: https://ollama.ai
   - Run: ollama pull llama3

2. **Or configure API keys**:
   - Groq: Get a free API key at https://console.groq.com
   - Hugging Face: Get a free token at https://huggingface.co/settings/tokens

Configure these in your .env file:
- OLLAMA_URL=http://localhost:11434
- GROQ_API_KEY=your-groq-key
- HUGGING_FACE_TOKEN=your-hf-token

Once configured, AI features will work without any usage limits!`
}
