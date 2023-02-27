import express from 'express';
import {CreateUserHandler, GetAllUsersHandler, GetUserByIdHandler} from "../controller/user.controller";
import {protect, authorize} from '../middleware/auth'
const router = express.Router();

router.use(protect);
// Find route and put handler
router.route('/')
    .get(GetAllUsersHandler)
    .post(CreateUserHandler)


router.route('/:id')
    .get(GetUserByIdHandler)
    .put(GetUserByIdHandler)
    .delete(GetUserByIdHandler)

export default router;