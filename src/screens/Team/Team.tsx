import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface MyTeam {
  teamId: number;
  profileImage: string;
}

interface getMyTeamRes {
  myTeamList: MyTeam[];
}

export function Team({
  onTeamEvent,
}: {
  onTeamEvent: (teamData: number) => void;
}) {
  const [teamlist, setTeamlist] = useState<getMyTeamRes>({ myTeamList: [] });
  const navigate = useNavigate();

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
      setTeamlist(res.data);
    } catch {
      const exam: getMyTeamRes = {
        //더미 데이터
        myTeamList: [
          {
            teamId: 3,
            profileImage: "/img/likelion.png",
          },
          {
            teamId: 5,
            profileImage: "/img/likelionSKU.png",
          },
        ],
      };
      setTeamlist(exam);
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
          margin: "5px 0",
          cursor: "pointer",
          background: "url(/img/xam.PNG)",
          backgroundSize: "cover",
        }}
      ></div>
      <div
        style={{ border: "solid 1px black", width: "40px", margin: " 10px 0" }}
      ></div>
      {teamlist.myTeamList.map((team: MyTeam) => {
        return (
          <div
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "10px",
              margin: "5px 0",
              cursor: "pointer",
              background: `url(${team.profileImage})`,
              backgroundSize: "cover",
            }}
            onClick={() => onTeamEvent(team.teamId)}
          ></div>
        );
      })}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "50px",
          height: "50px",
          borderRadius: "10px",
          backgroundColor: "white",
          margin: "5px 0",
          cursor: "pointer",
        }}
        onClick={() => {
          navigate("/createTeam");
        }}
      >
        <PlusOutlined />
      </div>
    </div>
  );
}
