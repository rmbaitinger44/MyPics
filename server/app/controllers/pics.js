'use strict'
var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    mongoose = require('mongoose'),
    Pics = mongoose.model('PicsModel'),
    config = require('../../config/config'),
    multer = require('multer'),
    mkdirp = require('mkdirp'),

    
    passport = require('passport');
    

    var requireAuth = passport.authenticate('jwt', { session: false });

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {      
              var path = config.uploads + req.params.galleryId + "/";
            mkdirp(path, function(err) {
                if(err){
                    res.status(500).json(err);
                } else {
                    cb(null, path);
                }
            });
        },
        filename: function (req, file, cb) {
            let fileName = file.originalname.split('.');   
            cb(null, fileName[0] + new Date().getTime() + "." + fileName[fileName.length - 1]);
        }
      });
      var upload = multer({ storage: storage });
      
      

module.exports = function (app, config) {
    app.use('/api', router);

    router.post('/pics/upload/:userId/:galleryId', upload.any(), function(req, res, next){
            logger.log('Upload file for pic ' + req.params.galleryId + ' and ' + req.params.userId, 'verbose');
            
          Pics.findById(req.params.galleryId, function(err, pic){
                if(err){ 
                    return next(err);
                } else {     
                    if(req.files){
                      pic.file = {
                            filename : req.files[0].filename,
                            originalName : req.files[0].originalname,
                            dateUploaded : new Date()
                        };
                    }           
                      pic.save()
                        .then(pic => {
                            res.status(200).json(pic);
                        })
                        .catch(error => {
                            return next(error);
                        });
                }
            });
        })
    
    router.get('/pics', requireAuth, function(req,res,next){
        logger.log('Get all pics');
        var query = User.find()
            .sort(req.query.order)
            .exec()
            .then(result =>{
                if(result && result.length){
                    res.status(200).json(result);
                }else{
                    res.status(404).json({message: "No pics"});
                }
            })
            .catch(err => {
                return next(err);
            })
    });

    router.get('/pics/:picId', requireAuth, function(req,res,next){
        logger.log('Get pic' + req.params.userid, 'verbose');

        res.status(200).json({message: 'Get Users' + req.params.userid})
    });

    router.get('/pics/user/:userId', function(req,res,next){
        logger.log('Get all pics for ' + req.params.userId, 'verbose')

        pics.find({userId: req.params.userId})
            .then(pics => {
                if(pics){
                    res.status(200).json(pics);
                } else {
                    return next(error)
                }
    
            });
    });

    router.post('/pics', function(req,res,next){
        logger.log('Create pic', 'verbose');
        var pic = new Pics(req.body);
        pic.save()
        .then(result =>{ 
            res.status(201).json(result);
        })
        .catch(err => {
            return next(err);
        })}); 
        
        router.delete('/pics/:picId', function(req, res, next){
             logger.log('Delete pic ' + req.params.picId, 'verbose');

            Pic.remove({ _id: req.params.picId})
            .then(pic => {
                res.status(200).json({msg: "Pic Deleted"});

            })
            .catch(error => {
                return next(error);
            })
        });
        
router.put('/pics/:picId', function(req, res, next){
        logger.log('Update pic ' + req.params.picId, 'verbose');
    Pics.findOneAndUpdate({_id: req.params.picId}, req.body, {new:true, multi:false})
            .then(user => {
                res.status(200).json(user);
            })
            .catch(error => {
                return next(error);
            });
    }); 
}