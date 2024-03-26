// ChatboxComponent.tsx
import React, { useEffect, useState } from "react";
import { useSocket } from "../../context/SocketProvider";
import { apiConnector } from "../../lib/apiConnector";
import { toast } from "react-hot-toast";

interface Message{
  text: string,
  groupId: string,
  userId: string,
}

const Chat = ({ groupId }: { groupId: string }) => {
  const { messages, sendMessage } = useSocket();
  const initialMessage: Message = {
    text: '',
    groupId: groupId,
    userId: "65ac26f3b168b6af3bca8dd5",
  };
  
  const [message, setMessage] = useState<Message>(initialMessage);
  const [previousMessages, setPreviousMessages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const getAllMessagesForGroup = async (groupId: string) => {
    const url = "http://localhost:8000/api/messages";
    const toastId = toast.loading("getting message..");
    try {
        setLoading(true);
        const response = await apiConnector('POST', `http://localhost:8000/api/messages`, {groupId}, {
            "Content-Type": "application/json",
        });
  
        if (response.data) {
            console.log("Messages for group:", response.data);
            setPreviousMessages(response.data);
            return response.data;
        } else {
            console.log("Failed to fetch messages for group");
            return [];
        }
        setLoading(false);
    } catch (error) {
        console.log("Error fetching messages:", error);
        return [];
    }
    toast.dismiss(toastId);
  }

  // useEffect(() => {
  //   getAllMessagesForGroup(groupId);
  // }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    sendMessage(message);
    setMessage(initialMessage);
  };

  return (
    <div className="flex flex-col gap-4">
      {loading ? (
        <div>Fetching messages</div>
      ) : (
        <div className="border mt-6 border-red-500 flex items-center justify-center">
          {previousMessages.length === 0 ? (
            <div>No messages till now</div>
          ) : (
            previousMessages.map((msg, index) => (
              <div key={index} className="flex flex-col">
                <span className="text-red-500">prev user</span>
                <span>{msg}</span>
              </div>
            ))
          )}
          
          {messages.map((msg, index) => (
            <div key={index} className="flex flex-col">
              <span className="text-red-500">{msg.userId}</span>
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
