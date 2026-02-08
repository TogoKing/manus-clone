import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, Sparkles, Clock, TrendingUp } from 'lucide-react'

export default function DashboardPage() {
  const [recentDocuments, setRecentDocuments] = useState([])
  const [stats, setStats] = useState({
    totalDocuments: 0,
    aiCompletions: 0,
    hoursSaved: 0
  })

  useEffect(() => {
    // Load recent documents from localStorage for demo
    const savedDocs = JSON.parse(localStorage.getItem('recentDocuments') || '[]')
    setRecentDocuments(savedDocs.slice(0, 5))
    
    // Load stats
    const savedStats = JSON.parse(localStorage.getItem('userStats') || '{}')
    setStats(savedStats)
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Welcome back! Here's an overview of your work.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
            <FileText className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDocuments || 0}</div>
            <p className="text-xs text-gray-500">All your documents</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">AI Completions</CardTitle>
            <Sparkles className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.aiCompletions || 0}</div>
            <p className="text-xs text-gray-500">Times AI helped you write</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Hours Saved</CardTitle>
            <Clock className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.hoursSaved || 0}h</div>
            <p className="text-xs text-gray-500">Estimated time saved</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get started with these common tasks</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Link to="/editor/new">
              <Button className="w-full justify-start" variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                Create New Document
              </Button>
            </Link>
            <Link to="/templates">
              <Button className="w-full justify-start" variant="outline">
                <Sparkles className="mr-2 h-4 w-4" />
                Browse Templates
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest document activity</CardDescription>
          </CardHeader>
          <CardContent>
            {recentDocuments.length > 0 ? (
              <div className="space-y-3">
                {recentDocuments.map((doc) => (
                  <Link
                    key={doc.id}
                    to={`/editor/${doc.id}`}
                    className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-3 text-gray-500" />
                      <div>
                        <p className="font-medium">{doc.title}</p>
                        <p className="text-sm text-gray-500">
                          {new Date(doc.updatedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <TrendingUp className="h-4 w-4 text-gray-400" />
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">
                No recent documents. Create your first one!
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Documents */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Documents</CardTitle>
            <CardDescription>Your latest documents</CardDescription>
          </div>
          <Link to="/documents">
            <Button variant="ghost" size="sm">View All</Button>
          </Link>
        </CardHeader>
        <CardContent>
          {recentDocuments.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {recentDocuments.map((doc) => (
                <Link
                  key={doc.id}
                  to={`/editor/${doc.id}`}
                  className="p-4 rounded-lg border hover:border-blue-500 transition-colors cursor-pointer"
                >
                  <h3 className="font-medium mb-2">{doc.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2">
                    {doc.content?.substring(0, 100) || 'No content'}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    Updated {new Date(doc.updatedAt).toLocaleDateString()}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">No documents yet</h3>
              <p className="text-gray-500 mb-4">Create your first document to get started</p>
              <Link to="/editor/new">
                <Button>Create Document</Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
