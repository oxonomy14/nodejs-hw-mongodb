import { getAllContactsController, getContactByIdController, deleteContactController, createContactController, patchContactController } from '../controllers/contacts.js';
import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createContactSchema } from '../validation/contacts.js';

const router = Router();

router.use('/contacts/:contactId', isValidId('contactId')); // більшь гнучка, можеме змнінювати змінну contactId

router.get('/contacts', ctrlWrapper(getAllContactsController));  
router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController)); 
router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController)); 
router.post('/contacts',validateBody(createContactSchema), ctrlWrapper(createContactController));  
router.patch('/contacts/:contactId', ctrlWrapper(patchContactController));





export default router;