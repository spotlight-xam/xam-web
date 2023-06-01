import { useState } from "react";
import { Dialog } from "../Chat/Dialog";
import { Room } from "../Rooms/Room";
import { Team } from "../Team/Team";

export function Home() {
  const [teamId, setTeamId] = useState(0);
  const [roomId, setRoomId] = useState(0);
  const onChangeTeam = (teamId: number) => {
    setTeamId(teamId);
  };
  const onRoomChange = (roomId: number) => {
    setRoomId(roomId);
  };
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
          width: "250px",
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
            height: "50px",
            width: "100%",
          }}
        >
          멋쟁이 사자처럼
        </div>

        <Room
          onRoomEvent={(teamData: number) => onRoomChange(teamData)}
          teamData={teamId}
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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            height: "100%",
            width: "100%",
          }}
        >
          <Dialog roomData={roomId}></Dialog>
        </div>
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
