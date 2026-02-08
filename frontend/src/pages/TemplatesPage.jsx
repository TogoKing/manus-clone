import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Sparkles, Mail, Briefcase, BookOpen, PenTool, Search } from 'lucide-react'

const defaultTemplates = [
  {
    id: '1',
    name: 'Blog Post',
    description: 'A structured template for writing engaging blog posts',
    icon: BookOpen,
    category: 'Content',
    content: '<h1>Blog Post Title</h1><p>Introduction paragraph that hooks the reader...</p><h2>Main Point 1</h2><p>Content about your first main point...</p><h2>Main Point 2</h2><p>Content about your second main point...</p><h2>Conclusion</h2><p>Wrap up your key takeaways...</p>'
  },
  {
    id: '2',
    name: 'Business Proposal',
    description: 'Professional template for business proposals',
    icon: Briefcase,
    category: 'Business',
    content: '<h1>Business Proposal</h1><h2>Executive Summary</h2><p>Brief overview of your proposal...</p><h2>Problem Statement</h2><p>Describe the problem you are addressing...</p><h2>Solution</h2><p>Present your proposed solution...</p><h2>Benefits</h2><p>Highlight key benefits and ROI...</p><h2>Next Steps</h2><p>Call to action...</p>'
  },
  {
    id: '3',
    name: 'Email',
    description: 'Professional email template for various scenarios',
    icon: Mail,
    category: 'Communication',
    content: '<p>Subject: [Email Subject]</p><p>Dear [Name],</p><p>[Opening paragraph - purpose of email]</p><p>[Main content]</p><p>[Closing paragraph]</p><p>Best regards,<br/>[Your Name]</p>'
  },
  {
    id: '4',
    name: 'Creative Writing',
    description: 'Unstructured space for creative writing',
    icon: PenTool,
    category: 'Creative',
    content: '<p>Start writing your story here...</p><p/><p>Chapter 1</p><p/><p>It was a dark and stormy night...</p>'
  },
  {
    id: '5',
    name: 'Article',
    description: 'Long-form article template with SEO optimization',
    icon: FileText,
    category: 'Content',
    content: '<h1>Article Title</h1><p class="lead">Compelling introduction...</p><h2>Key Takeaway #1</h2><p>Supporting content...</p><h2>Key Takeaway #2</h2><p>Supporting content...</p><h2>Expert Quotes</h2><p>Include relevant expert opinions...</p><h2>Conclusion</h2><p>Summary and final thoughts...</p>'
  },
  {
    id: '6',
    name: 'AI Prompt',
    description: 'Template for crafting effective AI prompts',
    icon: Sparkles,
    category: 'AI',
    content: '<h1>AI Prompt Template</h1><h2>Context</h2><p>Provide background information...</p><h2>Task</h2><p>Clear description of what you want...</p><h2>Constraints</h2><p>Any limitations or requirements...</p><h2>Example Output</h2><p>Show the desired format...</p>'
  }
]

export default function TemplatesPage() {
  const [templates, setTemplates] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    const savedTemplates = JSON.parse(localStorage.getItem('templates') || '[]')
    setTemplates([...defaultTemplates, ...savedTemplates])
  }, [])

  const categories = ['all', ...new Set(templates.map(t => t.category))]

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleUseTemplate = (template) => {
    const newDoc = {
      id: Date.now().toString(),
      title: 'New ' + template.name,
      content: template.content,
      updatedAt: new Date().toISOString(),
      templateId: template.id
    }
    
    const savedDocs = JSON.parse(localStorage.getItem('documents') || '[]')
    savedDocs.push(newDoc)
    localStorage.setItem('documents', JSON.stringify(savedDocs))
    
    window.location.href = '/editor/' + newDoc.id
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Templates</h1>
        <p className="text-gray-500">Start writing with pre-built templates</p>
      </div>

      <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search templates..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2 mb-6 flex-wrap">
        {categories.map(category => (
          <Button
            key={category}
            variant={selectedCategory === category ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTemplates.map(template => {
          const Icon = template.icon
          return (
            <Card key={template.id} className="hover:border-blue-500 transition-colors">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{template.name}</CardTitle>
                    <CardDescription className="text-xs">{template.category}</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{template.description}</p>
                <Button 
                  className="w-full" 
                  onClick={() => handleUseTemplate(template)}
                >
                  Use Template
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredTemplates.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">No templates found</h3>
            <p className="text-gray-500">Try a different search term</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
