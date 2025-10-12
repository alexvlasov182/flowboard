import {Router} from 'express';
import {createPage, getUserPages} from '../controllers/page.controller';

const router = Router();

router.post('/', createPage);
router.get('/:userId', getUserPages)

export default router;
