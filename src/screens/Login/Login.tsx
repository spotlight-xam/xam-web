import { Button } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

interface postLoginReq {
  email: String;
  password: String;
}

interface postLoginRes {
  accessToken: String;
  refreshToken: String;
}

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const onPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onLogin = async () => {
    //관리자
    if (email === "admin") {
      localStorage.setItem("accessToken", "admin");
      return navigate(`/home`);
    }

    const data: postLoginReq = {
      email: email,
      password: password,
    };

    try {
      const res = await axios.post<postLoginRes>("localhost:8080/login", data);

      //Access token
      const accessToken = res.data.accessToken;
      localStorage.setItem("accessToken", String(accessToken));

      //Refresh token
      const refreshToken = res.data.refreshToken;
      document.cookie = `refreshToken=${refreshToken}; path=/; secure; HttpOnly;`;
    } catch {
      return alert("로그인에 실패하였습니다.");
    }

    navigate(`/home`);
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
          onClick={onLogin}
        >
          Login
        </Button>
      </div>
    </div>
  );
}
