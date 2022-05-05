import { useState } from "react";
import DeleteButacas from "../DeleteRoom";
import { Container, Delete, DeleteRoomDrop } from "./DeleteRoomStyles";

const DeleteRoom = () => {
  const [show, setShow] = useState(true);

  const drawerFunction = () => {
    setShow(show !== true);
  };

  return (
    <Container>
      <DeleteRoomDrop>
        <h2>Delete Room</h2>
        <div></div>
        <button onClick={drawerFunction}>
          <img src="/images/DownArrow.png" alt="" />
        </button>
      </DeleteRoomDrop>
      {show ? (
        <div></div>
      ) : (
        <Delete>
          <DeleteButacas />
        </Delete>
      )}
    </Container>
  );
};

export default DeleteRoom;
