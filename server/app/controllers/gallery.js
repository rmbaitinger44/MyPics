'use strict'
var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose'),
    Gallery = mongoose.model('GalleryModel'),
    config = require('../../config/config'),
    multer = require('multer'),
    mkdirp = require('mkdirp'),

    
    passport = require('passport');
    

    var requireAuth = passport.authenticate('jwt', { session: false });

    // var storage = multer.diskStorage({
    //     destination: function (req, file, cb) {      
    //           var path = config.uploads + req.params.userId + "/";
    //         mkdirp(path, function(err) {
    //             if(err){
    //                 res.status(500).json(err);
    //             } else {
    //                 cb(null, path);
    //             }
    //         });
    //     },
    //     filename: function (req, file, cb) {
    //         let fileName = file.originalname.split('.');   
    //         cb(null, fileName[0] + new Date().getTime() + "." + fileName[fileName.length - 1]);
    //     }
    //   });
    //   var upload = multer({ storage: storage });
    //   router.post('/todos/upload/:userId/:todoId', upload.any(), function(req, res, next){
    //       logger.log('Upload file for todo ' + req.params.todoId + ' and ' + req.params.userId, 'verbose');
    //       
    //       Todo.findById(req.params.todoId, function(err, todo){
    //           if(err){ 
    //               return next(err);
    //           } else {     
    //               if(req.files){
    //                   todo.file = {
    //                       filename : req.files[0].filename,
    //                       originalName : req.files[0].originalname,
    //                       dateUploaded : new Date()
    //                   };
    //               }           
    //               todo.save()
    //                   .then(todo => {
    //                       res.status(200).json();
    //                   })
    //                   .catch(error => {
    //                       return next(error);
    //                   });
    //           }
    //       });
    //   });
      

module.exports = function (app, config) {
    app.use('/api', router);
    
    router.get('/gallery', requireAuth, function(req,res,next){
        logger.log('Get all galleries');
        var query = User.find()
            .sort(req.query.order)
            .exec()
            .then(result =>{
                if(result && result.length){
                    res.status(200).json(result);
                }else{
                    res.status(404).json({message: "No users"});
                }
            })
            .catch(err => {
                return next(err);
            })
    });

    router.get('/gallery/:userId', requireAuth, function(req,res,next){
        logger.log('Get gallery' + req.params.userid, 'verbose');

        res.status(200).json({message: 'Get galleries' + req.params.userid})
    });

    router.get('/gallery/user/:userId', function(req,res,next){
        logger.log('Get all galleries for ' + req.params.userId, 'verbose')

        Gallery.find({userId: req.params.userId})
            .then(gallery => {
                if(gallery){
                    res.status(200).json(gallery);
                } else {
                    return next(error)
                }
    
            });
    });

    router.post('/gallery', function(req,res,next){
        logger.log('Create gallery', 'verbose');
        var gallery = new Gallery(req.body);
        console.log(gallery)
        gallery.save()
        .then(result =>{ 
            res.status(201).json(result);
        })
        .catch(err => {
            return next(err);
        })}); 
        
        router.delete('/gallery/:galleryId', function(req, res, next){
             logger.log('Delete gallery ' + req.params.galleryId, 'verbose');

            Gallery.remove({ _id: req.params.galleryId})
            .then(gallery => {
                res.status(200).json({msg: "Gallery Deleted"});

            })
            .catch(error => {
                return next(error);
            })
        });
        
router.put('/gallery/:galleryId', function(req, res, next){
        logger.log('Update gallery ' + req.params.galleryId, 'verbose');
    Gallery.findOneAndUpdate({_id: req.params.galleryId}, req.body, {new:true, multi:false})
            .then(user => {
                res.status(200).json(user);
            })
            .catch(error => {
                return next(error);
            });
    }); 
}