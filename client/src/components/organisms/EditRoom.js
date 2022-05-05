import { useState } from "react";
import { Container, Edit, EditRoomDrop } from "./EditRoomStyles";
import EditButacas from "../EditButacas";

const EditRoom = () => {
  const [show, setShow] = useState(true);

  const drawerFunction = () => {
    setShow(show !== true);
  };

  return (
    <Container>
      <EditRoomDrop>
        <h2>Edit Room</h2>
        <div></div>
        <button onClick={drawerFunction}>
          <img src="/images/DownArrow.png" alt="" />
        </button>
      </EditRoomDrop>
      {show ? (
        <div></div>
      ) : (
        <Edit>
          <EditButacas />
        </Edit>
      )}
    </Container>
  );
};

export default EditRoom;
