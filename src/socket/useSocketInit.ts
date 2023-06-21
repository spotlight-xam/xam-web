// import { WebSocketController } from '@client/socket';
// import ExpoConstants from 'expo-constants';
// import { useEffect, useRef } from 'react';
// import { AppState, AppStateStatus } from 'react-native';

// import { useSecureStoreUuid } from '@hooks/auth';
// import { useGlobalState } from '@hooks/queries';

import { useEffect, useRef } from "react";
import { WebSocketController } from "../webSocket";

export function useSocketInit() {
  useEffect(() => {
    WebSocketController.createInstance();

    // messageListener.receiveMessageV3Listener();
    // messageListener.onlineGroupV3Listener();
    // messageListener.leaveGroupV3Listener();
    // messageListener.kickGroupV3Listener();

    return () => {
      WebSocketController.destroyInstance();
    };
  }, []);
}
