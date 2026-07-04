import { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import { useSocket } from "../context/SocketContext";
import { useAuth } from "../context/AuthContext";

const API = import.meta.env.VITE_API_URL;

export function useChat(roomId) {
  const { user } = useAuth();
  const { joinRoom, leaveRoom, sendMessage, startTyping, stopTyping, on, off } = useSocket();
  const [messages, setMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const typingTimerRef = useRef(null);
  const isTypingRef = useRef(false);

  // Load message history and join socket room
  useEffect(() => {
    if (!roomId) return;

    setMessages([]);
    setLoading(true);

    axios
      .get(`${API}/messages/${roomId}`)
      .then((res) => setMessages(res.data))
      .finally(() => setLoading(false));

    joinRoom(roomId).catch(console.error);

    return () => {
      leaveRoom(roomId);
    };
  }, [roomId]);

  // Socket event listeners
  useEffect(() => {
    if (!roomId) return;

    const handleNewMessage = (msg) => {
      if (msg.room === roomId || msg.room?._id === roomId) {
        setMessages((prev) => [...prev, msg]);
        // Remove from typing when they send
        if (msg.type !== "system") {
          setTypingUsers((prev) => prev.filter((u) => u.userId !== msg.sender?._id));
        }
      }
    };

    const handleTypingStart = ({ userId, username }) => {
      if (userId === user._id) return;
      setTypingUsers((prev) =>
        prev.find((u) => u.userId === userId) ? prev : [...prev, { userId, username }]
      );
    };

    const handleTypingStop = ({ userId }) => {
      setTypingUsers((prev) => prev.filter((u) => u.userId !== userId));
    };

    on("message:new", handleNewMessage);
    on("typing:start", handleTypingStart);
    on("typing:stop", handleTypingStop);

    return () => {
      off("message:new", handleNewMessage);
      off("typing:start", handleTypingStart);
      off("typing:stop", handleTypingStop);
    };
  }, [roomId, user?._id]);

  const send = useCallback(
    async (content) => {
      if (!content.trim() || !roomId) return;
      stopTyping(roomId);
      isTypingRef.current = false;
      await sendMessage(roomId, content);
    },
    [roomId]
  );

  const handleTyping = useCallback(() => {
    if (!isTypingRef.current) {
      startTyping(roomId);
      isTypingRef.current = true;
    }
    clearTimeout(typingTimerRef.current);
    typingTimerRef.current = setTimeout(() => {
      stopTyping(roomId);
      isTypingRef.current = false;
    }, 2000);
  }, [roomId]);

  return { messages, typingUsers, loading, send, handleTyping };
}
