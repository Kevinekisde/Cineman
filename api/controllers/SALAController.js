var SalaModel = require('../models/SALAModel.js');

/**
 * SALAController.js
 *
 * @description :: Server-side logic for managing SALAs.
 */
module.exports = {

    /**
     * SALAController.list()
     */
    list: function (req, res) {
        SalaModel.find(function (err, SALAs) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting SALA.',
                    error: err
                });
            }

            return res.json(SALAs);
        });
    },

    /**
     * SALAController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        SalaModel.findOne({_id: id}, function (err, SALA) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting SALA.',
                    error: err
                });
            }

            if (!SALA) {
                return res.status(404).json({
                    message: 'No such SALA'
                });
            }

            return res.json(SALA);
        });
    },

    /**
     * SALAController.create()
     */
    create: function (req, res) {
        var SALA = new SalaModel({
			Pelicula : req.body.Pelicula,
			functions : req.body.functions
        });

        SALA.save(function (err, SALA) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating SALA',
                    error: err
                });
            }

            return res.status(201).json(SALA);
        });
    },

    /**
     * SALAController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        SalaModel.findOne({_id: id}, function (err, SALA) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting SALA',
                    error: err
                });
            }

            if (!SALA) {
                return res.status(404).json({
                    message: 'No such SALA'
                });
            }

            SALA.Pelicula = req.body.Pelicula ? req.body.Pelicula : SALA.Pelicula;
			SALA.functions = req.body.functions ? req.body.functions : SALA.functions;
			
            SALA.save(function (err, SALA) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating SALA.',
                        error: err
                    });
                }

                return res.json(SALA);
            });
        });
    },

    /**
     * SALAController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        SalaModel.findByIdAndRemove(id, function (err, SALA) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the SALA.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    }
};
