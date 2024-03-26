import { Router } from 'express';
import * as userController from '../controllers/userController';
import verifyToken from '../middlewares/authMiddleware';


const router: Router = Router();

router.get("",verifyToken, userController.userData);
router.delete("",verifyToken,userController.deleteUser);
router.get("/paginated-users", userController.paginatedUsers);
router.put("", verifyToken,userController.updateUser);

export default router;
