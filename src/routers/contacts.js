import { getAllContactsController, getContactByIdController, deleteContactController, createContactController, patchContactController } from '../controllers/contacts.js';
import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();



router.get('/', ctrlWrapper(getAllContactsController));  
router.get('/:contactId', ctrlWrapper(getContactByIdController)); 
router.delete('/:contactId', ctrlWrapper(deleteContactController)); 
router.post('/', ctrlWrapper(createContactController));  
router.patch('/:contactId', ctrlWrapper(patchContactController));





export default router;