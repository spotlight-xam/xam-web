import axios from "axios";
import { useEffect, useState } from "react";

interface getRoomlistReq {
  username: string;
}

interface getRoomlistReq {
  roomList: string[];
}

interface postCreateRoomReq {
  roomName: string;
  userNames: string[];
}

interface postCreateRoomRes {
  roomId: number;
}

export function Room() {
  const [roomlist, setRoomlist] = useState<string[]>([]);
  const getRoomlist = async () => {
    try {
      const res = await axios.get<getRoomlistReq>(
        "localhost:8080/team/{teamId}/room"
      );
      setRoomlist(res.data.roomList);
    } catch (error) {
      alert("데이터를 불러오는데 실패하였습니다.");
    }
  };
  useEffect(() => {
    getRoomlist();
  }, []);
  return (
    <div style={{ width: "100%" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          width: "100%",
          height: "50px",
          borderBottom: "solid 1px gray",
        }}
      >
        기획행정부
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          width: "100%",
          height: "50px",
          borderBottom: "solid 1px gray",
        }}
      >
        사무행정부
      </div>
      <div>
        {roomlist.map((room) => {
          return (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                width: "100%",
                height: "50px",
                borderBottom: "solid 1px gray",
              }}
            >
              {room}
            </div>
          );
        })}
      </div>
    </div>
  );
}
