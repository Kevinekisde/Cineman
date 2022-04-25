import React from "react";

const ProductItem = ({ data, addToCart }) => {
  let { id, title, unit_price } = data; //ACA SE PONE LO QUE RECIBE DESDE EL ESTADO DEL REDUCER.
  return (
    <div style={{ border: "thin solid gray", padding: "1rem" }}>
      <h4>{title}</h4>
      <h5>{unit_price}</h5>
      <button onClick={() => addToCart(id)}>Agregar</button>
    </div>
  );
};

export default ProductItem;
