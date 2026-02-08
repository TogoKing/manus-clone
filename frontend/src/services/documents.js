import { supabase } from '@/lib/supabase'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

// Document CRUD operations using Supabase
export async function getDocuments() {
  try {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .order('updated_at', { ascending: false })
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching documents:', error)
    throw error
  }
}

export async function getDocument(id) {
  try {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching document:', error)
    throw error
  }
}

export async function createDocument(document) {
  try {
    const { data, error } = await supabase
      .from('documents')
      .insert([document])
      .select()
      .single()
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error creating document:', error)
    throw error
  }
}

export async function updateDocument(id, updates) {
  try {
    const { data, error } = await supabase
      .from('documents')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single()
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error updating document:', error)
    throw error
  }
}

export async function deleteDocument(id) {
  try {
    const { error } = await supabase
      .from('documents')
      .delete()
      .eq('id', id)
    
    if (error) throw error
    return true
  } catch (error) {
    console.error('Error deleting document:', error)
    throw error
  }
}

// Folder operations
export async function getFolders() {
  try {
    const { data, error } = await supabase
      .from('folders')
      .select('*')
      .order('name', { ascending: true })
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching folders:', error)
    throw error
  }
}

export async function createFolder(folder) {
  try {
    const { data, error } = await supabase
      .from('folders')
      .insert([folder])
      .select()
      .single()
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error creating folder:', error)
    throw error
  }
}

// Search documents
export async function searchDocuments(query) {
  try {
    const { data, error } = await supabase
      .from('documents')
      .select('*')
      .ilike('title', `%${query}%`)
      .or(`content.ilike.%${query}%,description.ilike.%${query}%`)
      .order('updated_at', { ascending: false })
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error searching documents:', error)
    throw error
  }
}

// Templates
export async function getTemplates() {
  try {
    const { data, error } = await supabase
      .from('templates')
      .select('*')
      .order('name', { ascending: true })
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error fetching templates:', error)
    return []
  }
}
