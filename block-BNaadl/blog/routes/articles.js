const express = require('express');
const Article = require('../models/article');

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
    Article.create(req.body,  (err, createdArticle) => {
        if(err) return next(err);
        res.redirect('/articles');
    });    
});

router.get('/:id', (req, res, next) => {
    let id = req.params.id;
    Article.findById(id, (err, article) => {
        if(err) return next(err);
        res.render('singleArticle', { article: article});
    });
});
router.get('/:id/edit', (req, res, next) => {
    let id = req.params.id;
    Article.findById(id, (err, article) =>  {
        if(err) return next(err);
        res.render('editArticle', { article });
    });
});
router.get('/:id/like', (req, res, next) => {
    let id = req.params.id;

    Article.findByIdAndUpdate(id, (err, article) =>  {
        if(err) return next(err);
        article.likes += 1;
        res.render('singleArticle', { article });
    });
});

router.post('/:id', (req, res, next) => {
    let id = req.params.id;
    Article.findByIdAndUpdate(id, req.body, (err, updatedArticle) => {
        if(err) return next(err);
        res.redirect('/articles');
    });
});
router.put('/:id', (req, res, next) => {
    let id = req.params.id;
    Article.findByIdAndUpdate(id, req.body, (err, updatedArticle) => {
        if(err) return next(err);
        res.redirect('/articles');
    });
});



router.get('/:id/delete', (req, res, next) => {
    let id = req.params.id;
    Article.findByIdAndDelete(id, (err, deletedArticle) => {
        if(err) return next(err);
        res.redirect('/articles');
    });
});
router.delete('/:id', (req, res, next) => {
    let id = req.params.id;
    Article.findByIdAndDelete(id, (err, deletedArticle) => {
        if(err) return next(err);
        res.redirect('/articles');
    });
});

module.exports = router;

