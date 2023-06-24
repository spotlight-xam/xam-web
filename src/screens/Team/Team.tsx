import { PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import { useEffect, useState } from "react";

interface MyTeam {
  id: number;
  teamName: string;
}

interface getMyTeamRes {
  myTeamList: MyTeam[];
}

export function Team({
  onTeamEvent,
}: {
  onTeamEvent: (teamData: number) => void;
}) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [teamlist, setTeamlist] = useState<getMyTeamRes>({
    myTeamList: [],
  });

  const handleButtonClick = () => {
    setIsPopupOpen(true);
  };

  const handlePopupClose = () => {
    setIsPopupOpen(false);
  };

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
            id: 3,
            teamName: "LikeLion",
          },
          {
            id: 5,
            teamName: "spotLight",
          },
        ],
      };
      setTeamlist(exam);
    }
  };

  const chooseTeam = (team: MyTeam) => {
    //팀이 선택되었을 때
    const teamData = team.id;
    onTeamEvent(teamData);
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
      >
        My Page
      </div>
      <br></br>
      {teamlist.myTeamList.map((team: MyTeam) => {
        return (
          <div
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "10px",
              backgroundColor: "white",
              margin: "5px 0",
              cursor: "pointer",
            }}
            onClick={() => chooseTeam(team)}
          >
            {team.teamName}
          </div>
        );
      })}
      <div
        style={{
          width: "50px",
          height: "50px",
          borderRadius: "10px",
          backgroundColor: "white",
          margin: "5px 0",
          cursor: "pointer",
        }}
        onClick={handleButtonClick}
      >
        <PlusOutlined />
      </div>
      {isPopupOpen && (
        <div className="popup">
          <div>
            <h2>팀 만들기</h2>
            <button onClick={handlePopupClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
