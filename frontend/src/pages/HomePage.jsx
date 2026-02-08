import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Sparkles, FileText, Users, Zap } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16">
        <nav className="flex items-center justify-between mb-16">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold">Manus Clone</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/register">
              <Button>Get Started Free</Button>
            </Link>
          </div>
        </nav>

        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Your AI Writing Assistant, Completely Free
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Experience the power of AI-powered writing without any credit system. 
            Create, edit, and enhance your content with unlimited AI capabilities.
          </p>
          <div className="flex justify-center space-x-4">
            <Link to="/register">
              <Button size="lg" className="text-lg px-8">
                Start Writing for Free
              </Button>
            </Link>
            <Link to="/templates">
              <Button size="lg" variant="outline" className="text-lg px-8">
                Explore Templates
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Everything You Need for AI-Powered Writing
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <Sparkles className="h-10 w-10 text-blue-600 mb-2" />
              <CardTitle>Smart Completion</CardTitle>
              <CardDescription>
                AI-powered text completion that understands your writing style
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <FileText className="h-10 w-10 text-purple-600 mb-2" />
              <CardTitle>Document Management</CardTitle>
              <CardDescription>
                Organize, search, and manage all your documents in one place
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Zap className="h-10 w-10 text-yellow-600 mb-2" />
              <CardTitle>Instant Suggestions</CardTitle>
              <CardDescription>
                Real-time grammar and style improvements as you write
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-10 w-10 text-green-600 mb-2" />
              <CardTitle>Collaboration</CardTitle>
              <CardDescription>
                Share documents and collaborate with your team in real-time
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            100% Free, No Credit System
          </h2>
          <div className="max-w-lg mx-auto">
            <Card className="border-2 border-blue-500">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Free Forever</CardTitle>
                <CardDescription>
                  <span className="text-4xl font-bold">$0</span>
                  <span className="text-gray-500">/month</span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <Sparkles className="h-5 w-5 text-green-500 mr-2" />
                    Unlimited AI completions
                  </li>
                  <li className="flex items-center">
                    <Sparkles className="h-5 w-5 text-green-500 mr-2" />
                    Unlimited documents
                  </li>
                  <li className="flex items-center">
                    <Sparkles className="h-5 w-5 text-green-500 mr-2" />
                    All templates included
                  </li>
                  <li className="flex items-center">
                    <Sparkles className="h-5 w-5 text-green-500 mr-2" />
                    Export to all formats
                  </li>
                  <li className="flex items-center">
                    <Sparkles className="h-5 w-5 text-green-500 mr-2" />
                    Community support
                  </li>
                </ul>
                <Link to="/register" className="mt-6">
                  <Button className="w-full" size="lg">
                    Get Started Free
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-gray-500">
        <p>© 2024 Manus Clone. All rights reserved.</p>
        <p className="mt-2">
          Built with React, Supabase, and free AI APIs (Ollama, Groq, Hugging Face)
        </p>
      </footer>
    </div>
  )
}
