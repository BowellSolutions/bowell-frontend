/**
 * @author: Adam Lisichin
 * @file: Exports:
 * - WebsocketContextProvider - HOC component which establishes websocket connection in Dashboard, dispatches incoming
 * messages and connection status to store, displays toast on open and close.
 * - useWebsocketContext hook
 * - WebsocketMessage interface
 **/
import {createContext, FC, Fragment, ReactNode, useCallback, useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import useWebSocket, {ReadyState} from "react-use-websocket";
import {API_HOST, WS_SCHEME} from "../../config";
import {useToast} from "@chakra-ui/react";
import {addNotification, setWebsocketStatus, updateExamination} from "../../redux/reducers/dashboard";

type WebsocketMessageType = "notify" | "update_examination";  // extend with types from backend

export interface WebsocketMessage {
  type: WebsocketMessageType,
  payload: any,
}

interface WebsocketContextState {
  sendMessage: (jsonMessage: any, keep?: boolean) => void,
}

const WebsocketContext = createContext<WebsocketContextState>({} as WebsocketContextState);

const statusMapping = {
  [ReadyState.CONNECTING]: 'Connecting',
  [ReadyState.OPEN]: 'Open',
  [ReadyState.CLOSING]: 'Closing',
  [ReadyState.CLOSED]: 'Closed',
  [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
};

const RETRY_TIMES = 1;

interface WebsocketContextProviderProps {
  children: ReactNode;
}

const WebsocketContextProvider: FC<WebsocketContextProviderProps> = ({children}) => {
  const isSSR = typeof window === undefined;
  const router = useRouter();

  const dispatch = useAppDispatch();
  const {user, isAuthenticated} = useAppSelector(state => state.auth);

  const toast = useToast();

  const {sendJsonMessage, readyState} = useWebSocket(
    user != null ? `${WS_SCHEME}://${API_HOST}/ws/users/${user.id}/` : null, {
      onOpen: () => {
        toast({
          description: "Connected!",
          status: "success",
          position: "bottom-right",
          duration: 2500,
          isClosable: true,
        });
      },
      onMessage: (event) => {
        // parse incoming message object
        const content: WebsocketMessage = JSON.parse(event.data);

        dispatch(addNotification(content));

        // dispatch proper action based on type property
        switch (content.type) {
          case "notify":
            break;
          case "update_examination":
            dispatch(updateExamination(content.payload));
            break;
          default:
            break;
        }
      },
      onClose: (event) => {
        toast({
          description: "Disconnected!",
          status: "error",
          position: "bottom-right",
          duration: 2500,
          isClosable: true,
        });
      },
      shouldReconnect: (event) => true,
      share: true,
      reconnectAttempts: RETRY_TIMES,
    },
    // do not connect on server side, outside of dashboard and if user is not logged in
    !isSSR && router.pathname.includes("/dashboard") && user != null && isAuthenticated,
  );

  const sendMessage = useCallback(
    (jsonMessage: any, keep?: boolean) => sendJsonMessage(jsonMessage, keep), [sendJsonMessage]
  );

  useEffect(() => {
    // dispatch connection status on change
    dispatch(setWebsocketStatus(statusMapping[readyState]));
  }, [dispatch, readyState]);

  if (isSSR) return (
    <Fragment>{children}</Fragment>
  );

  return (
    <WebsocketContext.Provider value={{
      sendMessage: sendMessage,
    }}>
      {children}
    </WebsocketContext.Provider>
  );
};

export const useWebSocketContext = () => useContext(WebsocketContext);

export default WebsocketContextProvider;
