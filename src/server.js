import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { getEnvVar } from './utils/getEnvVar.js';
import { getAllContacts, getContactById } from './services/contacts.js';



export const setupServer = () => {

  const PORT = Number(getEnvVar('PORT', '5000'));
  const app = express();

  app.use(cors());
  
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
      "status": 200,
       "message": 'Successfully found contacts!',
      "data": { contacts, }
    });
  });

  app.get('/contacts/:contactId', async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);   
    
    // Відповідь, якщо контакт не знайдено
	if (!contact) {
	  res.status(404).json({
		  message: 'contact not found'
	  });
	  return;
	}

	// Відповідь, якщо контакт знайдено
    res.status(200).json({
      status: 200,
	message: `Successfully found contact with id ${contactId}!`,
      data: { contact },
    });
  });

  // Обробник 404 
  app.use((req, res) => {
    res.status(404).json({
      message: 'Route not found',
    });
  });
 
  
  // Middleware для обробки помилок 
  app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });
  
  
  // Запуск сервера
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  

};