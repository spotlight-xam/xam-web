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

interface RoomProps {
  teamData: number;
}
export function Room({ teamData }: RoomProps) {
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
      alert("데이터를 불러오는데 실패하였습니다. 더미 데이터로 진행합니다.");
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

  const chooseRoom = (room: number) => {};
  useEffect(() => {
    getRoomlist();
  }, []);
  return (
    <div style={{ width: "100%" }}>
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
              }}
              onClick={() => {
                chooseRoom(room.id);
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
