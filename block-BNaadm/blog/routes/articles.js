const express = require('express');
const Article = require('../models/article');
const Comment = require('../models/comments');

const router = express.Router();

router.get('/', (req, res, next) => {
    Article.find({}, (err, articles) => {
        if(err) return next(err);
        res.render('articles', {articles: articles})
    });
});


router.get('/new', (req, res) => {
    res.render('addArticle');
});

router.post('/', (req, res, next) => {
    req.body.tags = req.body.tags.trim().split(' ');
    Article.create(req.body,  (err, createdArticle) => {
        if(err) return next(err);
        res.redirect('/articles');
    });    
});

router.get('/:id', (req, res, next) => {
    let id = req.params.id;
    Article.findById(id).populate('comments').exec((err, article) => {
        if(err) return next(err);
        res.render('articleDetails', { article: article});
    });
});
router.get('/:id/edit', (req, res, next) => {
    let id = req.params.id;
    Article.findById(id, (err, article) =>  {
        if(err) return next(err);
        res.render('editArticle', { article });
    });
});
// Increment Likes
router.get('/:id/likes', (req, res, next) => {
    let id = req.params.id;

    Article.findByIdAndUpdate(id, {$inc: {likes: 1}}, (err, article) =>  {
        if(err) return next(err);
        res.redirect('/articles/' + id);
    });
});
// Update Article
router.post('/:id', (req, res, next) => {
    let id = req.params.id;
    req.body.tags = req.body.tags.trim().split(' ');
    Article.findByIdAndUpdate(id, req.body, (err, updatedArticle) => {
        if(err) return next(err);
        res.redirect('/articles');
    });
});
// Delete Article
router.get('/:id/delete', (req, res, next) => {
    let id = req.params.id;
    Article.findByIdAndDelete(id, (err, deletedArticle) => {
        if(err) return next(err);
        Comment.deleteMany({ articleId: deletedArticle._id }, (err, info) => {
        if(err) return next(err);
        res.redirect('/articles');
        });
    });
});
// Add comment
router.post('/:id/comments', (req, res, next) => {
    let id = req.params.id;
    req.body.articleId = id;
    Comment.create(req.body, (err, comment) => {
        if(err) return next(err);
        Article.findByIdAndUpdate(id, {$push: {comments: comment._id}}, (err, updatedArticle) => {
            if(err) return next(err);
            res.redirect('/articles/' + id); 
        });
    });
});

module.exports = router;

