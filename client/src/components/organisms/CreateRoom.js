import { useState } from "react";
import Butacas from "../ButacasAdmin";
import { Container, Create, CreateRoomDrop } from "./CreateRoomStyles";

const CreateRoom = () => {
  const [show, setShow] = useState(true);

  const drawerFunction = () => {
    setShow(show !== true);
  };

  return (
    <Container>
      <CreateRoomDrop>
        <h2>Create Room</h2>
        <div></div>
        <button onClick={drawerFunction}>
          <img src="/images/DownArrow.png" alt="" />
        </button>
      </CreateRoomDrop>
      {show ? (
        <div></div>
      ) : (
        <Create>
          <Butacas />
        </Create>
      )}
    </Container>
  );
};

export default CreateRoom;
