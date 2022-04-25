var GenreModel = require('../models/GenreModel.js');


module.exports = {
    list: function (req, res) {
        GenreModel.find(function (err, Category) {
            res.status(200).send(Category)
           
        });
}
}