// AI Service - Uses free AI APIs
// Primary: Ollama (local), Fallback: Groq, Hugging Face

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

export async function generateCompletion(prompt, options = {}) {
  const { model = 'llama3', maxTokens = 1000, temperature = 0.7 } = options
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/ai/complete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
      },
      body: JSON.stringify({
        prompt,
        model,
        max_tokens: maxTokens,
        temperature
      })
    })
    
    if (!response.ok) {
      throw new Error('AI generation failed')
    }
    
    return await response.json()
  } catch (error) {
    console.error('AI completion error:', error)
    throw error
  }
}

export async function getSuggestions(text, context = '') {
  try {
    const response = await fetch(`${API_BASE_URL}/api/ai/suggest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
      },
      body: JSON.stringify({ text, context })
    })
    
    if (!response.ok) {
      throw new Error('Failed to get suggestions')
    }
    
    return await response.json()
  } catch (error) {
    console.error('AI suggestions error:', error)
    throw error
  }
}

export async function generateContent(type, params) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/ai/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
      },
      body: JSON.stringify({ type, ...params })
    })
    
    if (!response.ok) {
      throw new Error('Content generation failed')
    }
    
    return await response.json()
  } catch (error) {
    console.error('AI content generation error:', error)
    throw error
  }
}

// Text completion types
export const completionTypes = {
  CONTINUE: 'continue',
  SUMMARIZE: 'summarize',
  EXPAND: 'expand',
  IMPROVE: 'improve',
  TRANSLATE: 'translate',
  SENTIMENT: 'sentiment',
  CORRECT: 'correct'
}
