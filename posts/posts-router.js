const express = require("express")
const router = express.Router();


const Helpers = require('../data/db.js');


router.get("/", (req, res) => {
    Helpers.find()
        .then(posts => {
            res.status(200).json({
                query: req.query,
                data: posts
            })
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({
                message: "Error retrieving posts"
            });
        });
});

router.get("/:id", (req, res) => {
    Helpers.findById(req.params.id)
        .then(post => { 
            if(post){           
            res.status(200).json(post)
            }else{
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                })
            }
        })
        .catch(error =>{
            res.status(500).json({ error: "The post information could not be retrieved." })
        })
});


router.get("/:id/comments", (req, res) => {
    console.log(req.params);
    Helpers.findPostComments(req.params.id)
        .then(comments =>{
        if(comments){
            res.status(200).json(comments)
        }else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
        
        })
        .catch(error=>{
            res.status(500).json({ error: "The comments information could not be retrieved." })
        })

});

router.post("/", (req, res) => {
    console.log("req.body", req.body)
    if(!req.body.title || !req.body.contents){
            res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
        }
    Helpers.insert(req.body)
    .then(postId =>{
        console.log("postid",postId)
        Helpers.findById(postId.id)
        .then(post=>{
            res.status(201).json(post)
        })
        .catch(err=>{
            console.log("error inside helper", err)
        })
    })
    .catch(err =>{
        console.log(err)
        res.status(500).json({ error: "There was an error while saving the post to the database" })
    })
});

router.post("/:id/comments", (req, res) => {
    const commentInfo = {
        ...req.body,
        post_id: req.params.id
    }
    console.log(commentInfo);
    Helpers.insertComment(commentInfo)

        .then(comment =>{

            if(!commentInfo.text){
                res.status(400).json({errorMessage: "Please provide text for the comment."})
            }else{
                res.status(201).json(commentInfo)
            }
        })
        .catch(error =>{
            res.status(500).json({ error: "There was an error while saving the comment to the database" })
        })
});

router.delete("/:id", (req, res) => {
    Helpers.remove(req.params.id)
    .then(count =>{
        if(count>0){
            res.status(200).json({message: "post deleted"})
        } else{
            res.status(404).json({message: "The post with the specified ID does not exist"})
        }
    })
    .catch(error=>{
        res.status(500).json({error: "The post could not be removed"})
    })
});

router.put("/:id", (req, res) => {
    const changes = req.body;
    if (!changes.title || !changes.contents) {
        res.status(400).json({
            errorMessage: "please provide title and contents for the post."
        })
    } else(
        Helpers.update(req.params.id, changes)
        .then(post => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({
                    message: 'The post with the specified ID does not exist'
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                message: 'Error updating the post'
            })
        })
    )
});

module.exports = router;