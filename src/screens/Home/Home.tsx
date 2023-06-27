import { useEffect, useState } from "react";
import { Dialog } from "../Chat/Dialog";
import { Room } from "../Rooms/Room";
import { Team } from "../Team/Team";
import Modal from "react-modal";

export function Home() {
  const [authToken, setAuthToken] = useState("");
  const [teamId, setTeamId] = useState(0);
  const [roomId, setRoomId] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const getToken = () => {
    const token = localStorage.getItem("accessToken");
    if (token !== null) {
      setAuthToken(token);
    }
  };
  const onChangeTeam = (teamId: number) => {
    setTeamId(teamId);
  };
  const onRoomChange = (roomId: number) => {
    setRoomId(roomId);
  };

  useEffect(() => {
    getToken();
  }, []);

  return (
    <body
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "100vh",
      }}
    >
      <Team onTeamEvent={onChangeTeam}></Team>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "300px",
          height: "100%",
          backgroundColor: "#aba2a2",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            height: "60px",
            width: "100%",
            borderBottom: "solid 1px gray",
          }}
        >
          멋쟁이 사자처럼
        </div>

        <Room
          onRoomEvent={(teamId: number) => onRoomChange(teamId)}
          teamId={teamId}
        ></Room>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
        }}
      >
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          style={{}}
        >
          This is Modal content
        </Modal>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            height: "100%",
            width: "100%",
          }}
        ></div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            width: "100%",
            height: "10px",
            backgroundColor: "#D9D9D9",
          }}
        ></div>
      </div>
    </body>
  );
}
