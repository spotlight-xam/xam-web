interface MyRoom {
  roomId: number;
  roomName: string;
}

interface getMyRoomRes {
  roomList: MyRoom[];
}

//액션
const SET_ROOM_ID = "room/SET_ROOM_ID";

//액션 생성 함수
export const setRoomId = (roomId: number) => ({ type: SET_ROOM_ID, roomId });

//초기값
const initialState = {
  teamId: 0,
};

export default function roomId(state = initialState, action: any) {
  switch (action.type) {
    case SET_ROOM_ID:
      return {
        ...state,
        name: action.roomId,
      };
    //default를 쓰지 않으면 맨처음 state에 name 값이 undefined가 나옴
    default:
      return state;
  }
}
