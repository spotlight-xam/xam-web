import { Button } from "antd";
import { useState } from "react";
import axios from "axios";

interface postCreateTeamReq {
  teamName: String;
}

export function CreateTeam() {
  const [team, setTeam] = useState("");

  const onTeam = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTeam(event.target.value);
  };

  const onApply = () => {
    const newTeam: postCreateTeamReq = {
      teamName: team,
    };

    axios.post("localhost:8080/team/create", newTeam);
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
      <div style={{ display: "flex", flexDirection: "column" }}>
        <input
          style={{
            backgroundColor: "#FFE8B6",
            borderRadius: "5px",
            border: "none",
            width: "400px",
            height: "30px",
            margin: "10px",
          }}
          placeholder="Team Name"
          onChange={onTeam}
          value={team}
        />
        <Button
          style={{
            backgroundColor: "#F4900C",
            color: "white",
            margin: "40px 10px",
          }}
          onClick={onApply}
        >
          Apply
        </Button>
      </div>
    </div>
  );
}
