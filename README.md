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

---

## 1. **Commit Your Changes Locally**

Make sure all your changes are committed in git:
```bash
git add .
git commit -m "Update contact page, social links, and API info"
```

---

## 2. **Push to GitHub (or your Git provider)**

If your Vercel project is connected to a GitHub/GitLab/Bitbucket repo, push your changes:
```bash
git push origin main
```
> Replace `main` with your branch name if different.

---

## 3. **Vercel Will Deploy Automatically**

- Vercel watches your repo.  
- When you push to the connected branch, it triggers a new deployment automatically.
- You can watch the deployment progress in your [Vercel dashboard](https://vercel.com/dashboard).

---

## 4. **Manual Deploy (if not using Git integration)**

If you’re not using Git integration, you can:
- Use the [Vercel CLI](https://vercel.com/docs/cli):
  ```bash
  npm i -g vercel
  vercel
  ```
  Follow the prompts to deploy your project.

---

## 5. **Check Your Live Site**

- Once deployed, visit your Vercel URL (shown in the dashboard or CLI output).
- Test the contact page, social links, and API endpoints.

---

## 6. **(Optional) Environment Variables**

If you added/changed any environment variables, set them in the Vercel dashboard under **Project Settings > Environment Variables**.

---

### **Summary Table**

| Step                | Command/Action                        |
|---------------------|---------------------------------------|
| Commit changes      | `git add . && git commit -m "..."`    |
| Push to Git         | `git push origin main`                |
| Deploy (CLI)        | `vercel`                              |
| Check deployment    | Visit your Vercel URL                 |

---

**Let me know if you want a step-by-step for a specific method (GitHub, CLI, etc.) or if you hit any errors!** 