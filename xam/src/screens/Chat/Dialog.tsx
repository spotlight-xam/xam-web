import { PlusOutlined, SendOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Chat } from "./Chat";

export function Dialog() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "91.7%",
      }}
    >
      <Chat></Chat>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          height: "30px",
          backgroundColor: "#D9D9D9",
        }}
      ></div>
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
