import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';
import { getAllContacts, getContactById } from './services/contacts.js';



export const setupServer = () => {

  const PORT = Number(getEnvVar('PORT', '5000'));
  const app = express();

  app.use(cors());

// Додаємо форматування JSON-виводу з відступами
app.set('json spaces', 2);
  
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );
  
  // Головний маршрут
  app.get('/', (req, res) => {
    res.json({ message: 'Hello world!' });
  });

  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();

    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts
    });
  });

  app.get('/contacts/:contactId', async (req, res, next) => {
   
    try {
      const { contactId } = req.params;
      const contact = await getContactById(contactId);
      if (!contact) {
        return res.status(404).json({ message: 'Contact not found' });
      }
      res.status(200).json({ status: 200, message: `Successfully found contact with id ${contactId}!`, data: contact });
    } catch (error) {
      next(error); // передаємо помилку глобальному обробнику
    }
  });
 
  
  // Middleware для обробки помилок 
  app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({
    message: 'Something went wrong',
    error: err.message,
    });
  });
  
    // Обробник 404 
    app.use((req, res) => {
      res.status(404).json({
      message: 'Route not found',
      });
    });
  
  // Запуск сервера
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  

};