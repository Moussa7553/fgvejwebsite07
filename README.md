# FGVEJ Project Management System

A full-stack web application for managing and submitting projects, built with Next.js, TypeScript, and MongoDB.

## Features

### Project Submission
- Users can submit projects with detailed information
- File upload support for project attachments
- Form validation for all required fields
- Real-time feedback on submission status

### Admin Dashboard
- View all submitted projects
- Update project status (en_attente, en_cours, approuve, rejete)
- Real-time notifications for new submissions
- Project management interface

### Authentication
- Secure admin login system
- Protected admin routes
- Session management

## Tech Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB Atlas
- **Authentication**: NextAuth.js
- **File Storage**: MongoDB GridFS
- **State Management**: React Context API

## Project Structure

```
├── app/
│   ├── actions/         # Server actions for data operations
│   ├── api/            # API routes
│   ├── components/     # React components
│   ├── lib/           # Utility functions and configurations
│   ├── models/        # MongoDB models
│   └── (routes)/      # Application routes
├── public/            # Static assets
└── types/            # TypeScript type definitions
```

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd fgvejwebsite7
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Variables**
   Create a `.env.local` file with the following variables:
   ```
   MONGODB_URI=your_mongodb_connection_string
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

## API Endpoints

### Project Management
- `POST /api/projets` - Submit a new project
- `GET /api/projets` - Get all projects
- `PUT /api/projets/[id]/status` - Update project status

### File Management
- `GET /api/fichiers/[id]` - Download project files

## Database Schema

### Project Schema
```typescript
interface ProjetDocument {
  _id: string;
  nom: string;
  email: string;
  telephone: string;
  titre: string;
  description: string;
  montant: number;
  fichiers: FichierType[];
  statut: string;
  date_creation: string;
  date_modification?: Date;
}
```

### File Schema
```typescript
interface FichierType {
  nom: string;
  type: string;
  taille: number;
  contenu: Buffer;
  url: string;
}
```

## Project Statuses

- `en_attente` - Project is pending review
- `en_cours` - Project is under review
- `approuve` - Project has been approved
- `rejete` - Project has been rejected

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, please contact [support email/contact information] 