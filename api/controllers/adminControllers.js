module.exports = {
  addMovie: async function (req, res) {
    let Movie = require("../models/PeliculaModel");

    const { name, sinopsis, image, date, rating, genres, cat, dub } =
      req.body[0];
    //va a tener que acceder al array de objetos del input [{name:nombre},{},{}]
    let movieExists = await Movie.find({ name: req.body[0].name });

    if (movieExists.length) {
      return res.status(400).send({
        message: "The game with the specified name already exists.",
      });
    } else {
      //prettier-ignore
      if (!name || !sinopsis || !image || !date || !rating  ) {   // || !genres  
              return res.status(406).send({ message: "All spaces must be specified.", });
          }
      //if movie does not exists on db:
      //prettier-ignore
      let peli = new Movie({name, sinopsis, image, date, rating, genres, cat, dub});

      try {
        await peli.save();

        res.status(200).send("Game added correctly to the db.");

        //   console.log(peli);
      } catch (err) {
        return res.status(500).send({
          message: `Error: ${err.message}`,
        });
      }
    }
  },

  addGenre: async function (req, res) {
    let Genre = require("../models/GenreModel");

    let genre = new Genre({
      name: req.body.name,
    });
    try {
      await genre.save();
      res.json({ message: "genre added correctly to the db." });
    } catch (error) {
      console.log(error);
      res.json({ message: "genre not added" });
    }
  },

  addFunction: async function (req, res) {
    let Function = require("../models/FuncionModel");
    let Movie = require("../models/PeliculaModel");
    let Sala = require("../models/SALAModel");

    const { movie, sala, time, date } = req.body[1];
    // console.log(req.body[1]);

    const movieOnDB = await Movie.find({ name: movie });
    // console.log(movieOnDB);
    const salaOnDB = await Sala.find({ name: sala });

    let funct = new Function({
      movie: movieOnDB[0],
      sala: salaOnDB[0],
      time,
      date,
    });

    try {
      await funct.save();

      res.status(200).send(console.log(funct));
    } catch (err) {
      return res.status(500).send({
        message: `Error: ${err.message}`,
      });
    }
  },

  createRoom: async function (req, res) {
    let Room = require("../models/SALAModel");
    const { name, seats } = req.body;
    let sala = new Room({
      name,
      seats,
    });
    try {
      await sala.save();

      res.status(200).send("Room added correctly to the db.");
    } catch (err) {
      return res.status(500).send({
        message: `Error: ${err.message}`,
      });
    }
  },

  deleteRoom: async function (req, res) {
    const { id } = req.params;
    let Room = require("../models/SALAModel");

    try {
      await Room.findByIdAndDelete(id);

      res.status(200).send("Room deleted successfully");
    } catch (err) {
      return res.status(500).send({
        message: `Error: ${err.message}`,
      });
    }
  },

  //modifica los asientos disponibles(layout) en una sala
  putRoom: async function (req, res) {
    let Sala = require("../models/SALAModel");
    const { id } = req.params;
    const seats = req.body;

    try {
      console.log("soy put");
      await Sala.updateOne(
        { _id: id },
        {
          seats,
        }
      );
      res.status(200).send("Ok");
    } catch (err) {
      console.error(err);
    }
  },

  getRoom: async function (req, res) {
    let Sala = require("../models/SALAModel");
    const { id } = req.params;

    try {
      let sala = await Sala.findById({ _id: id });
      res.json(sala.seats);
    } catch (err) {
      return res.status(500).send({
        message: `Error: ${err.message}`,
      });
    }
  },

  getRooms: async function (req, res) {
    let Sala = require("../models/SALAModel");

    try {
      let salas = await Sala.find();
      res.json(salas);
    } catch (err) {
      return res.status(500).send({
        message: `Error: ${err.message}`,
      });
    }
  },
};
