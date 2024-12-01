import mysql from 'mysql2/promise';

// Configuration de la connexion
export const handler = async (event) => {

 
  try {
    // Configuration de la connexion
    const pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT,
      connectionLimit: 10  // Nombre maximal de connexions simultanées
    });
    // Déstructuration de l'événement
    const { property_id, property_state, property_country } = event;

    // Requête d'insertion
    const [insertResult] = await pool.execute(
      'INSERT INTO property (property_id, property_state, property_country) VALUES (?, ?, ?)',
      [property_id, property_state, property_country]
    );

    // Requête de récupération
    const [rows] = await pool.execute(
      'SELECT * FROM property WHERE property_id = ?',
      [property_id]
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Propriété ajoutée avec succès !',
        property: rows[0]
      })
    };

  } catch (error) {
    console.error('Erreur de base de données :', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Erreur lors de l\'ajout de la propriété',
        error: error.message
      })
    };
  }
};

// Wrapper l'appel dans une fonction async auto-exécutée
(async () => {
  process.env.DB_HOST = '127.0.0.1';
  process.env.DB_USER = 'root';
  process.env.DB_PASSWORD = 'lambda';
  process.env.DB_NAME = 'lambda';
  process.env.DB_PORT = 3308;

  //10 random countrie from the world
  const countries = [
    "Guinea",
    "France",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran"
  ];
  //get one random country in var
  const randomCountry = countries[Math.floor(Math.random() * countries.length)];

  //30 random cities in europe
  const cities = [
    "Paris",
    "Marseille",
    "Lyon",
    "Toulouse",
    "Nice",
    "Nantes",
    "Strasbourg",
    "Montpellier",
    "Bordeaux",
    "Lille",
    "Rennes",
    "Reims",
    "Le Havre",
    "Saint-Étienne",
    "Toulon",
    "Grenoble",
    "Dijon",
    "Angers",
    "Nîmes",
    "Villeurbanne",
    "Saint-Denis",
    "Le Mans",
    "Aix-en-Provence",
    "Clermont-Ferrand",
    "Brest",
    "Tours",
    "Limoges",
    "Amiens",
    "Perpignan",
    "Metz"
  ];

  //get one random city in var
  const randomCity = cities[Math.floor(Math.random() * cities.length)];

  const randomInt = Math.floor(Math.random() * (1000 - 1) + 1); 
  const randomName = Math.random().toString(36).substring(7);

  console.log(randomName);
   
  const event = {
    "property_id": randomInt,
    "property_state": randomCity,
    "property_country": randomCountry
  }
  const response = await handler(event);
  console.log(response);
})();

