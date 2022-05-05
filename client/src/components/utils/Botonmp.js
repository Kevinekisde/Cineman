import React from "react";
import { useMercadopago } from "react-sdk-mercadopago";
import axios from "axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function Botonmp({ orderData, funcion }) {
  const user = useSelector((state) => state.userInfo);

  const mercadopago = useMercadopago.v2(
    "TEST-9e684dc9-0b69-4450-98ef-a299b0853ec6",
    {
      locale: "es-AR",
    }
  );

  useEffect(() => {
    function createCheckoutButton(preferenceId) {
      if (mercadopago) {
        mercadopago.checkout({
          preference: {
            id: preferenceId,
          },
          render: {
            container:
              document.getElementById("button").innerHTML.length > 1
                ? "#e"
                : "#button",
            label: "Pagar",
          },
        });
      }
    }

    axios
      .post(`https://cinemanback.herokuapp.com/mercadopago/create_preference`, [
        orderData,
        user,
        funcion,
      ])
      .then((r) => r.data)
      .then((preference) => createCheckoutButton(preference.id));
  }, [mercadopago, orderData, user, funcion]);

  return (
    <>
      <div>
        <div id="button" data-elements-color="#8e44ad"></div>
      </div>
    </>
  );
}
