"use server"

import { connectToDatabase } from "@/lib/mongodb"
import Projet from "@/models/Project"
import { v4 as uuidv4 } from "uuid"

interface ProjetType {
  _id: string;
  titre: string;
  statut: string;
  date_modification: Date;
}

interface FichierType {
  nom: string;
  type: string;
  taille: number;
  contenu: Buffer;
  url: string;
}

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
  toObject(): any;
}

export async function soumettreProjet(formData: FormData) {
  try {
    // Récupérer les données du formulaire
    const nom = formData.get("nom") as string
    const email = formData.get("email") as string
    const telephone = formData.get("telephone") as string
    const titre = formData.get("titre") as string
    const description = formData.get("description") as string
    const montant = Number(formData.get("montant"))
    const fichiers = formData.getAll("fichiers") as File[]

    console.log("Données reçues:", {
      nom,
      email,
      telephone,
      titre,
      description,
      montant,
      nombreFichiers: fichiers.length
    })

    // Validation des champs obligatoires
    if (!nom || !email || !telephone || !titre || !description || !montant) {
      console.log("Validation échouée - Champs manquants:", {
        nom: !!nom,
        email: !!email,
        telephone: !!telephone,
        titre: !!titre,
        description: !!description,
        montant: !!montant
      })
      return {
        succes: false,
        message: "Veuillez remplir tous les champs obligatoires",
      }
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      console.log("Validation échouée - Email invalide:", email)
      return {
        succes: false,
        message: "Veuillez entrer une adresse email valide",
      }
    }

    // Validation des fichiers
    if (fichiers.length === 0) {
      console.log("Validation échouée - Aucun fichier")
      return {
        succes: false,
        message: "Veuillez joindre au moins un fichier",
      }
    }

    // Établir la connexion à la base de données
    const conn = await connectToDatabase()
    if (!conn) {
      return {
        succes: false,
        message: "Erreur de connexion à la base de données",
      }
    }

    // Traiter les fichiers
    const fichiersTraites = await Promise.all(
      fichiers.map(async (fichier) => {
        // Convertir le fichier en ArrayBuffer
        const arrayBuffer = await fichier.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        // Créer un ID unique pour le fichier
        const fileId = uuidv4()

        // Créer un objet fichier qui correspond exactement au schéma Mongoose
        const fichierTraite: FichierType = {
          nom: fichier.name,
          type: fichier.type,
          taille: fichier.size,
          contenu: buffer,
          url: `/api/fichiers/${fileId}`
        }

        console.log("Fichier traité:", {
          nom: fichierTraite.nom,
          type: fichierTraite.type,
          taille: fichierTraite.taille,
          url: fichierTraite.url
        })

        return fichierTraite
      })
    )

    // Créer le nouveau projet
    const nouveauProjet = await Projet.create({
      _id: uuidv4(),
      nom,
      email,
      telephone,
      titre,
      description,
      montant,
      fichiers: fichiersTraites,
      statut: "en_attente",
      date_creation: new Date().toISOString(),
    })

    if (!nouveauProjet) {
      return {
        succes: false,
        message: "Erreur lors de la création du projet",
      }
    }

    console.log("Projet créé avec succès:", {
      id: nouveauProjet._id,
      titre: nouveauProjet.titre,
      nombreFichiers: nouveauProjet.fichiers.length
    })

    // Envoyer une notification aux administrateurs
    if (typeof window !== "undefined" && (window as any).envoyerNotification) {
      ;(window as any).envoyerNotification(
        "projet",
        `Nouveau projet soumis : ${nouveauProjet.titre} par ${nouveauProjet.nom}`,
        "admin"
      )
    }

    return {
      succes: true,
      message: "Projet soumis avec succès",
    }
  } catch (erreur) {
    console.error("Erreur lors de la soumission du projet:", erreur)
    
    // Gérer les erreurs spécifiques
    if (erreur instanceof Error) {
      if (erreur.name === "ValidationError") {
        return {
          succes: false,
          message: "Données invalides. Veuillez vérifier les informations saisies.",
        }
      }
      if (erreur.name === "MongoServerError") {
        return {
          succes: false,
          message: "Erreur de serveur. Veuillez réessayer plus tard.",
        }
      }
    }
    
    return {
      succes: false,
      message: "Une erreur est survenue lors de la soumission du projet",
    }
  }
}

export async function getProjects() {
  try {
    const conn = await connectToDatabase();
    if (!conn) {
      return { succes: false, message: "Erreur de connexion à la base de données", projets: [] };
    }

    // Pour l'instant, récupérons tous les projets. Plus tard, nous pourrons filtrer par utilisateur si nécessaire.
    const projets = await Projet.find({});

    // Convertir les documents Mongoose en objets JavaScript simples et exclure le contenu des fichiers
    const projetsObjet = projets.map((projet: ProjetDocument) => {
      const projetObj = projet.toObject();
      // Ne garder que les informations nécessaires des fichiers
      projetObj.fichiers = projetObj.fichiers.map((fichier: FichierType) => ({
        nom: fichier.nom,
        type: fichier.type,
        taille: fichier.taille,
        url: fichier.url
      }));
      return projetObj;
    });

    console.log("Projets récupérés:", projetsObjet);

    return { 
      succes: true, 
      projets: projetsObjet,
      message: "Projets récupérés avec succès"
    };

  } catch (erreur) {
    console.error("Erreur lors de la récupération des projets:", erreur);
    return { 
      succes: false, 
      message: "Une erreur est survenue lors de la récupération des projets",
      projets: []
    };
  }
}

export async function updateProjectStatus(projectId: string, newStatus: string) {
  try {
    console.log("Tentative de mise à jour du statut:", { projectId, newStatus })
    
    const conn = await connectToDatabase()
    if (!conn) {
      console.error("Échec de la connexion à la base de données")
      return { succes: false, message: "Erreur de connexion à la base de données" }
    }

    // Vérifier que le statut est valide
    const statutsValides = ["en_attente", "en_cours", "approuve", "rejete"]
    if (!statutsValides.includes(newStatus)) {
      console.error("Statut invalide:", newStatus)
      return { succes: false, message: "Statut invalide" }
    }

    // Utiliser lean() pour obtenir un objet JavaScript simple
    const projet = await Projet.findByIdAndUpdate(
      projectId,
      { 
        $set: {
          statut: newStatus,
          date_modification: new Date()
        }
      },
      { new: true, lean: true }
    ) as ProjetType | null;

    if (!projet) {
      console.error("Projet non trouvé:", projectId)
      return { succes: false, message: "Projet non trouvé" }
    }

    // Créer un objet simple avec seulement les données nécessaires
    const projetSimplifie = {
      _id: projet._id,
      titre: projet.titre,
      statut: projet.statut,
      date_modification: projet.date_modification
    }

    console.log("Statut mis à jour avec succès:", {
      projectId,
      newStatus,
      projet: projetSimplifie
    })

    return { 
      succes: true, 
      message: "Statut du projet mis à jour avec succès",
      projet: projetSimplifie
    }
  } catch (erreur) {
    console.error("Erreur détaillée lors de la mise à jour du statut:", erreur)
    return { 
      succes: false, 
      message: "Une erreur est survenue lors de la mise à jour du statut" 
    }
  }
}
