import axios from "axios";
import { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

interface Member {
  username: String;
  email: String;
}

interface Message {
  chatId: number;
  message: string;
  timestamp: string;
  sender: Member;
}

interface getMessageListRes {
  roomId: number;
  messageList: Message[];
  page: number;
  perPage: number; //페이지 당 메시지 수
}

export function Chat({ roomId }: { roomId: number }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [messageList, setMessageList] = useState<Message[]>([]);

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    getChatlist();
  }, [roomId, page]);

  const getChatlist = async () => {
    try {
      const res = await axios.get<getMessageListRes[]>(
        `localhost:8080/team/${roomId}/message?page=${page}`,
        {
          headers: {
            authorization: `Bearer ${(localStorage.getItem("token"), roomId)}`,
          },
        }
      );
      setMessageList(res.data);
    } catch (error) {
      //더미 데이터
      const exam = {
        roomId: 3,
        Message: [
          {
            chatId: 1,
            message: "기획행정부 메세지",
            timestamp: "2023-06-28T15:30:00Z",
            sender: {
              userName: "김유진",
              email: "uj0791@naver.com",
            },
          },
        ],
        page: 1,
        perPage: 1,
      };

      const exam = {
        roomId: 5,
        Message: [
          {
            chatId: 1,
            message: "사무행정부 메세지",
            timestamp: "2023-06-28T15:30:00Z",
            sender: {
              userName: "김유진",
              email: "uj0791@naver.com",
            },
          },
        ],
        page: 1,
        perPage: 1,
      };

      setMessageList([...messageList, exam]);
    }
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#aba2a2",
          height: "45px",
        }}
      >
        <div>
          <input
            style={{
              width: "174px",
              height: "30px",
              border: "none",
              borderRadius: "10px",
              outline: "none",
              margin: "10px",
            }}
            placeholder="검색"
            onChange={onSearch}
            value={search}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "58px",
            backgroundColor: "#F2EAEA",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "10px",
              backgroundColor: "white",
              width: "41px",
              height: "41px",
              marginLeft: "10px",
            }}
          >
            <Avatar size="large" icon={<UserOutlined />} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "10px",
              backgroundColor: "white",
              width: "73px",
              height: "50px",
              marginLeft: "10px",
            }}
          >
            <div>김유진</div>
            <div style={{ fontSize: "3px" }}>오후 11:59</div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "10px",
              backgroundColor: "white",
              width: "100%",
              height: "36px",
              margin: "0 10px",
            }}
          ></div>
        </div>
        <div style={{ margin: "21px", border: "solid 1px #D9D9D9" }}></div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "176px",
              height: "30px",
              borderRadius: "10px",
              backgroundColor: "#F2EAEA",
              marginBottom: "15px",
            }}
          >
            2023-04-19
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            height: "58px",
            backgroundColor: "#F2EAEA",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "10px",
              backgroundColor: "white",
              width: "41px",
              height: "41px",
              marginLeft: "10px",
            }}
          >
            <Avatar size="large" icon={<UserOutlined />} />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "10px",
              backgroundColor: "white",
              width: "73px",
              height: "50px",
              marginLeft: "10px",
            }}
          >
            <div>김유진</div>
            <div style={{ fontSize: "3px" }}>오전 12:00</div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "10px",
              backgroundColor: "white",
              width: "100%",
              height: "36px",
              margin: "0 10px",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
