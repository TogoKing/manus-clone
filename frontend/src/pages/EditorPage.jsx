import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Sparkles, Save, Download, Share2, Undo, Redo, 
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight,
  Heading1, Heading2, List, ListOrdered, Quote
} from 'lucide-react'

export default function EditorPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const editorRef = useRef(null)
  
  const [document, setDocument] = useState({
    id: id === 'new' ? Date.now().toString() : id,
    title: 'Untitled Document',
    content: '',
    updatedAt: new Date().toISOString()
  })
  
  const [isGenerating, setIsGenerating] = useState(false)
  const [aiSuggestion, setAiSuggestion] = useState('')
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  useEffect(() => {
    if (id !== 'new') {
      const savedDocs = JSON.parse(localStorage.getItem('documents') || '[]')
      const found = savedDocs.find(d => d.id === id)
      if (found) {
        setDocument(found)
        setHistory([found.content])
        setHistoryIndex(0)
      }
    } else {
      setHistory([''])
    }
  }, [id])

  const handleContentChange = (newContent) => {
    setDocument({ ...document, content: newContent, updatedAt: new Date().toISOString() })
    
    // Update history
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(newContent)
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }

  const handleSave = () => {
    const savedDocs = JSON.parse(localStorage.getItem('documents') || '[]')
    const index = savedDocs.findIndex(d => d.id === document.id)
    
    if (index >= 0) {
      savedDocs[index] = document
    } else {
      savedDocs.push(document)
    }
    
    localStorage.setItem('documents', JSON.stringify(savedDocs))
    
    // Update recent documents
    const recentDocs = JSON.parse(localStorage.getItem('recentDocuments') || '[]')
    const recentIndex = recentDocs.findIndex(d => d.id === document.id)
    if (recentIndex >= 0) {
      recentDocs.splice(recentIndex, 1)
    }
    recentDocs.unshift(document)
    localStorage.setItem('recentDocuments', JSON.stringify(recentDocs.slice(0, 10)))
    
    alert('Document saved!')
  }

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setDocument({ ...document, content: history[historyIndex - 1] })
    }
  }

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setDocument({ ...document, content: history[historyIndex + 1] })
    }
  }

  const handleAiComplete = async () => {
    setIsGenerating(true)
    setAiSuggestion('')
    
    // Simulate AI generation (replace with actual API call)
    setTimeout(() => {
      const suggestions = [
        ' Here are some key points to consider...',
        ' Furthermore, it is important to note that...',
        ' In conclusion, we can see that...',
        ' Additionally, research shows that...'
      ]
      const randomSuggestion = suggestions[Math.floor(Math.random() * suggestions.length)]
      setAiSuggestion(randomSuggestion)
      setIsGenerating(false)
    }, 1500)
  }

  const acceptSuggestion = () => {
    const newContent = document.content + aiSuggestion
    handleContentChange(newContent)
    setAiSuggestion('')
  }

  const handleExport = (format) => {
    // Simple export functionality
    const blob = new Blob([document.content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${document.title}.${format}`
    a.click()
    URL.revokeObjectURL(url)
  }

  const execCommand = (command) => {
    document.execCommand(command, false, null)
    editorRef.current?.focus()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-4 py-3">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => navigate('/documents')}>
              ← Back
            </Button>
            <Input
              value={document.title}
              onChange={(e) => setDocument({ ...document, title: e.target.value })}
              className="w-64 font-semibold border-none shadow-none"
              placeholder="Document title"
            />
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleUndo} disabled={historyIndex <= 0}>
              <Undo className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleRedo} disabled={historyIndex >= history.length - 1}>
              <Redo className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={handleSave}>
              <Save className="h-4 w-4 mr-1" />
              Save
            </Button>
            <Button variant="outline" size="sm" onClick={() => handleExport('txt')}>
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white border-b px-4 py-2">
        <div className="max-w-6xl mx-auto flex items-center space-x-1 flex-wrap">
          <Button variant="ghost" size="sm" onClick={() => execCommand('bold')}>
            <Bold className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => execCommand('italic')}>
            <Italic className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => execCommand('underline')}>
            <Underline className="h-4 w-4" />
          </Button>
          
          <div className="w-px h-6 bg-gray-300 mx-2" />
          
          <Button variant="ghost" size="sm" onClick={() => execCommand('formatBlock', 'h1')}>
            <Heading1 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => execCommand('formatBlock', 'h2')}>
            <Heading2 className="h-4 w-4" />
          </Button>
          
          <div className="w-px h-6 bg-gray-300 mx-2" />
          
          <Button variant="ghost" size="sm" onClick={() => execCommand('insertUnorderedList')}>
            <List className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => execCommand('insertOrderedList')}>
            <ListOrdered className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => execCommand('formatBlock', 'blockquote')}>
            <Quote className="h-4 w-4" />
          </Button>
          
          <div className="flex-1" />
          
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleAiComplete}
            disabled={isGenerating}
          >
            <Sparkles className={`h-4 w-4 mr-1 ${isGenerating ? 'animate-spin' : ''}`} />
            {isGenerating ? 'Generating...' : 'AI Complete'}
          </Button>
        </div>
      </div>

      {/* Editor */}
      <div className="max-w-4xl mx-auto py-8 px-4">
        <Card>
          <CardContent className="p-8">
            <div
              ref={editorRef}
              className="min-h-[500px] outline-none prose prose-lg max-w-none"
              contentEditable
              onInput={(e) => handleContentChange(e.currentTarget.innerHTML)}
              dangerouslySetInnerHTML={{ __html: document.content }}
              style={{ minHeight: '500px' }}
            />
          </CardContent>
        </Card>

        {/* AI Suggestion */}
        {aiSuggestion && (
          <Card className="mt-4 border-blue-500 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-blue-700">AI Suggestion</p>
                  <p className="text-gray-700">{aiSuggestion}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button size="sm" onClick={acceptSuggestion}>Accept</Button>
                  <Button size="sm" variant="outline" onClick={() => setAiSuggestion('')}>Dismiss</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
