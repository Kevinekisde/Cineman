import React from "react";

const CartItem = ({ data, deleteFromCart }) => {
  let { id, title, unit_price, quantity } = data;

  return (
    <div style={{ border: "thin solid gray", padding: "1rem" }}>
      <h4> {title}</h4>
      <h5>
        {title === "TICKETS"
          ? `$${unit_price}, ${quantity} units `
          : quantity === 1
          ? `$${unit_price}.00 `
          : `$${unit_price} x ${quantity}u = $${unit_price * quantity}.00`}
      </h5>
    </div>
  );
};

export default CartItem;
