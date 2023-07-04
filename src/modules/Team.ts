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
export const setTeamId = (teamId: number) => ({ type: SET_TEAM_ID, teamId });

//초기값
const initialState = {
  teamId: 0,
};

export default function teamId(state = initialState, action: any) {
  switch (action.type) {
    case SET_TEAM_ID:
      return {
        ...state,
        name: action.teamId,
      };
    //default를 쓰지 않으면 맨처음 state에 name 값이 undefined가 나옴
    default:
      return state;
  }
}
