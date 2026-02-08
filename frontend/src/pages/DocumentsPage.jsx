import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Folder, Plus, Search, Trash2, MoreVertical, Share2 } from 'lucide-react'

export default function DocumentsPage() {
  const [documents, setDocuments] = useState([])
  const [folders, setFolders] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedFolder, setSelectedFolder] = useState('all')

  useEffect(() => {
    // Load documents from localStorage for demo
    const savedDocs = JSON.parse(localStorage.getItem('documents') || '[]')
    setDocuments(savedDocs)
    
    // Load folders
    const savedFolders = JSON.parse(localStorage.getItem('folders') || '[]')
    setFolders(savedFolders)
  }, [])

  const filteredDocuments = documents.filter(doc =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleDelete = (id) => {
    const updatedDocs = documents.filter(doc => doc.id !== id)
    setDocuments(updatedDocs)
    localStorage.setItem('documents', JSON.stringify(updatedDocs))
  }

  const handleCreateFolder = () => {
    const name = prompt('Enter folder name:')
    if (name) {
      const newFolder = {
        id: Date.now().toString(),
        name,
        createdAt: new Date().toISOString()
      }
      setFolders([...folders, newFolder])
      localStorage.setItem('folders', JSON.stringify([...folders, newFolder]))
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Documents</h1>
          <p className="text-gray-500">Manage your documents and folders</p>
        </div>
        <Link to="/editor/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Document
          </Button>
        </Link>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search documents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" onClick={handleCreateFolder}>
          <Folder className="mr-2 h-4 w-4" />
          New Folder
        </Button>
      </div>

      {/* Folders */}
      {folders.length > 0 && (
        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Folders</h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            {folders.map(folder => (
              <Card
                key={folder.id}
                className={`cursor-pointer transition-colors ${
                  selectedFolder === folder.id ? 'border-blue-500' : ''
                }`}
                onClick={() => setSelectedFolder(folder.id)}
              >
                <CardContent className="flex items-center p-4">
                  <Folder className="h-8 w-8 text-blue-500 mr-3" />
                  <div>
                    <p className="font-medium">{folder.name}</p>
                    <p className="text-sm text-gray-500">
                      {documents.filter(d => d.folderId === folder.id).length} documents
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Documents Grid */}
      <div>
        <h2 className="text-lg font-semibold mb-4">All Documents</h2>
        {filteredDocuments.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredDocuments.map(doc => (
              <Card key={doc.id} className="hover:border-blue-500 transition-colors">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <FileText className="h-8 w-8 text-blue-500" />
                    <div className="flex items-center space-x-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={(e) => {
                          e.stopPropagation()
                          navigator.clipboard.writeText(window.location.origin + '/editor/' + doc.id)
                        }}
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500"
                        onClick={(e) => {
                          e.stopPropagation()
                          if (confirm('Are you sure you want to delete this document?')) {
                            handleDelete(doc.id)
                          }
                        }}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <CardTitle className="text-lg mt-2">{doc.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {doc.content?.substring(0, 100) || 'No content'}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {new Date(doc.updatedAt).toLocaleDateString()}
                    </span>
                    <Link to={`/editor/${doc.id}`}>
                      <Button variant="ghost" size="sm">Open</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No documents found</h3>
              <p className="text-gray-500 mb-4">
                {searchQuery ? 'Try a different search term' : 'Create your first document to get started'}
              </p>
              {!searchQuery && (
                <Link to="/editor/new">
                  <Button>Create Document</Button>
                </Link>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
