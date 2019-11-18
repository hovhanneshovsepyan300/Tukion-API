const Category = require('../models/Category');
const errorHandler = require('../utils/errorHandler');

module.exports.getAll = async function (req,res) {
    try {
        const categories = await Category.find({});
            // .toArray();
        console.log('videos', categories)

        res.status(201).json(categories)
    } catch(e) {
        errorHandler(res,e)
    }
};

module.exports.create = async function (req,res) {
    try {
        const category = await new Category({
            title: req.body.title,
        }).save();

        res.status(201).json(category)
    } catch(e) {
        errorHandler(res,e)
    }
};