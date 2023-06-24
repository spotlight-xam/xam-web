import axios from "axios";
import { useEffect, useState } from "react";

interface MyRoom {
  id: number;
  roomName: string;
}

interface getRoomlistRes {
  roomList: MyRoom[];
}

interface postCreateRoomReq {
  roomName: string;
  userNames: string[];
}

interface postCreateRoomRes {
  roomId: number;
}

export function Room({
  onRoomEvent,
  teamData,
}: {
  onRoomEvent: (teamData: number) => void;
  teamData: number;
}) {
  const [roomlist, setRoomlist] = useState<getRoomlistRes>({
    roomList: [],
  });
  const getRoomlist = async () => {
    try {
      const res = await axios.get<getRoomlistRes>(
        "localhost:8080/team/{teamId}/room",
        {
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setRoomlist(res.data);
    } catch (error) {
      //더미 데이터
      const exam: getRoomlistRes = {
        roomList: [
          {
            id: 3,
            roomName: "기획행정부",
          },
          {
            id: 5,
            roomName: "사무행정부",
          },
        ],
      };
      setRoomlist(exam);
    }
  };

  const chooseRoom = (room: MyRoom) => {
    //채널이 선택되었을 때
    const roomData = room.id;
    const roomName = room.roomName;
    alert(`${roomName}` + " 채널로 변경되었습니다.");
    onRoomEvent(roomData);
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
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          height: "30px",
          border: "solid 1px gray",
        }}
      >
        <div style={{ color: "white", margin: "10px" }}>채널</div>
        <button
          style={{
            width: "20px",
            height: "20px",
            padding: "0px",
            margin: "0 10px",
            backgroundColor: "none",
          }}
        >
          +
        </button>
      </div>
      <div>
        {roomlist.roomList.map((room) => {
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
                cursor: "pointer",
              }}
              onClick={() => {
                chooseRoom(room);
              }}
            >
              {room.roomName}
            </div>
          );
        })}
      </div>
    </div>
  );
}
