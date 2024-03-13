const express =require("express")



const {createPost,deletePost,getPost,updatePost,likePost,getTimelinePosts}=require("../Controllers/PostController")

const router=express.Router()

router.post('/',createPost)
router.delete('/:id',deletePost)
router.get('/:id',getPost)
router.put('/:id',updatePost)
router.put('/:id/like',likePost)
router.get("/:id/timeline",getTimelinePosts)

module.exports=router

