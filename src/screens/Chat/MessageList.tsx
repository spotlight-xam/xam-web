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

export function MessageList({ roomId }: { roomId: number }) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [messageList, setMessageList] = useState<Message[]>([]);

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    getChatlist();
  }, [roomId, page]);

  const getChatlist = async () => {
    try {
      const res = await axios.get<getMessageListRes>(
        `localhost:8080/team/${roomId}/message?page=${page}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setPage(res.data.page);
      setMessageList(res.data.messageList);
    } catch (error) {
      //더미 데이터
      const exam: getMessageListRes = {
        roomId: 5,
        messageList: [
          {
            chatId: 1,
            message: "사무행정부 - 로컬스토리지 연동 메세지",
            timestamp: "2023-06-28T15:30:00Z",
            sender: {
              username: "김유진",
              email: "uj0791@naver.com",
            },
          },
        ],
        page: 1,
        perPage: 1,
      };
      setMessageList(exam.messageList);
    }
  };

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: "#aba2a2",
          borderBottom: "solid 1px gray",
          height: "60px",
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
        {messageList.map((message) => {
          return (
            <>
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
                    height: "40px",
                    marginLeft: "10px",
                  }}
                >
                  <div>{message.sender.username}</div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    borderRadius: "10px",
                    backgroundColor: "white",
                    width: "100%",
                    height: "20px",
                    margin: "0 10px",
                    padding: "10px",
                  }}
                >
                  <div>{message.message}</div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}
