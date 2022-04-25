import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Ticketing() {
  const { order } = useParams();

  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    axios(`http://localhost:3001/user/ticket/${order}`).then((r) =>
      setTicket(r.data)
    );
  }, []);

  return (
    <div>
      {ticket == null ? (
        <h1>Loading</h1>
      ) : (
        <div>
          <img src={ticket?.qr} alt="" />
        </div>
      )}
    </div>
  );
}
