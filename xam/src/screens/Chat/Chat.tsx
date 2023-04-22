import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

export function Chat() {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
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
