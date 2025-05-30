import { testerConnexion } from './lib/mongodb.js';

async function testConnection() {
  try {
    console.log('Test de la connexion MongoDB...');
    const result = await testerConnexion();
    console.log('Résultat du test:', result);
  } catch (error) {
    console.error('Erreur lors du test:', error);
  }
}

testConnection(); 