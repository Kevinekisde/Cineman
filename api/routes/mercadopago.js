var express = require("express");
var router = express.Router();
const Ticket = require("../models/TicketModel");
const mercadopago = require("mercadopago");
const sgMail = require("@sendgrid/mail");
const fetch = require("node-fetch");

sgMail.setApiKey(
  "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"
);
var QRCode = require("qrcode");
const qr = require("qr-image");

mercadopago.configure({
  access_token:
    "TEST-3461513833747080-041422-f9bc3854c92968fd781d61911aac8912-396641539",
});

router.post("/create_preference/", (req, res) => {
  try {
    let preference = {
      items: req.body[0],
      payer: req.body[1],
      // notification_url: `https://pruebacineman.herokuapp.com/mercadopago/webhook/${req.body[1].email}`,
      back_urls: {
        success: `http://localhost:3000/successfulpurchase`,
        failure: "http://localhost:3000/successfulpurchase",
        pending: "http://localhost:3000/successfulpurchase",
      },
      auto_return: "approved",
    };

    mercadopago.preferences.create(preference).then((response) => {
      return res.json({
        id: response.body.id,
      });
    });
  } catch (error) {
    return res.json({ error: error });
  }

  router.post("/webhook/:email", async (req, res) => {
    if (req.body.type && req.body.type == "payment") {
      try {
        fetch(`https://api.mercadopago.com/v1/payments/${req.body.data.id}`, {
          headers: {
            Authorization:
              "Bearer TEST-3461513833747080-041422-f9bc3854c92968fd781d61911aac8912-396641539",
          },
        })
          .then((r) => r.json())
          .then(async (r) => {
            let existingTicket = await Ticket.findOne({ id_pago: r.id });

            let url = await QRCode.toDataURL(
              `ID de compra: ${r.id}, Productos: ${r.additional_info.items.map(
                (el) => el.title + " " + el.quantity + "u" + " " + el.unit_price
              )}, Monto total: ${r.transaction_amount}, Estado: ${r.status}`
            );

            let newTicket = {
              id_pago: r.id,
              status: r.status,
              info_pago: {
                payment_method_id: r.payment_method_id,
                transaction_amount: r.transaction_amount,
              },
              items: r.additional_info.items,
              qr: url,
            };

            if (existingTicket) {
              existingTicket.updateOne(newTicket);
              const msg = {
                to: `${req.params.email}`,
                from: "cinemanpajarito@gmail.com",
                subject: `El estado de tu compra es ${r.status}`,
                html: `<h1>Tu compra fue actualizada</h1><h2>ID de pago: </h2><h2>${r.id}</h2><h2>Hace click en el siguiente link para ver tu compra:</h2><a href="http://localhost:3000/order/${r.id}">Ver compra</a>`,
              };
              sgMail
                .send(msg)
                .then((r) => {
                  return res.redirect(`http://localhost:3000/order/${r.id}`);
                })
                .catch((error) => {
                  return res.json({ error: "error al crear el ticket" });
                });
            } else {
              if (r.status == "approved") {
                try {
                  let createTicket = new Ticket(newTicket);
                  await createTicket.save();

                  const msg = {
                    to: `${req.params.email}`,
                    from: "cinemanpajarito@gmail.com",
                    subject: `Tu compra fue aprobada`,
                    html: `<h1>Gracias por tu compra!</h1><h2>ID de pago: </h2><h2>${r.id}</h2><h2>Hace click en el siguiente link para ver tu compra:</h2><a href="https://localhost:3000/order/${r.id}">Ver compra</a>`,
                  };
                  sgMail
                    .send(msg)
                    .then((r) => {
                      return res.redirect(
                        `http://localhost:3000/order/${r.id}`
                      );
                    })
                    .catch((error) => {
                      console.error(error);
                    });
                  return res.json({ msg: "salio bien" });
                } catch (err) {
                  return res.json({ error: "Error al crear ticket" });
                }
              } else if (r.status == "pending") {
                try {
                  let createTicket = new Ticket(newTicket);
                  await createTicket.save();

                  const msg = {
                    to: `${req.params.email}`,
                    from: "cinemanpajarito@gmail.com",
                    subject: `Tu compra esta pendiente`,
                    html: `<h1>Tu compra esta pendiente de pago.</h1><h2>ID de pago: </h2><h2>${r.id}</h2><h2>Hace click en el siguiente link para ver tu compra:</h2><a href="http://localhost:3000/order/${r.id}">Ver compra</a>`,
                  };
                  sgMail
                    .send(msg)
                    .then((r) => {
                      return res.redirect(
                        `http://localhost:3000/order/${r.id}`
                      );
                    })
                    .catch((error) => {
                      return res.json({ error: "Error al crear ticket" });
                    });
                  console.log("salio nazi");
                  return res.json({ msg: "salio bien" });
                } catch (err) {
                  return res.json({ error: "Error al crear ticket" });
                }
              }
            }
          });
      } catch (err) {
        console.log(err);
        return res.json({ error: "Error al crear ticket" });
      }
    } else {
      return res.json({ a: "a" });
    }
  });
});
module.exports = router;
