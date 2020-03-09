'use strict'

var Article = require('../models/article');
var fs = require('fs');
var path = require('path');

var controller = {
    async getLists(req, res) {
        var last = req.query.last;
        try {
            var num = last==='last' ? 5 : 0;
            const articles = await Article.find().sort('-_id').limit(num);
            if(articles.length === 0 || articles === null)
                return res.status(404).json({message: 'No tiene articulos'})
            res.status(200).json({data: articles});
        } catch (error) {
            if(error.name === "MongoNetworkError")
                return res.status(404).json({message: "Error en la conexion de la base de datos"});
            return res.status(500).json({message: error.message});
        }
    },
    async getArticle(req, res) {
        try {
            const article = await Article.findById(req.params.id)
            if(article===null) return res.status(404).json({message: 'Articulo no encontrado'});
            res.json({data: article});
        } catch (error) {
            if(error.name === "MongoNetworkError")
                return res.status(404).json({message: "Error en la conexion de la base de datos"});
            if(error.name === "CastError")
                return res.status(404).json({message: "No exite el articulo"});
            return res.status(500).json({message: error});
        }
    },
    async create(req, res) {
        var params  = req.body;

        const article = new Article({
            title: params.title,
            content: params.content,
        });

        try {
            const newArticle = await article.save();
            res.status(201).json({data: newArticle});
        } catch (error) {
            if(error.name === "ValidationError")
                return res.status(422).json({message: "Datos del articulo insuficiente", errors: error.errors});
            if(error.name === "MongoNetworkError")
                return res.status(404).json({message: "Error en la conexion de la base de datos"});
            return res.status(400).json({message: error.message});
        }
    },
    async update(req, res) {
        var params = req.body;
        try {
            const updateArticle = await Article.findOneAndUpdate({_id: req.params.id}, params, {new:true, runValidators:true});
            res.status(200).json({data: updateArticle});
        } catch (error) {
            if(error.name === "ValidationError")
                return res.status(422).json({message: "Datos del articulo insuficiente", errors: error.errors});
            if(error.name === "MongoNetworkError")
                return res.status(404).json({message: "Error en la conexion de la base de datos"});
            return res.status(400).json({message: error.message});
        }
    },
    async delete(req, res) {
        try {
            const deleteArticle = await Article.findByIdAndRemove({_id: req.params.id});
            if(deleteArticle === null)
                return res.status(404).json({message: 'No se ha borrado el articulo, posiblemente no exita'})
            res.status(200).json({message:"Articulo eliminado correctamente", data: deleteArticle});
        } catch (error) {
            if(error.name === "MongoNetworkError")
                return res.status(404).json({message: "Error en la conexion de la base de datos"});
            res.status(500).json({message: error.message});
        }
    },
    async search(req, res) {
        var searchString = req.query.search;
        try {
            const articles = await Article.find({ "$or": [
                {"title": {"$regex":searchString, "$options": "i"}},
                {"content": {"$regex":searchString, "$options": "i"}},
            ]}).sort([['date', 'descending']]);
            if(articles === null || articles.length === 0)
                return res.status(404).json({message: 'No hay articulos que coincidan con tu busqueda'})
            res.status(200).json({data: articles});
        } catch (error) {
            res.status(404).json({message: error.message});
        }
    },
    async upload (req, res) {
        var file_name="Imagen no subida...";

        if(!req.files) return res.status(404).json({message:file_name});

        var file_path = req.files.file0.path;
        var file_split = file_path.split('/');
        //Nomde del archivo
        var file_name = file_split[3];
        var extension_split = file_name.split('.');
        //Extension del archivo
        var file_ext = extension_split[1];

        if(file_ext !='png' && file_ext !='jpg' && file_ext !='jpeg' && file_ext !='svg'){
            //Borrar el archivo subido
            fs.unlink(file_path,function(err){
                if(err) return res.status(200).json({ message: 'La extension de la imagen no es valida'});
            });
        }else{
            try {
                const updateArticle = await Article.findByIdAndUpdate({_id: req.params.id}, {image: file_name},{new: true});
                res.status(200).json({data: updateArticle});
            } catch (error) {
                if(error.name === "MongoNetworkError")
                    return res.status(404).json({message: "Error en la conexion de la base de datos"});
                res.status(500).json({message: error.message});
            }
        }
    },
    getImage: (req, res) =>{
        var file = req.params.image;
        var path_file = './assets/images/articles/'+file;

        fs.exists(path_file,(exists)=>{
            if(exists) return res.sendFile(path.resolve(path_file));
            else return res.status(404).json({message: 'La imagen no existe'});
        });
    }
}

module.exports = controller;