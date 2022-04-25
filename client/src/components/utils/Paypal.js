import React from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const Paypal = ({ orderData }) => {
  console.log(orderData);

  const elverdaderoOrderData = orderData.map((el) => ({
    amount: {
      value: el.unit_price * el.quantity,
    },
    description: el.title,
    reference_id: el.id,
  }));

  console.log(elverdaderoOrderData);

  return (
    <div>
      <PayPalScriptProvider
        options={{
          "client-id": "sb",
          currency: "USD",
          intent: "capture",
        }}
      >
        <PayPalButtons
          createOrder={(as, actions) => {
            return actions.order.create({
              purchase_units: elverdaderoOrderData,
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
              const name = details.payer.name.given_name;
              alert(`Transaction completed by ${name}`); //LLEVAR A SUMARIO DE COMPRA.
            });
          }}
          style={{ layout: "horizontal" }}
        />
      </PayPalScriptProvider>
    </div>
  );
};

export default Paypal;
