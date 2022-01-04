import {createContext, FC, Fragment, ReactNode, useCallback, useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {useAppSelector} from "../../redux/hooks";
import useWebSocket, {ReadyState} from "react-use-websocket";
import {API_HOST, WS_SCHEME} from "../../config";
import {useToast} from "@chakra-ui/react";

type WebsocketMessageType = "echo" | "";  // extend with types from backend

export interface WebsocketMessage {
  type: WebsocketMessageType,
  payload: any,
}

interface WebsocketContextState {
  sendMessage: (jsonMessage: any, keep?: boolean) => void,
  connectionStatus: string,           // later replace with dispatch to store
  notifications: WebsocketMessage[],  // later replace with dispatch to store
}

const WebsocketContext = createContext<WebsocketContextState>({} as WebsocketContextState);

const statusMapping = {
  [ReadyState.CONNECTING]: 'Connecting',
  [ReadyState.OPEN]: 'Open',
  [ReadyState.CLOSING]: 'Closing',
  [ReadyState.CLOSED]: 'Closed',
  [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
};

const RETRY_TIMES = 5;

interface WebsocketContextProviderProps {
  children: ReactNode;
}

const WebsocketContextProvider: FC<WebsocketContextProviderProps> = ({children}) => {
  const isSSR = typeof window === undefined;
  const router = useRouter();

  const [notifications, setNotifications] = useState<WebsocketMessage[]>([]);

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

        // dispatch proper action based on type property
        switch (content.type) {
          case "echo":
            setNotifications(prev => prev.concat(content));
            console.log(content); // debug only
            break;
          default:
            console.log(content); // debug only
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

  if (isSSR) return (
    <Fragment>{children}</Fragment>
  );

  return (
    <WebsocketContext.Provider value={{
      sendMessage: sendMessage,
      connectionStatus: statusMapping[readyState],  // later replace with dispatch to store
      notifications: notifications, // later replace with dispatch to store
    }}>
      {children}
    </WebsocketContext.Provider>
  );
};

export const useWebSocketContext = () => useContext(WebsocketContext);

export default WebsocketContextProvider;
