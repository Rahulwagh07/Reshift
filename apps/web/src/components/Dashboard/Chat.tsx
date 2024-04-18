import React, { useEffect, useState } from "react";
import { useSocket } from "../../context/SocketProvider";
import { apiConnector } from "../../lib/apiConnector";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { FaRegUserCircle } from "react-icons/fa";
import Spinner from "../common/Spinner";

interface Message{
  text: string,
  taskId: string,
  userId: string,
  userName: string,
}

const Chat = ({ taskId }: { taskId: string }) => {
  const { messages, sendMessage } = useSocket();
  const { user } = useSelector((state: RootState) => state.profile);
  const initialMessage: Message = {
    text: '',
    taskId: taskId,
    userId: user._id,
    userName: user.name,
  };
  const [message, setMessage] = useState<Message>(initialMessage);
  const [previousMessages, setPreviousMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const getAllMessagesForGroup = async (taskId: string) => {
    const url = `http://localhost:8000/api/messages?taskId=${taskId}`; 
    try {
      setLoading(true);
      const response = await apiConnector('GET', url, null);
  
      if (response.data) {
        console.log("Messages for group:", response.data);
        setPreviousMessages(response.data);
        return response.data;
      } else {
        console.log("Failed to fetch messages for group");
        return [];
      }
    } catch (error) {
      console.log("Error fetching messages:", error);
      return [];
    } finally {
      setLoading(false);  
    }
  };
  
  useEffect(() => {
    getAllMessagesForGroup(taskId);
  }, [taskId]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage(message);
    setMessage(initialMessage);
  };

  return (
    <div className="flex flex-col gap-4">
      {loading ? (
        <Spinner/> 
      ) : (
        <div className="mt-6 flex flex-col">
          {previousMessages.length === 0 ? (
            <Spinner></Spinner> 
          ) : (
            previousMessages.map((msg, index) => (
              <div key={index} className="flex flex-col">
                <div className="flex gap-2 items-baseline">
                  <FaRegUserCircle/>
                  <span className="text-red-500">{msg.userName}</span>
                </div>
                <span className="inline-block p-1 rounded-md border border-blue-150">{msg.text}</span>
              </div>
            ))
          )}
          
          {messages.map((msg, index) => (
            <div key={index} className="flex flex-col">
              <span>{msg.userName}</span>
              <span>{msg.text}</span>
            </div>
          ))}
        </div>
      )}
      <div className="h-20 mb-6">
        <form onSubmit={handleSubmit} className="flex gap-2 justify-between">
          <input
            value={message.text}
            onChange={(e) => setMessage({ ...message, text: e.target.value })}
            className="h-14 w-full p-2 border border-gray-300 rounded-lg"
            placeholder="Message..."
          />
          <button
            type="submit"
            className="h-14 px-8 p-2 rounded-lg border border-sky-500 text-blue-150"
          >
            Send
          </button>
        </form>
      </div>
    </div>

  );
};

export default Chat;
