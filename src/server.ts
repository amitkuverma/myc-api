import app from './app';
import { initDb } from './models';
// import open from 'open';
import config from './config/config';

const PORT = process.env.PORT || 8082;

const startServer = async () => {
  try {
    await initDb();  // Initialize DB and sync models

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
     // open(config.swaggerUrl);  // Automatically open Swagger UI
    });
  } catch (error) {
    console.error('Error starting server:', error);
  }
};

startServer();
