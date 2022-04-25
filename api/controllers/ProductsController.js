var productModel = require('../models/ProductsModel')


module.exports ={
    
    all: function(req, res){
        productModel.find(function (err,product) {
            res.status(200).send(product)

        })
    }
}