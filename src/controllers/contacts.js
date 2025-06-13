import createHttpError from 'http-errors';
import { getAllContacts, getContactById, deleteContactById, createContact, updateContact } from '../services/contacts.js';


export const getAllContactsController = async (req, res, next) => {

    try {
        const contacts = await getAllContacts();
    
        res.status(200).json({
          status: 200,
          message: 'Successfully found contacts!',
          data: contacts
        });
      } catch (err) {
        next(err);
      }
};
  
export const getContactByIdController = async (req, res, next) => {
    
    try {
        const { contactId } = req.params;
    
        const contact = await getContactById(contactId);
    
        if (!contact) {
          // Якщо контакт не знайдено — кидаємо 404
          throw createHttpError(404, 'Contact not found');
        }
    
        res.status(200).json({
          status: 200,
          message: `Successfully found contact with id ${contactId}!`,
          data: contact
        });
      } catch (err) {
        next(err); 
      }
    
};

export const deleteContactController = async (req, res, next) => {
    
    try {
        const { contactId } = req.params;
    
        await deleteContactById(contactId);
    
       
        res.status(204).send();
    } catch (err) {
        next(err);
    }
    
};

export const createContactController = async (req, res) => {
  const contact = await createContact(req.body);
    res.status(201).json({
        message: 'Successfully created a contact',
        status: 201,
        data: contact,
    });
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await updateContact(contactId, req.body);

  if (!result) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a contact!`,
    data: result.contact,
  });
};