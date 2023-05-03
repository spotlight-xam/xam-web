import { Button } from "antd";
import { useState } from "react";

const Team = {
  //팀 객체 - 팀 이름, 팀 설명, 구성원 초대 Link(닉네임)
  name: String,
  description: String,
  member: [String],
};

export function CreateTeam() {
  const [team, setTeam] = useState("");
  const [description, setDescription] = useState("");
  const [member, setMember] = useState("");

  const onTeam = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTeam(event.target.value);
  };
  const onDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };
  const onMember = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMember(event.target.value);
  };

  //input 값을 team 배열에 저장하기
  const onApply = () => {
    const newTeam = {
      name: team,
      description: description,
      member: member,
    };

    localStorage.setItem(team, JSON.stringify(newTeam));
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
        <link rel="icon" type="image/PNG+xml" href="../assets/xam.PNG" />
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
        <input
          style={{
            backgroundColor: "#FFE8B6",
            borderRadius: "5px",
            border: "none",
            width: "400px",
            height: "30px",
            margin: "10px",
          }}
          placeholder="Team Description"
          onChange={onDescription}
          value={description}
        />
        <input
          style={{
            backgroundColor: "#FFE8B6",
            borderRadius: "5px",
            border: "none",
            width: "400px",
            height: "30px",
            margin: "10px",
          }}
          placeholder="Team Member"
          onChange={onMember}
          value={member}
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
