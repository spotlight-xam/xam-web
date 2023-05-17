import { Button } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  //유저 객체 - 이메일, 비밀번호
  ID: String;
  Password: String;
}

export function Join() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const onPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onJoin = () => {
    const newUser: User = {
      ID: email,
      Password: password,
    };
    localStorage.setItem(email, JSON.stringify(newUser));
    navigate("/login");
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "350px",
        }}
      >
        <img
          style={{ width: "100px", margin: "10px" }}
          alt="Xam_IMG"
          src="img/xam.png"
        />
        <input
          style={{
            backgroundColor: "#FFE8B6",
            borderRadius: "5px",
            border: "none",
            height: "30px",
            width: "100%",
            margin: "10px",
            padding: "5px",
          }}
          placeholder="User Email"
          onChange={onEmail}
          value={email}
        />
        <input
          style={{
            backgroundColor: "#FFE8B6",
            borderRadius: "5px",
            border: "none",
            height: "30px",
            width: "100%",
            margin: "10px",
            padding: "5px",
          }}
          placeholder="Password"
          onChange={onPassword}
          value={password}
        />
        <Button
          style={{
            backgroundColor: "#F4900C",
            borderRadius: "5px",
            color: "white",
            height: "40px",
            width: "100%",
            margin: "40px 10px",
            padding: "5px",
          }}
          onClick={onJoin}
        >
          Join
        </Button>
      </div>
    </div>
  );
}
