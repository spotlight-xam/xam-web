interface MyTeam {
  teamId: number;
  profileImage: string;
}

interface getMyTeamRes {
  myTeamList: MyTeam[];
}

//액션
const SET_TEAM_ID = "team/SET_TEAM_ID";

//액션 생성 함수
export const setTeamId = (teamId) => ({ type: SET_TEAM_ID, teamId });

//초기값
const initialState = {
  teamId: 0,
};

export default function teamId(state = initialState, action) {
  switch (action.type) {
    case SET_TEAM_ID:
      return {
        ...state,
        name: action.teamId,
      };
    default:
      return state;
  }
}
