import { Button } from "antd";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

interface postCreateTeamReq {
  teamName: String;
}

interface postCreateTeamRes {
  teamId: Number;
}

export function CreateTeam() {
  const [team, setTeam] = useState("");
  const navigate = useNavigate();

  const onTeam = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTeam(event.target.value);
  };

  const onApply = () => {
    const newTeam: postCreateTeamReq = {
      teamName: team,
    };

    try {
      const teamId = axios.post<postCreateTeamRes>(
        "localhost:8080/team/create",
        newTeam
      );
      navigate(`/chat/${teamId}`);
    } catch (error) {
      alert("팀 생성에 실패하였습니다.");
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
          flexDirection: "row",
          margin: "100px",
        }}
      >
        <h1 style={{ font: "Inter", width: "350px" }}>
          Create your team and add members to collaborate effectively
        </h1>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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
            width: "400px",
            height: "30px",
            margin: "5px",
          }}
          placeholder="Team Name"
          onChange={onTeam}
          value={team}
        />
        <Button
          style={{
            backgroundColor: "#F4900C",
            width: "400px",
            color: "white",
            margin: "10px 10px",
          }}
          onClick={onApply}
        >
          Apply
        </Button>
      </div>
    </div>
  );
}
