import express from "express";
import {
    getUsers,
    getUsersbyId,
    createUser,
    updateUser,
    deleteUser
} from "../controller/userController.js";

const router = express.Router();

router.get('/users', getUsers);
router.get('/users/:id', getUsersbyId);
router.post('/users', createUser);
router.patch('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

export default router;
