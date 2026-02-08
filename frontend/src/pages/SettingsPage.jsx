import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { User, Bell, Shield, Palette, Database, Trash2, Download } from 'lucide-react'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    name: '',
    email: '',
    theme: 'light',
    notifications: true,
    aiModel: 'llama3'
  })

  useEffect(() => {
    const savedSettings = JSON.parse(localStorage.getItem('userSettings') || '{}')
    setSettings({ ...settings, ...savedSettings })
  }, [])

  const handleSave = () => {
    localStorage.setItem('userSettings', JSON.stringify(settings))
    alert('Settings saved!')
  }

  const handleExportData = () => {
    const data = {
      documents: JSON.parse(localStorage.getItem('documents') || '[]'),
      templates: JSON.parse(localStorage.getItem('templates') || '[]'),
      settings: JSON.parse(localStorage.getItem('userSettings') || '{}'),
      exportedAt: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'manus-clone-backup.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleClearData = () => {
    if (confirm('Are you sure you want to clear all local data? This cannot be undone.')) {
      localStorage.clear()
      alert('All data cleared. Please refresh the page.')
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-500">Manage your account and preferences</p>
      </div>

      {/* Profile Settings */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <User className="mr-2 h-5 w-5" />
            Profile
          </CardTitle>
          <CardDescription>Manage your personal information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={settings.name}
                onChange={(e) => setSettings({ ...settings, name: e.target.value })}
                placeholder="Your name"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={settings.email}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                placeholder="your@email.com"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appearance Settings */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Palette className="mr-2 h-5 w-5" />
            Appearance
          </CardTitle>
          <CardDescription>Customize the look and feel</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>Theme</Label>
            <div className="flex items-center space-x-4 mt-2">
              <Button
                variant={settings.theme === 'light' ? 'default' : 'outline'}
                onClick={() => setSettings({ ...settings, theme: 'light' })}
              >
                Light
              </Button>
              <Button
                variant={settings.theme === 'dark' ? 'default' : 'outline'}
                onClick={() => setSettings({ ...settings, theme: 'dark' })}
              >
                Dark
              </Button>
              <Button
                variant={settings.theme === 'system' ? 'default' : 'outline'}
                onClick={() => setSettings({ ...settings, theme: 'system' })}
              >
                System
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Settings */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Database className="mr-2 h-5 w-5" />
            AI Settings
          </CardTitle>
          <CardDescription>Configure AI model preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label>AI Model</Label>
            <p className="text-sm text-gray-500 mb-2">Choose which AI model to use for completions</p>
            <select
              className="w-full p-2 border rounded-md"
              value={settings.aiModel}
              onChange={(e) => setSettings({ ...settings, aiModel: e.target.value })}
            >
              <option value="llama3">Llama 3 (Local - Ollama)</option>
              <option value="mistral">Mistral (Local - Ollama)</option>
              <option value="groq-llama">Llama 3 (Groq API - Free Tier)</option>
              <option value="groq-mixtral">Mixtral (Groq API - Free Tier)</option>
              <option value="huggingface">Hugging Face (Free Tier)</option>
            </select>
          </div>
          <p className="text-sm text-gray-500">
            Note: Using local Ollama requires installing Ollama on your machine. 
            API-based models use free tiers with rate limits.
          </p>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Bell className="mr-2 h-5 w-5" />
            Notifications
          </CardTitle>
          <CardDescription>Manage notification preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-gray-500">Receive updates about your documents</p>
            </div>
            <Button
              variant={settings.notifications ? 'default' : 'outline'}
              onClick={() => setSettings({ ...settings, notifications: !settings.notifications })}
            >
              {settings.notifications ? 'Enabled' : 'Disabled'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Data Management */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="mr-2 h-5 w-5" />
            Data Management
          </CardTitle>
          <CardDescription>Export or clear your data</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Export Data</p>
              <p className="text-sm text-gray-500">Download all your documents and settings</p>
            </div>
            <Button variant="outline" onClick={handleExportData}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-red-600">Clear All Data</p>
              <p className="text-sm text-gray-500">Delete all local data (cannot be undone)</p>
            </div>
            <Button variant="destructive" onClick={handleClearData}>
              <Trash2 className="mr-2 h-4 w-4" />
              Clear Data
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button onClick={handleSave}>Save Settings</Button>
      </div>
    </div>
  )
}
