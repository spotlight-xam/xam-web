import { Button } from "antd";
import axios from "axios";
import { useState } from "react";

interface postCreateRoomReq {
  roomName: string;
}

interface postCreateRoomRes {
  roomId: number;
  roomName: string;
}

export function CreateRoom({
  onCreate,
  teamId,
}: {
  onCreate: (newRoom: postCreateRoomRes) => void;
  teamId: number;
}) {
  const [roomName, setRoomName] = useState("");
  const mainColor = "#F4900C";

  const onRoomName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRoomName(event.target.value);
  };

  const onCreateRoom = async () => {
    try {
      const res = await axios.post<postCreateRoomRes>(
        `localhost:8080/team/${teamId}/createroom`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: {
            roomName,
          },
        }
      );

      const newRoom: postCreateRoomRes = {
        roomId: res.data.roomId,
        roomName: res.data.roomName,
      };

      onCreate(newRoom);
    } catch (error) {}
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginLeft: "180px",
        }}
      >
        <img
          style={{ height: "150px", width: "150px", margin: "20px" }}
          alt="Xam_IMG"
          src="img/xam.PNG"
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontWeight: "bold",
            fontSize: "40px",
          }}
        >
          <div>
            Create your <span style={{ color: mainColor }}>channel</span>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "100px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ fontWeight: "bold", margin: "5px" }}>Channel Name</div>
          <input
            style={{
              backgroundColor: "#FFE8B6",
              borderRadius: "5px",
              border: "none",
              width: "300px",
              height: "30px",
              margin: "20px",
              padding: "5px",
            }}
            placeholder="Channel Name"
            onChange={onRoomName}
            value={roomName}
          />
        </div>
        <Button
          style={{
            display: "flex",
            justifyContent: "center",
            backgroundColor: mainColor,
            width: "400px",
            height: "40px",
            color: "white",
            margin: "50px 0 0 10px",
          }}
          onClick={onCreateRoom}
        >
          Apply
        </Button>
      </div>
    </div>
  );
}
