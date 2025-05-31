import mongoose from "mongoose";

const URI_MONGODB =
  process.env.URI_MONGODB ||
  "mongodb+srv://Moise1:Moussa%4075%23%2A@cluster1.ec73eu8.mongodb.net/fgvej?retryWrites=true&w=majority&appName=Cluster1";

let isConnected = false;

export async function connecterBaseDeDonnees() {
  if (isConnected) {
    console.log("Utilisation de la connexion MongoDB existante");
    return mongoose.connection;
  }

  try {
    console.log("Tentative de connexion à MongoDB...");

    const conn = await mongoose.connect(URI_MONGODB, {
      bufferCommands: false,
    });

    isConnected = true;
    console.log("Connexion MongoDB établie avec succès");

    return conn.connection;
  } catch (erreur) {
    console.error("Erreur de connexion MongoDB:", erreur);
    return null;
  }
}
