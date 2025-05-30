-- Création de la base de données si elle n'existe pas
CREATE DATABASE IF NOT EXISTS fgvej_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE fgvej_db;

-- Table des utilisateurs
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(36) PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20),
  password VARCHAR(255) NOT NULL,
  entrepreneur_type VARCHAR(50),
  role ENUM('user', 'admin') DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Table des projets
CREATE TABLE IF NOT EXISTS projects (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  project_name VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  impact TEXT NOT NULL,
  funding_amount DECIMAL(15, 2) NOT NULL,
  timeline INT NOT NULL,
  status ENUM('pending', 'reviewing', 'approved', 'rejected') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Table des fichiers de projet
CREATE TABLE IF NOT EXISTS project_files (
  id VARCHAR(36) PRIMARY KEY,
  project_id VARCHAR(36) NOT NULL,
  file_name VARCHAR(255) NOT NULL,
  file_type VARCHAR(50) NOT NULL,
  file_size INT NOT NULL,
  file_path VARCHAR(255) NOT NULL,
  uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- Table des messages de contact
CREATE TABLE IF NOT EXISTS messages (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status ENUM('unread', 'read', 'responded') DEFAULT 'unread',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  responded_at TIMESTAMP NULL
);

-- Table des modèles de documents
CREATE TABLE IF NOT EXISTS templates (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  file_type VARCHAR(20) NOT NULL,
  file_size INT NOT NULL,
  file_path VARCHAR(255) NOT NULL,
  download_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des ressources
CREATE TABLE IF NOT EXISTS resources (
  id VARCHAR(36) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  type ENUM('guide', 'video', 'faq') NOT NULL,
  category VARCHAR(50) NOT NULL,
  file_path VARCHAR(255) NOT NULL,
  thumbnail_path VARCHAR(255),
  duration VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des témoignages
CREATE TABLE IF NOT EXISTS testimonials (
  id VARCHAR(36) PRIMARY KEY,
  quote TEXT NOT NULL,
  author VARCHAR(100) NOT NULL,
  role VARCHAR(100) NOT NULL,
  project VARCHAR(255),
  image_path VARCHAR(255),
  is_published BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des projets financés
CREATE TABLE IF NOT EXISTS financed_projects (
  id VARCHAR(36) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  location VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL,
  description TEXT NOT NULL,
  impact JSON NOT NULL,
  image_path VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des actualités
CREATE TABLE IF NOT EXISTS news (
  id VARCHAR(36) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  date DATE NOT NULL,
  href VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des événements
CREATE TABLE IF NOT EXISTS events (
  id VARCHAR(36) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  date VARCHAR(100) NOT NULL,
  time VARCHAR(100) NOT NULL,
  location VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  category VARCHAR(50) NOT NULL,
  registration_link VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des FAQ
CREATE TABLE IF NOT EXISTS faqs (
  id VARCHAR(36) PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category VARCHAR(50) NOT NULL,
  order_index INT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Table des sessions
CREATE TABLE IF NOT EXISTS sessions (
  id VARCHAR(36) PRIMARY KEY,
  user_id VARCHAR(36) NOT NULL,
  token VARCHAR(255) NOT NULL UNIQUE,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Insertion de données initiales pour les modèles
INSERT INTO templates (id, name, description, file_type, file_size, file_path, download_count)
VALUES
  (UUID(), 'Plan d''Affaires - Projet Vert', 'Template complet pour structurer votre plan d''affaires écologique', 'PPTX', 2457600, '/templates/plan-affaires-projet-vert.pptx', 0),
  (UUID(), 'Analyse d''Impact Environnemental', 'Document pour évaluer l''impact écologique de votre projet', 'PDF', 1887436, '/templates/analyse-impact-environnemental.pdf', 0),
  (UUID(), 'Prévisions Financières - Projet Durable', 'Tableur pour calculer les coûts et revenus de votre projet', 'XLSX', 1258291, '/templates/previsions-financieres-projet-durable.xlsx', 0),
  (UUID(), 'Présentation de Projet - FGVEJ', 'Template de présentation pour soumettre votre projet à FGVEJ', 'PPTX', 3670016, '/templates/presentation-projet-fgvej.pptx', 0);

-- Insertion de données initiales pour les témoignages
INSERT INTO testimonials (id, quote, author, role, project, image_path, is_published)
VALUES
  (UUID(), 'Grâce à FGVEJ, j''ai pu lancer mon projet de gestion des déchets plastiques et contribuer à la réduction de la pollution dans ma communauté. Leur soutien financier et technique m''a permis de concrétiser mon rêve.', 'Aïcha S.', 'Entrepreneure verte', 'Recyclage des Déchets Plastiques', '/images/testimonials/aicha.jpg', TRUE),
  (UUID(), 'Le programme de formation en écologie m''a donné les compétences nécessaires pour intégrer des pratiques durables dans mon entreprise agricole. Aujourd''hui, je produis plus tout en consommant moins d''eau.', 'Moussa K.', 'Agriculteur durable', 'Agriculture Durable et Économie d''Eau', '/images/testimonials/moussa.jpg', TRUE),
  (UUID(), 'Sans les frais de garantie pris en charge par FGVEJ, je n''aurais jamais pu obtenir le financement pour mon projet d''énergie solaire. Maintenant, plus de 100 foyers dans mon village ont accès à l''électricité.', 'Fatou D.', 'Entrepreneur en énergie renouvelable', 'Production d''Énergies Renouvelables', '/images/testimonials/fatou.jpg', TRUE);

-- Insertion de données initiales pour les FAQ
INSERT INTO faqs (id, question, answer, category, order_index)
VALUES
  (UUID(), 'Quels types de projets sont éligibles à la garantie FGVEJ ?', 'FGVEJ soutient les projets à impact écologique dans les secteurs de l''agriculture durable, de l''énergie renouvelable, de la gestion des déchets, et d''autres activités favorisant le développement durable. Pour être éligible, votre projet doit contribuer à la réduction de l''empreinte carbone ou à la protection de l''environnement, et vous devez être âgé entre 18 et 35 ans.', 'eligibilite', 1),
  (UUID(), 'Comment postuler pour une garantie de prêt avec FGVEJ ?', 'Pour postuler, vous devez d''abord vous inscrire sur notre plateforme, puis soumettre votre projet en remplissant le formulaire de demande et en téléchargeant votre plan d''affaires. Notre équipe évaluera votre projet et vous contactera pour les étapes suivantes. Si vous avez besoin d''aide pour préparer votre plan d''affaires, nous proposons également un service d''accompagnement.', 'procedure', 1),
  (UUID(), 'Quelles sont les étapes de la formation en pratiques écologiques ?', 'La formation en pratiques écologiques est proposée aux entrepreneurs après l''obtention de leur financement. Elle se déroule sur 5 jours et couvre des sujets comme la gestion durable des ressources naturelles, les énergies renouvelables, l''efficacité énergétique, et les techniques d''agriculture durable. Cette formation est financée par nos partenaires et est gratuite pour les entrepreneurs financés par FGVEJ.', 'formation', 1),
  (UUID(), 'Puis-je accéder aux services de FGVEJ si mon projet est en phase de démarrage ?', 'Oui, FGVEJ soutient les projets à différentes phases, y compris les projets en phase de démarrage. Nous proposons un accompagnement pour vous aider à structurer votre idée et à élaborer un plan d''affaires solide. Cependant, pour bénéficier de la garantie, votre projet doit être suffisamment développé pour être présenté à une banque partenaire.', 'eligibilite', 2),
  (UUID(), 'Quel est le montant maximum de financement que je peux obtenir ?', 'FGVEJ couvre des projets nécessitant un financement entre 10 et 100 millions de FCFA. Le montant exact dépendra de la nature de votre projet, de sa viabilité économique, et de son impact écologique. Notre garantie couvre 50% du montant financé par la banque.', 'financement', 1);

-- Insertion de données initiales pour les événements
INSERT INTO events (id, title, date, time, location, description, category, registration_link)
VALUES
  (UUID(), 'Atelier de Sensibilisation pour les Entrepreneurs Verts', '15 Juin 2024', '09:00 - 17:00', 'Centre de Conférences FGVEJ, Bamako', 'Un atelier d''une journée pour découvrir les opportunités de financement et d''accompagnement offertes par FGVEJ. Présentation des critères d''éligibilité et des étapes pour soumettre un projet.', 'Formation', '/actualites/evenements/inscription?event=1'),
  (UUID(), 'Formation en Pratiques Écologiques - Session Juin', '20-24 Juin 2024', '09:00 - 16:00', 'Centre de Formation FGVEJ, Bamako', 'Formation de 5 jours en pratiques écologiques pour les entrepreneurs ayant obtenu un financement. Au programme : gestion durable des ressources, énergies renouvelables et agriculture durable.', 'Formation', '/actualites/evenements/inscription?event=2'),
  (UUID(), 'Rencontre avec les Banques Partenaires', '10 Juillet 2024', '14:00 - 17:00', 'Hôtel Radisson Blu, Bamako', 'Présentation des projets financés par FGVEJ aux banques partenaires et discussion sur les opportunités de collaboration future pour soutenir davantage d''entrepreneurs verts.', 'Partenariat', '/actualites/evenements/inscription?event=3');
