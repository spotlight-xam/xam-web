import { useEffect, useState } from "react";
import { Room } from "../Rooms/Room";
import { Team } from "../Team/Team";
import { TeamInfo } from "../Team/TeamInfo";
import { Chat } from "../Chat/Chat";

export function Home() {
  const [authToken, setAuthToken] = useState("");
  const [teamId, setTeamId] = useState(0);
  const [roomId, setRoomId] = useState(0);

  const getToken = () => {
    const token = localStorage.getItem("accessToken");
    if (token !== null) {
      setAuthToken(token);
    }
  };
  const onChangeTeam = (teamId: number) => {
    setTeamId(teamId);
    localStorage.setItem("teamId", JSON.stringify(teamId));
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
        <TeamInfo teamId={teamId} />
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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            height: "100%",
            width: "100%",
          }}
        >
          <Chat teamId={teamId} roomId={roomId}></Chat>
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
