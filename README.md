# Manus Clone - Free AI Writing Assistant

## Project Overview

This project is a free, open-source clone of manus.im - an AI-powered writing and productivity assistant. This version is completely free to use without any credit system.

## Features

### Core Features (Inspired by manus.im)

1. **AI Writing Assistant**
   - Smart text completion
   - Grammar and style suggestions
   - Content generation
   - Multi-language support

2. **Document Management**
   - Create, edit, and organize documents
   - Folder organization
   - Search functionality
   - Version history

3. **Collaboration**
   - Real-time collaboration
   - Comments and annotations
   - Share via link

4. **Templates**
   - Pre-built templates for various use cases
   - Custom template creation

5. **Export Options**
   - Export to PDF, DOCX, Markdown
   - Copy to clipboard
   - Direct publishing

### Free API Alternatives

Instead of paid APIs, this project uses:

1. **Ollama** - Local AI inference (completely free, runs locally)
2. **Hugging Face Inference API** - Free tier available
3. **Groq** - Free tier with generous limits
4. **OpenAI Free Tier** - Limited but functional

## Tech Stack

### Frontend
- **Framework**: React.js with Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context + Zustand
- **Routing**: React Router v6
- **UI Components**: Shadcn UI + Radix UI

### Backend
- **Runtime**: Node.js with Express
- **Database**: PostgreSQL (Supabase Free Tier)
- **Authentication**: Supabase Auth
- **File Storage**: Supabase Storage

### AI Integration
- **Primary**: Ollama (local)
- **Fallback**: Groq API (free tier)
- **Secondary**: Hugging Face Inference API

## Project Structure

```
manus-clone/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── context/       # React context providers
│   │   ├── services/      # API service functions
│   │   ├── utils/         # Utility functions
│   │   └── assets/        # Static assets
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── backend/                 # Node.js backend
│   ├── src/
│   │   ├── controllers/   # Route controllers
│   │   ├── routes/        # API routes
│   │   ├── models/        # Data models
│   │   ├── middleware/    # Express middleware
│   │   ├── services/      # Business logic
│   │   └── utils/         # Utility functions
│   ├── package.json
│   └── server.js
│
├── database/               # Database schema and migrations
│   ├── schema.sql
│   └── seed.sql
│
├── docker-compose.yml      # Docker configuration
├── .env.example            # Environment variables template
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL (or use Supabase)
- Ollama (optional, for local AI inference)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/manus-clone.git
cd manus-clone
```

2. Install dependencies:
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

4. Set up the database:
```bash
# If using Supabase, create a new project and run:
psql -h your-project.supabase.co -U postgres -d postgres -f database/schema.sql
```

5. Start the development servers:

```bash
# Start backend (from backend directory)
npm run dev

# Start frontend (from frontend directory)
npm run dev
```

6. Access the application:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

### Optional: Set Up Local AI with Ollama

```bash
# Install Ollama
curl -fsSL https://ollama.ai/install.sh | sh

# Start Ollama server
ollama serve

# Pull a model (e.g., llama3, mistral)
ollama pull llama3
```

## Environment Variables

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Backend (.env)
```env
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/manus_clone
SUPABASE_URL=your-supabase-url
SUPABASE_SERVICE_KEY=your-supabase-service-key
OLLAMA_URL=http://localhost:11434
GROQ_API_KEY=your-groq-api-key
HUGGING_FACE_TOKEN=your-hugging-face-token
JWT_SECRET=your-jwt-secret
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

### Documents
- `GET /api/documents` - List all documents
- `POST /api/documents` - Create document
- `GET /api/documents/:id` - Get document
- `PUT /api/documents/:id` - Update document
- `DELETE /api/documents/:id` - Delete document

### AI Features
- `POST /api/ai/complete` - AI text completion
- `POST /api/ai/suggest` - Get AI suggestions
- `POST /api/ai/generate` - Generate content

### Folders
- `GET /api/folders` - List folders
- `POST /api/folders` - Create folder
- `PUT /api/folders/:id` - Update folder
- `DELETE /api/folders/:id` - Delete folder

## Deployment

### Frontend (Free Options)
- **Vercel**: Connect GitHub repo for automatic deployment
- **Netlify**: Drag and drop build folder
- **GitHub Pages**: Static site hosting

### Backend (Free Options)
- **Render**: Free web service tier
- **Railway**: Free tier available
- **Cyclic**: Free Node.js hosting

### Database (Free Options)
- **Supabase**: Generous free tier
- **Neon**: Serverless PostgreSQL free tier
- **Railway**: Free PostgreSQL database

## Free Tier Limits

### Supabase Free Tier
- Database: 500 MB
- Storage: 1 GB
- Auth: Unlimited users
- API calls: Unlimited

### Groq Free Tier
- 30,000 tokens per minute
- 10 requests per minute

### Hugging Face Free Tier
- 30,000 tokens per month
- Rate limited

### Ollama (Local)
- Unlimited (runs on your machine)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [manus.im](https://manus.im) for inspiration
- [Ollama](https://ollama.ai) for local AI inference
- [Supabase](https://supabase.com) for backend services
- [Groq](https://groq.com) for fast AI inference API
- [Hugging Face](https://huggingface.co) for open AI models
