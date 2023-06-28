import axios from "axios";
import { useEffect, useState } from "react";

interface Member {
  username: String;
  email: String;
}

interface TeamInfoRes {
  teamName: String;
  leader: Member[];
}
export function TeamInfo({ teamId }: { teamId: number }) {
  const [teamInfo, setTeamInfo] = useState<TeamInfoRes>();

  useEffect(() => {
    getTeamInfo;
  }, []);

  const getTeamInfo = async () => {
    try {
      const res = await axios.get<TeamInfoRes>(
        `localhost:8080/team/${teamId}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      setTeamInfo(res.data);
    } catch (error) {
      //팀 정보 더미데이터
      var exam: TeamInfoRes = {} as TeamInfoRes;
      if (teamId === 3) {
        var exam: TeamInfoRes = {
          teamName: "멋쟁이 사자처럼",
          leader: [
            {
              username: "이두희",
              email: "admin@naver.com",
            },
          ],
        };
      } else if (teamId === 5) {
        var exam: TeamInfoRes = {
          teamName: "멋쟁이 사자처럼_서경대",
          leader: [
            {
              username: "황현진",
              email: "hyunjin@naver.com",
            },
          ],
        };
      }
      setTeamInfo(exam);
      console.log(exam);
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        height: "60px",
        width: "100%",
        borderBottom: "solid 1px gray",
      }}
    >
      {teamInfo?.teamName}
    </div>
  );
}
