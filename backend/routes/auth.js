import express from 'express'

const router = express.Router()

// Note: Authentication is handled by Supabase on the client side
// This is just for additional auth-related endpoints if needed

// Get current user (requires Supabase JWT verification)
router.get('/me', (req, res) => {
  // The actual user verification is done by Supabase on the client
  // This endpoint can be used for additional user data
  res.json({ 
    user: req.user || null,
    message: 'Use Supabase client for authentication'
  })
})

// Logout (client-side only with Supabase)
router.post('/logout', (req, res) => {
  res.json({ message: 'Logout handled by Supabase client' })
})

export default router
