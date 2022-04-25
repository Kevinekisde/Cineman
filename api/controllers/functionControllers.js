let Function = require("../models/FuncionModel");

module.exports = {
  getFunctions: async function (req, res) {
    try {
      let allFunctions = await Function.find();
      res.json(allFunctions);
    } catch (err) {
      return res.status(500).send({
        message: `Error: ${err.message}`,
      });
    }
  },

  getFunction: async function (req, res) {
    const { id } = req.params;
    try {
      let funcion = await Function.find({ _id: id });
      res.send(funcion[0]);
    } catch (err) {
      return res.status(500).send({
        message: `Error: ${err.message}`,
      });
    }
  },

  setSeats: async function (req, res) {
    const data = req.body; //seats array
    const { id } = req.query;
    try {
      await Function.updateOne(
        { _id: id },
        { $push: { occupied_seats: { $each: data } } } //la wea weon
      );
      res.status(200).send("algo");
    } catch (err) {
      return res.status(500).send({
        message: `Error: ${err.message}`,
      });
    }
  },
};
