import { getAllContactsController, getContactByIdController, deleteContactController, createContactController, patchContactController } from '../controllers/contacts.js';
import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();



router.get('/contacts', ctrlWrapper(getAllContactsController));  
router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController)); 
router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController)); 
router.post('/contacts', ctrlWrapper(createContactController));  
router.patch('/contacts/:contactId', ctrlWrapper(patchContactController));





export default router;