import axios from "axios";
import { useEffect, useState } from "react";

interface getMyTeamReq {
  memberId: string;
}

interface getMyTeamRes {
  teamId: string[];
}
export function Team() {
  const [teamlist, setTeamlist] = useState<string[]>([]);

  const getTeamlist = async () => {
    try {
      const res = await axios.get<getMyTeamRes>(
        "localhost:8080/team/{memberId}/myTeam",
        {
          headers: {
            Authorization: "authToken",
          },
        }
      );
      setTeamlist(res.data.teamId);
    } catch {
      alert("데이터를 불러오는데 실패하였습니다.");
    }
  };

  useEffect(() => {
    getTeamlist();
  }, []);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "80px",
        height: "100%",
        backgroundColor: "#827979",
      }}
    >
      <div
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "10px",
          backgroundColor: "white",
          margin: "5px 0",
        }}
      ></div>
      <br></br>
      <div
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "10px",
          backgroundColor: "white",
          margin: "5px 0",
        }}
      ></div>
      {teamlist.map(() => {
        return (
          <div
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "10px",
              backgroundColor: "white",
              margin: "5px 0",
            }}
          ></div>
        );
      })}
    </div>
  );
}
