import { PlusOutlined, SendOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Chat } from "./Chat";
import { useEffect, useState } from "react";
import axios from "axios";

interface postMessageReq {
  teamId: number; // 팀 아이디
  roomId: number; //채널 아이디
  message: string; //메세지
}

export function Dialog({ teamId, roomId }: { teamId: number; roomId: number }) {
  //입력
  const [message, setMessage] = useState("");

  const onMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const postChat = () => {
    const newMessage: postMessageReq = {
      teamId: teamId,
      roomId: roomId,
      message: message,
    };
    try {
      axios.post(`localhost:8080/team/${roomId}/message`, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: {
          newMessage,
        },
      });
    } catch (error) {
      //임시 POST
    }
  };

  return (
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
  );
}
