import { PlusOutlined, SendOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Chat } from "./Chat";
import { useState } from "react";

export interface Data {
  id: String;
  date: String;
  name: String;
  content: String;
}

export function Dialog() {
  //입력
  const [chat, setChat] = useState("");

  const onChat = (event: React.ChangeEvent<HTMLInputElement>) =>
    setChat(event.target.value);

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
            value={chat}
            onChange={onChat}
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
