const express = require('express');
const Posts = require('../Models/posts');

const router = express.Router();

//save posts
router.post('/post/save', async (req, res) => {
    try {
      let newPost = new Posts(req.body);
      await newPost.save();
      return res.status(200).json({
        success: "Post saved successfully",
      });
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  });


//get posts
router.get('/posts', async (req, res) => {
    try {
      const posts = await Posts.find();
      return res.status(200).json(posts);
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  });

// get specific posts
router.get("/post/:id", async (req, res) => {
    try {
      const postId = req.params.id;
      console.log("postId:", postId);
      const post = await Posts.findById(postId).exec();
  
      if (!post) {
        return res.status(404).json({ success: false, message: 'Post not found' });
      }
  
      return res.status(200).json({
        success: true,
        post
      });
    } catch (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
  });
  
  


//update posts
router.put('/post/update/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const updatedPost = await Posts.findByIdAndUpdate(id, req.body, { new: true });
      return res.status(200).json({
        success: "Post updated successfully",
      })
    } catch (error) {
      return res.status(400).json({
        error: error.message,
      });
    }
  });

// delete posts
router.delete('/post/delete/:id', async (req, res) => {
    try {
      const deletedPost = await Posts.findOneAndDelete({ _id: req.params.id });
      if (!deletedPost) {
        return res.status(404).json({
          message: 'Post not found',
        });
      }
      return res.json({
        message: 'Delete successful',
        deletedPost,
      });
    } catch (error) {
      return res.status(400).json({
        message: 'Delete unsuccessful',
        error: error.message,
      });
    }
  });
  
module.exports = router;