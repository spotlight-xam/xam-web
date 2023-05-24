import { Button } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface postLoginReq {
  username: String;
  password: String;
}

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };
  const onPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onLogin = () => {
    const data: postLoginReq = {
      username: username,
      password: password,
    };
    const token = axios.post("localhost:8080/login", data);
    navigate("./home");
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
          src="img/xam.PNG"
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
          onChange={onUsername}
          value={username}
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
          onClick={onLogin}
        >
          Join
        </Button>
      </div>
    </div>
  );
}
