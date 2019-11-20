const Video = require('../models/Video');
const errorHandler = require('../utils/errorHandler');

module.exports.getAll = async function (req,res) {
    try {
        const { categoryId } = req.query;

        const videos = await Video.find({category: categoryId});
        res.status(200).json(videos)
    } catch(e) {
        errorHandler(res,e)
    }
};

module.exports.create = async function (req,res) {
    try {
        const video = await new Video({
            title: req.body.title,
            url: req.body.url,
            description: req.body.description,
            duration: req.body.duration,
            tumbnail_url: req.body.tumbnail_url,
            tags: req.body.tags,
            channelTitle: req.body.channelTitle,
            category: req.body.categoryId,
        }).save();

        res.status(201).json(video)
    } catch(e) {
        errorHandler(res,e)
    }
};

module.exports.update = async function (req,res) {
    try {
        const video = await Video.findOneAndUpdate({
            _id: req.params.id
        },{
            $set: req.body
        },{
            new: true
        });
        res.status(200).json(video);
    }catch (e){
        errorHandler(res,e);
    }
};

module.exports.download = async function (req, res) {
    try {
        console.log("req.params.id", req.params.id)
        const fs = require('fs');
        const youtubedl = require('youtube-dl');
        const Buffer = require('buffer').Buffer;
        
        const video = youtubedl(`https://www.youtube.com/watch?v=${req.params.id}`,
            // Optional arguments passed to youtube-dl.
            ['--format=18'], // --encoding  'ext=base64
            // Additional options can be given for calling `child_process.execFile()`.
            { cwd: __dirname });
        
        // Will be called when the download starts.
        video.on('info', function(info) {
            console.log('Download started')
            console.log('filename: ' + info._filename)
            console.log('size: ' + info.size)
        })
        
        video.pipe(fs.createWriteStream('assets/myvideo.mp4'));

        video.on('complete', function complete(info) {
            'use strict'
            console.log('filename: ' + info._filename + ' already downloaded.')
        })
           
        video.on('end', function() {
            res.download(__dirname + `assets/myvideo.mp4`, 'myvideo.mp4');
            res.on('end', function end(res){
                console.log("res finisheddddddd", res)
                res.status(200).json(res)
            })
        })
    }catch (e) {
        errorHandler(res,e)
    }
}