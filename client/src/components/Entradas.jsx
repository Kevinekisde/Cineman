const Entradas = ({ data }) => {
  let { title, unit_price, quantity } = data;

  return (
    <div style={{ border: "thin solid gray", padding: "1rem" }}>
      <h4> {title}</h4>
      <h5>{`$${unit_price} x ${quantity}u = $${unit_price * quantity}.00`}</h5>
    </div>
  );
};

export default Entradas;
