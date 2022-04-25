var PeliculaModel = require('../models/PeliculaModel.js');


module.exports = {
    all: function (req, res) {
        PeliculaModel.find(function (err, Pelis) {
            const name = req.query.name;
            let TotalPeli = Pelis;
            if (name) {
                let PeliName = TotalPeli.filter((el) =>
                    el.name.toLowerCase().includes(name.toLowerCase())
                );
                PeliName.length
                    ? res.status(200).send(PeliName)
                    : res.status(404).send("No existe la pelicula con ese nombre");
            } else {
                res.status(200).send(TotalPeli);
            }

        });
    },
    id: function (req, res) {
        PeliculaModel.find(function (err, Pelis) {
            const { id } = req.params;
            const apiInfo =  Pelis;
            if (id) {
                let peliId =  apiInfo.filter((el) => el.id == id);
                peliId.length ? res.status(200).send(peliId) : res.redirect(404, "/error");
            } else {
                res.status(200).send(apiInfo);
            }
        });
    }
}