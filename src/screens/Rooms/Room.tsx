import axios from "axios";
import { useEffect, useState } from "react";

interface MyRoom {
  roomId: number;
  roomName: string;
}

interface getMyRoomRes {
  roomList: MyRoom[];
}

interface postCreateRoomReq {
  roomName: string;
  userNames: string[];
}

interface postCreateRoomRes {
  roomId: number;
  roomName: string;
}

export function Room({
  createRoom,
  onRoomEvent,
  teamId,
}: {
  createRoom: () => void;
  onRoomEvent: (teamId: number) => void;
  teamId: number;
}) {
  const [roomlist, setRoomlist] = useState<getMyRoomRes>({
    roomList: [],
  });

  const getRoomlist = async () => {
    try {
      const res = await axios.get<getMyRoomRes>(
        `localhost:8080/team/${teamId}/room`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setRoomlist(res.data);
    } catch (error) {
      //더미 데이터
      const exam: getMyRoomRes = {
        roomList: [
          {
            roomId: 3,
            roomName: "기획행정부",
          },
          {
            roomId: 5,
            roomName: "사무행정부",
          },
        ],
      };
      setRoomlist(exam);
    }
  };

  const chooseRoom = (room: MyRoom) => {
    //채널이 선택되었을 때
    const roomData = room.roomId;
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
          borderBottom: "solid 1px gray",
        }}
      >
        <div style={{ color: "white", margin: "10px" }}>채널</div>
        <button
          style={{
            cursor: "pointer",
            width: "20px",
            height: "20px",
            padding: "0px",
            margin: "0 10px",
            borderRadius: "5px",
            border: "solid 1px gray",
          }}
          onClick={createRoom}
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
