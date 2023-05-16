import { Button } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  //유저 객체 - 이메일, 비밀번호
  ID: String;
  Password: String;
}

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  const navigate = useNavigate();

  const onEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const onPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const onLogin = () => {
    //localStorage에서 데이터 가져오기
    const userData = localStorage.getItem(email);

    //userData가 null이 아닌 경우에만 User 객체로 변환
    let user: User | null = null;
    if (userData) user = JSON.parse(userData) as User;

    if (user?.Password !== password) {
      alert("등록되지 않은 회원입니다.");
      return;
    }
    setLogin(true);
  };

  useEffect(() => {
    if (login) {
      navigate("/home");
    }
  }, [login]);

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
      <div style={{ display: "flex", flexDirection: "column", width: "350px" }}>
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
            color: "white",
            height: "40px",
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
