import express from 'express'
import { completeText } from '../services/ai.js'

const router = express.Router()

// AI completion endpoint
router.post('/complete', async (req, res, next) => {
  try {
    const { prompt, model, max_tokens, temperature } = req.body
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' })
    }
    
    const result = await completeText(prompt, {
      model: model || 'llama3',
      maxTokens: max_tokens || 1000,
      temperature: temperature || 0.7
    })
    
    res.json(result)
  } catch (error) {
    next(error)
  }
})

// AI suggestions endpoint
router.post('/suggest', async (req, res, next) => {
  try {
    const { text, context } = req.body
    
    if (!text) {
      return res.status(400).json({ error: 'Text is required' })
    }
    
    // Generate suggestions based on the text
    const prompt = `Given this text: "${text}"

Provide 3 brief suggestions to improve or continue this text. Format as a JSON array of objects with 'text' and 'type' properties.`

    const result = await completeText(prompt, {
      model: 'llama3',
      maxTokens: 500,
      temperature: 0.5
    })
    
    res.json({ suggestions: result })
  } catch (error) {
    next(error)
  }
})

// Content generation endpoint
router.post('/generate', async (req, res, next) => {
  try {
    const { type, ...params } = req.body
    
    if (!type) {
      return res.status(400).json({ error: 'Type is required' })
    }
    
    let prompt = ''
    
    switch (type) {
      case 'blog':
        prompt = `Write a blog post about: ${params.topic || 'Unknown topic'}
Include an engaging title, introduction, main points, and conclusion.`
        break
      case 'email':
        prompt = `Write a professional email about: ${params.topic || 'Unknown topic'}
Recipient: ${params.recipient || 'Unknown'}
Tone: ${params.tone || 'Professional'}`
        break
      case 'summary':
        prompt = `Summarize this text in 3-5 bullet points:
${params.text || ''}`
        break
      case 'improve':
        prompt = `Improve this text for clarity and grammar:
${params.text || ''}`
        break
      default:
        return res.status(400).json({ error: 'Invalid type' })
    }
    
    const result = await completeText(prompt, {
      model: 'llama3',
      maxTokens: params.maxTokens || 1000,
      temperature: 0.7
    })
    
    res.json({ content: result })
  } catch (error) {
    next(error)
  }
})

export default router
