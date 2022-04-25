import React from "react";
import { useNavigate } from "react-router-dom";

export default function SuccessPay() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Tu pago fue aprobado</h1>
      <button onClick={() => navigate("/home")}>Volver al home.</button>
    </div>
  );
}
