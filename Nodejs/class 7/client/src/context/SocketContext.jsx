import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useAuth } from "./AuthContext";

const SocketContext = createContext(null);

export function SocketProvider({ children }) {
  const { user, getToken } = useAuth();
  const socketRef = useRef(null);
  const [isConnected, setIsConnected] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (!user) return;

    const token = getToken();
    const socket = io(import.meta.env.VITE_SOCKET_URL, {
      auth: { token },
      reconnectionAttempts: 5, // try 5 times to build connection
      reconnectionDelay: 1000, // try after every 1sec
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("🟢 Socket connected:", socket.id);
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      console.log("🔴 Socket disconnected");
      setIsConnected(false);
    });

    socket.on("users:online", (userIds) => setOnlineUsers(userIds));
    socket.on("user:online", ({ userId }) => setOnlineUsers((prev) => [...new Set([...prev, userId])]));
    socket.on("user:offline", ({ userId }) => setOnlineUsers((prev) => prev.filter((id) => id !== userId)));

    return () => {
      socket.disconnect();
      socketRef.current = null;
      setIsConnected(false);
    };
  }, [user]);

  const joinRoom = (roomId) =>
    new Promise((resolve, reject) => {
      socketRef.current?.emit("room:join", roomId, (res) => {
        res?.error ? reject(res.error) : resolve(res);
      });
    });

  const leaveRoom = (roomId) => socketRef.current?.emit("room:leave", roomId);

  const sendMessage = (roomId, content) =>
    new Promise((resolve, reject) => {
      socketRef.current?.emit("message:send", { roomId, content }, (res) => {
        res?.error ? reject(res.error) : resolve(res);
      });
    });

  const sendDM = (toUserId, content) =>
    new Promise((resolve, reject) => {
      socketRef.current?.emit("dm:send", { toUserId, content }, (res) => {
        res?.error ? reject(res.error) : resolve(res);
      });
    });

  const startTyping = (roomId) => socketRef.current?.emit("typing:start", { roomId });
  const stopTyping = (roomId) => socketRef.current?.emit("typing:stop", { roomId });

  const on = (event, cb) => socketRef.current?.on(event, cb);
  const off = (event, cb) => socketRef.current?.off(event, cb);

  return (
    <SocketContext.Provider value={{
      socket: socketRef.current,
      isConnected,
      onlineUsers,
      joinRoom,
      leaveRoom,
      sendMessage,
      sendDM,
      startTyping,
      stopTyping,
      on,
      off,
    }}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => useContext(SocketContext);
