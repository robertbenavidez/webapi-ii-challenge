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
            console.log(post)
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




module.exports = router;

