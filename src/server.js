import express from 'express';

export const setupServer = () => {

  const PORT = 3000;

  const app = express();

  app.use((req, res, next) => {
    console.log(`Time: ${new Date().toLocaleString()}`);
    next();
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });

};