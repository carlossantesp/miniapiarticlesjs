'use strict'

var express = require('express');
var ArticleController = require('../controllers/articleController');

var router = express.Router();

var multiparty = require('connect-multiparty');
var md_upload = multiparty({ uploadDir: './assets/images/articles'});


//Rutas
router.get('/articles', ArticleController.getLists);
router.post('/articles', ArticleController.create);
router.get('/articles/:id', ArticleController.getArticle);
router.put('/articles/:id', ArticleController.update);
router.delete('/articles/:id', ArticleController.delete);
router.post('/upload-image/articles/:id', md_upload, ArticleController.upload);
router.get('/get-image/articles/:image',ArticleController.getImage);
router.get('/search/articles',ArticleController.search);

module.exports = router;
