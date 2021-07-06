const express = require('express');
const Article = require('../models/article');
const Comment = require('../models/comments');

const router = express.Router();


router.get('/:id/edit', (req, res, next) => {
    let id = req.params.id;
    Comment.findById(id, (err, comment) => {
        if(err) return next(err);
        res.render('updateComment', { comment });
    })    
});

router.post('/:id', (req, res, next) => {
    let id = req.params.id;
    Comment.findByIdAndUpdate(id, req.body, (err, updatedComment) => {
        if(err) return next(err);
        res.redirect('/articles/' + updatedComment.articleId);
    });
});

router.get('/:id/delete', (req, res, next) =>  {
    let id = req.params.id;
    Comment.findByIdAndRemove(id, (err, deletedComment) =>  {
        if(err) return next(err);
        Article.findByIdAndUpdate(comment.articleId, {$pull: {comments: deletedComment._id}}, (err, article) => {
        if(err) return next(err);
        res.redirect('/articles/' + deletedComment.articleId);
        })
    });
});



module.exports = router;
