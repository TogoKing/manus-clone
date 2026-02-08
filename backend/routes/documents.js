import express from 'express'

const router = express.Router()

// In-memory storage for demo (replace with Supabase in production)
let documents = []

// Get all documents
router.get('/', (req, res) => {
  res.json(documents)
})

// Get single document
router.get('/:id', (req, res) => {
  const doc = documents.find(d => d.id === req.params.id)
  if (!doc) {
    return res.status(404).json({ error: 'Document not found' })
  }
  res.json(doc)
})

// Create document
router.post('/', (req, res) => {
  const { title, content, folderId } = req.body
  
  const newDoc = {
    id: Date.now().toString(),
    title: title || 'Untitled Document',
    content: content || '',
    folderId: folderId || null,
    userId: req.user?.id || 'anonymous',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
  
  documents.push(newDoc)
  res.status(201).json(newDoc)
})

// Update document
router.put('/:id', (req, res) => {
  const index = documents.findIndex(d => d.id === req.params.id)
  if (index === -1) {
    return res.status(404).json({ error: 'Document not found' })
  }
  
  documents[index] = {
    ...documents[index],
    ...req.body,
    updatedAt: new Date().toISOString()
  }
  
  res.json(documents[index])
})

// Delete document
router.delete('/:id', (req, res) => {
  const index = documents.findIndex(d => d.id === req.params.id)
  if (index === -1) {
    return res.status(404).json({ error: 'Document not found' })
  }
  
  documents.splice(index, 1)
  res.status(204).send()
})

export default router
