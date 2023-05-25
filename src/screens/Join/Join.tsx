import { Button } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface postJoinReq {
  //access token을 첨부해서 보냄
  username: String;
  email: String;
  password: String;
}

interface postJoinRes {
  email: string;
  authToken: string;
}

export function Join() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const onPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const onUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const onJoin = async () => {
    const newUser: postJoinReq = {
      username: username,
      email: email,
      password: password,
    };

    try {
      axios.post<postJoinRes>("localhost:8080/signup", newUser);
      navigate(`/login`);
    } catch (error) {
      alert("회원가입에 실패했습니다.");
      console.log(error);
    }
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
          placeholder="Username"
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
