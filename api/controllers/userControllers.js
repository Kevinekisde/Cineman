const User = require("../models/UserModel");
const Function = require("../models/FuncionModel");
const Ticket = require("../models/TicketModel");
const Pelicula = require("../models/PeliculaModel");
const fetch = require("node-fetch");

module.exports = {
  id: function (req, res) {
    User.find(function (err, user) {
      const { id } = req.params;
      const User = user;
      if (id) {
        let userId = User.filter((el) => el.id === id);
        userId.length
          ? res.status(200).send(userId)
          : res.status(404).send({ error: "User not found" });
      }
    });
  },

  createUser: async function (req, res) {
    let users = await User.find({ id: req.body.id });
    if (users.length > 0) {
      res.status(401).send({ message: "user already exists" });
    } else {
      let user = new User({
        id: req.body.id,
        name: req.body.name,
        image: req.body.image,
        email: req.body.email,
        status: "Normal",
        // history: [funcion._id],
      });
      try {
        await user.save();
        res.json({ message: "user created" });
      } catch (error) {
        res.status(500).send({ message: "error" });
      }
    }
  },

  editUser: async function (req, res) {
    const { id } = req.params;
    const filter = { id: id };

    const update = {
      name: req.body.name,
      birthday: req.body.birthday,
      image: req.body.image,
      subcription: req.body.subcription,
      favoriteGenre: req.body.favoriteGenre,
      phone: req.body.phone,
    };

    const result = await User.updateOne(filter, update);
    res.status(200).send(result);
  },

  newticket: async function (req, res) {
    let finduser = await User.findById({ _id: req.body.user });
    let findfunction = await Function.findById({ _id: req.body.function });

    let ticket = new Ticket({
      user: finduser,
      function: findfunction,
      seats: req.body.seats,
    });
    try {
      await ticket.save();

      res.json({ message: "checkout complete" });
    } catch (error) {
      console.log(error);
      res.json({ message: error });
    }
  },

  getTicket: async function (req, res) {
    try {
      let ticket = await Ticket.find({
        id_pago: req.params.id_pago,
      });
      console.log(ticket);
      res.json(ticket[0]);
    } catch (error) {
      console.log(error);
      res.json({ message: error });
    }

    // .populate({
    //   path: "user",
    //   model: User,
    //   select: "name",
    // })
    // .populate({
    //   path: "function",
    //   model: Function,
    // });
  },

  postComments: async function (req, res) {
    const { user, comment, movie, date } = req.body;

    try {
      let pelicula = await Pelicula.findById({ _id: movie });
      let userComment = pelicula.comments.find((el) => el.user === user);

      if (userComment) {
        return res.json({ message: "user already commented" });
      } else {
        pelicula.comments.push({ user, comment, date });
        pelicula.save();
        res.json({ message: "comment added" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error });
    }
  },
  // getOrder: async function (req, res) {
  //   try {

  //     let order = await Order.findById({ _id: req.body.order });

  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).json({ message: error });
  //   }

  //   },

  postPrueba: async function (req, res) {
    console.log("anduvo");
    res.json({ msg: "anduvo" });
  },

  postOrder: async function (req, res) {
    console.log(req.body);

    if (req.query.status == "approved") {
      QRCode.toDataURL(
        `Nombre: ${info[1]}, E-Mail: ${info[0]},Orden de compra: ${req.query.merchant_order_id}`,
        async function (err, url) {
          console.log(url);
          let ticket = new Ticket({
            merchant_order: req.query.merchant_order_id,
            qr: url,
            // user: data,
          });

          await ticket.save();

          const msg = {
            to: `${info[0]}`,
            from: "cinemanpajarito@gmail.com",
            subject: `Tu compra fue aprobada`,
            html: `<div class="mail" style="align-items:center;background-image:url(https://cdn.wallpapersafari.com/59/5/Jun6CX.jpg);background-repeat:no-repeat;background-size:cover;color:#fff;display:flex;flex-direction:column;font-family:Arial,Helvetica,sans-serif;height:100vh;justify-content:center;margin:0;padding:0;position:fixed;text-align:center;width:100vw"><div><h1>¡Muchas gracias por tu compra!</h1><h2>Tu orden de compra es:</h2><h2>${req.query.merchant_order_id}</h2><h3>Encontrá tu ticket en el siguiente vínculo:</h3><a class="tuticket" href="http://localhost:3000/tickets/${req.query.merchant_order_id}" style="color:#fff;font-size:40px">TU TICKET</a></div><div class="img" style="align-items:center;align-self:end;display:flex;flex-direction:row;margin-right:90px;margin-top:30px;height=50px;"><h2>Cineman</h2><img width="50px" src="https://i.pinimg.com/originals/a0/26/1b/a0261b885cfba5a65c675c33327acf5a.png" alt="logo.png"></div></div></body>`,
          };

          sgMail
            .send(msg)
            .then((r) => {
              return res.redirect(
                `http://localhost:3000/tickets/${req.query.merchant_order_id}`
              );
            })
            .catch((error) => {
              console.error(error);
            });
        }
      );
    }

    // try {
    //   let newOrder = new Order({
    //     id,
    //   });

    //   newOrder.save();

    // let status = "pending";

    // setInterval(() => {}, 60000);

    // setTimeout(() => {
    //   fetch(`https://api.mercadopago.com/checkout/preferences/${id}`, {
    //     headers: {
    //       Authorization:
    //         "Bearer TEST-3461513833747080-041422-f9bc3854c92968fd781d61911aac8912-396641539",
    //     },
    //   })
    //     .then((r) => r.json())
    //     .then((r) => console.log(r));
    // }, 5000);

    // setTimeout(() => {
    //   clearInterval();
    // }, 10000);
    //   res.json({ msg: "andamos bien la puta que te pario" });
    // } catch (error) {
    //   console.log(error);
    //   res.status(500).json({ message: error });
    // }
  },
};
