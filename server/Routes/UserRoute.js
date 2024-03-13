const express =require("express")

const {deleteUser, followUser, getUser, unfollowUser, updateUser,getAllUsers}=require("../Controllers/UserController")

const authMiddleWare = require("../middleware/AuthMiddleware")
const router = express.Router();



router.get('/:id', getUser);
router.get('/',getAllUsers)
router.put('/:id',authMiddleWare, updateUser)
router.delete('/:id',authMiddleWare, deleteUser)
router.put('/:id/follow',authMiddleWare, followUser)
router.put('/:id/unfollow',authMiddleWare, unfollowUser)


module.exports=router