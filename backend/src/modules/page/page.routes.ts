import {Router} from 'express';
import {createPage, getUserPages, getPages, updatePage, deletePage} from './page.controller';

const router = Router();

router.get('/', getPages);
router.get('/user/:userId', getUserPages);
router.post('/', createPage);
router.put("/:id", updatePage);
router.delete("/:id", deletePage);

export default router;
