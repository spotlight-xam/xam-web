import { PlusOutlined, QqOutlined, SearchOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Team() {
  const [team, setTeam] = useState([""]);
  const navigate = useNavigate();

  const addTeam = () => {
    navigate("CreateTeam");
  };
  const searchTeam = () => {
    localStorage.getItem;
  };

  return (
    <div>
      <br></br>
      <Button
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "10px",
          backgroundColor: "white",
          margin: "5px 0",
        }}
        icon={<QqOutlined />}
      ></Button>
      <br></br>
      <Button
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "10px",
          backgroundColor: "white",
          margin: "5px 0",
        }}
        icon={<PlusOutlined />}
        onClick={addTeam}
      ></Button>
      <Button
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "10px",
          backgroundColor: "white",
          margin: "5px 0",
        }}
        icon={<SearchOutlined />}
        onClick={searchTeam}
      ></Button>
    </div>
  );
}
