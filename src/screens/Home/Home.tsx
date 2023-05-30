import { Button } from "antd";
import { Dialog } from "../Chat/Dialog";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";
import axios from "axios";

interface useChannelReq {
  //임시 채널 Request
  channelType: String;
  channelName: String;
  allowPrivacy: boolean;
}

interface useChannelRes {
  //임시 채널 Response
  Chat: String[];
  Post: String[];
  Voice: String[];
}
export function Home() {
  const [channel, setChannel] = useState([]);

  const channelPopup = (e) => {
    addChannel();
  };

  const addChannel = () => {
    const channel = axios.get<useChannelRes>("URL");
  };
  return (
    <body
      style={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "80px",
          height: "100%",
          backgroundColor: "#827979",
        }}
      >
        <div
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "10px",
            backgroundColor: "white",
            margin: "5px 0",
          }}
        ></div>
        <br></br>
        <div
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "10px",
            backgroundColor: "white",
            margin: "5px 0",
          }}
        ></div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "250px",
          height: "100%",
          backgroundColor: "#aba2a2",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            height: "50px",
            width: "100%",
            border: "solid 1px gray",
          }}
        >
          멋쟁이 사자처럼
        </div>
        <Button
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "10px",
            backgroundColor: "white",
            margin: "5px 0",
          }}
          icon={<PlusOutlined />}
          onClick={channelPopup}
        ></Button>
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
            width: "100%",
            height: "50px",
            backgroundColor: "#D9D9D9",
          }}
        >
          채널 이름
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "row",
            height: "100%",
            width: "100%",
          }}
        >
          <Dialog></Dialog>
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
