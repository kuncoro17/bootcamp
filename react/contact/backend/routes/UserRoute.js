const  express = require ("express");
import {getUsers} from "../controller/userController.js";
const router = express.Router();
router.get('/users', getUsers);

module.exports = router