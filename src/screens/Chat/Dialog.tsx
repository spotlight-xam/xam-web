import { PlusOutlined, SendOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Chat } from "./Chat";
import { useEffect, useState } from "react";
import axios from "axios";

interface getMessageReq {
  teamId: number; // 팀 아이디
  roomId: number; //채널 아이디
}

interface getMessageRes {
  id: number; // 방 번호
  senderId: number; // 채팅을 보낸 사람
  message: string; //메세지
  time: string; // 채팅 발송 시간
}

export function Dialog({ roomData }: { roomData: number }) {
  //입력
  const [message, setMessage] = useState("");
  const [chatlist, setChatlist] = useState<getMessageRes>();

  const onMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const getChatlist = async () => {
    try {
      const res = await axios.get<getMessageRes>(
        `localhost:8080/team/${roomData}/room`,
        {
          headers: {
            authorization: `Bearer ${
              (localStorage.getItem("token"), roomData)
            }`,
          },
        }
      );
      setChatlist(res.data);
    } catch (error) {
      alert("데이터를 불러오는데 실패하였습니다. 더미 데이터로 진행합니다.");
      //더미 데이터 설정 필요
    }
  };

  const postChat = () => {
    try {
    } catch (error) {
      alert("전송에 실패하였습니다.");
    }
  };
  useEffect(() => {
    getChatlist();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
      }}
    >
      <Chat></Chat>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          padding: "5px",
          height: "58px",
          backgroundColor: "#938181",
        }}
      >
        <Button
          style={{
            backgroundColor: "white",
            margin: "0 5px",
            height: "45px",
            width: "45px",
            borderColor: "white",
            borderRadius: "10px",
          }}
          icon={<PlusOutlined />}
          size={"large"}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignContent: "center",
            backgroundColor: "white",
            borderColor: "white",
            borderRadius: "10px",
            alignItems: "center",
            height: "45px",
            width: "100%",
            margin: "10px 5px",
          }}
        >
          <input
            style={{
              display: "flex",
              height: "36px",
              width: "95%",
              margin: "10px",
              border: "none",
              outline: "none",
              fontSize: "large",
            }}
            value={message}
            onChange={onMessage}
            placeholder="메시지를 입력하세요"
            type="text"
          />
          <Button
            style={{
              margin: "10px",
              cursor: "pointer",
              backgroundColor: "white",
              border: "none",
            }}
            icon={<SendOutlined />}
          ></Button>
        </div>
      </div>
    </div>
  );
}
