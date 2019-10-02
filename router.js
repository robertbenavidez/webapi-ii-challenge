const express = require('express');

const Posts = require('./data/db.js');


const router = express.Router();


// GET all posts

router.get('/', (req, res) => {
    Posts.find()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(error => {
            res.status(500).json({ message: "unable to retrieve posts"})
        })
    
})

// GET post by ID

router.get('/:id', (req, res) => {
    const {id} = req.params
    Posts.findById(id)
        .then(([post]) => {
        
            if (!post) {
                res.status(404).json({message: "ID does not exist"})
            } else {
                res.status(200).json(post)
            }
        })
        .catch(error => {
            res.status(500)
        })
})

// GET  /api/posts/:id/comments 
 //Returns an array of all the comment objects 
 //associated with the post with the specified id.

 router.get('/:id/comments', (req, res) => {
     const postId = req.params.id;


     Posts.findPostComments(postId)
        .then(comment => {
        if (comment.length > 0) {
            res.status(200).json(comment);
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist" });
        }
        })
        .catch(error => {
        res.status(500).json({ message: "The comments information could not be retrieved" });
        });
 })


// POST new POST


router.post("/", (req, res) => {
    const newPost = req.body;
    if (newPost.title && newPost.contents) {
      Posts.insert(newPost)
        .then(post => {
          res.status(201).json(newPost);
        })
        .catch(error => {
          res.status(500).json({ message: "Unable to add post" });
        });
    } else {
      res.status(400).json({ message: "Title and contents required."});
    }
  });

  router.post("/:id/comments", (req, res) => {
    const id = req.params.id;
    const post = {
        "post_id": id,
        "text": req.body.text
    }
  Posts.insertComment(post)
  .then(newPost => {
    res.status(201).json(newPost)
  })
  .catch(error => {
    res.status(500).json({message:error})
  })
  });


  router.delete("/:id", (req, res) => {
    const id = req.params.id;
    Posts.remove(id)
      .then(post => {
        res.status(200).json(post);
      })
      .catch(() => {
        res
          .status(500)
          .json({ message: "Unable to delete post" });
      });
  });

  router.put("/:id",  (req, res) => {
    const changes = req.body;
    const id = req.params.id;
    console.log(req.body)
    Posts.update(id, changes)
      .then(post => {
        res.status(200).json(post);
      })
      .catch(() => {
        res
          .status(500)
          .json({ message: "Unable to update" });
      });
  });



module.exports = router;

