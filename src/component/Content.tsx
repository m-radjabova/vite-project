import { FormEvent, useState } from "react";
import { User } from "../App"
import { BsTelephone } from "react-icons/bs";
import { CiMenuBurger } from "react-icons/ci";
import { FaPhoneVolume } from "react-icons/fa6";
import { FaSmile, FaUserCircle } from "react-icons/fa"; 
import { AiOutlineSend } from "react-icons/ai";
import { CiMenuFries } from "react-icons/ci";
import { MdOutlineDelete } from "react-icons/md";
import { AiFillEdit } from "react-icons/ai";

interface Props {
  selectedUser: User | null
}

interface Massage {
  id: number;
  from : number;
  to : number;
  text : string;
  time : string;
}

const stickers = [
  "😊", "😂", "😍", "😎", "👍", "🎉", "🔥", "😢", "❤️", "🎶", 
  "🤔", "😄", "😃", "😅", "😉", "😇", "🥰", "😘", "😜", "🤩", 
  "🤗", "😋", "😛", "😝", "🤑", "🤠", "😷", "🤒", "🤕", "🤧", 
  "🥳", "😡", "😠", "🤬", "😱", "😨", "😰", "😥", "😓", "😭", "❤️", 
  "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "💔", "❣️", 
  "💕", "💞", "💓", "💗", "💖", "💘", "💝", "💟", "💌", "❤️‍🩹", "❣️",

  "🌹", "🌺", "🌸", "🌼", "🌻", "💐", "🌷", "🌱", "🌿", "☘️", 
  "🍀", "🌵", "🌴", "🌳", "🌲", "🌾", "🌿", "🍁", "🍂", "🍃",

  "☀️", "🌤️", "⛅", "🌥️", "☁️", "🌦️", "🌧️", "⛈️", "🌩️", "🌨️", 
  "❄️", "☃️", "⛄", "🌬️", "💨", "🌪️", "🌫️", "🌈", "☔", "⚡",

  "👋", "👏", "🙌", "👐", "🤲", "🤝", "🙏", "✍️", "💅", "🤳",
];

function Content(props: Props) {

  const [messages, setMessages] = useState<Massage[]>([
    // Messages between User 1 and User 2
    { id: 1, from: 1, to: 2, text: "Hello Mary! 😊", time: "18.03.2025 15:00" },
    { id: 2, from: 2, to: 1, text: "Hey! How are you? 🌸", time: "18.03.2025 15:03" },
    { id: 3, from: 1, to: 2, text: "I'm fine, how about you? 😄", time: "18.03.2025 15:05" },
    { id: 4, from: 2, to: 1, text: "I'm good too! What about you? 🤔", time: "18.03.2025 15:07" },
  
    // Messages between User 1 and User 3
    { id: 5, from: 1, to: 3, text: "Hi Jane! How's it going? 👋", time: "18.03.2025 16:00" },
    { id: 6, from: 3, to: 1, text: "Hey! I'm doing great, thanks! 😊", time: "18.03.2025 16:05" },
    { id: 7, from: 1, to: 3, text: "Glad to hear that! 😎", time: "18.03.2025 16:10" },
    { id: 8, from: 3, to: 1, text: "Thanks! How about you? 🤗", time: "18.03.2025 16:15" },
  
    // Messages between User 1 and User 4
    { id: 9, from: 1, to: 4, text: "Hello Jake! Long time no see! 😃", time: "18.03.2025 17:00" },
    { id: 10, from: 4, to: 1, text: "Hi! Yeah, it's been a while. How are you? 🤗", time: "18.03.2025 17:05" },
    { id: 11, from: 1, to: 4, text: "I'm doing well, thanks! 🚀", time: "18.03.2025 17:10" },
    { id: 12, from: 4, to: 1, text: "That's great to hear! 👍", time: "18.03.2025 17:15" },
  
    // Messages between User 1 and User 5
    { id: 13, from: 1, to: 5, text: "Hi Anna! Are you free this weekend? 🗓️", time: "18.03.2025 18:00" },
    { id: 14, from: 5, to: 1, text: "Hey! Yes, I am. What's the plan? 😊", time: "18.03.2025 18:10" },
    { id: 15, from: 1, to: 5, text: "Let's go hiking! 🥾", time: "18.03.2025 18:15" },
    { id: 16, from: 5, to: 1, text: "Sounds fun! Count me in! 🌄", time: "18.03.2025 18:20" },
  
    // Messages between User 1 and User 6
    { id: 17, from: 1, to: 6, text: "Hi Vika! How's everything going? 🌸", time: "18.03.2025 19:00" },
    { id: 18, from: 6, to: 1, text: "Hello! Everything's great, thanks for asking! 🌟", time: "18.03.2025 19:05" },
    { id: 19, from: 1, to: 6, text: "Glad to hear that! Keep it up! 💪", time: "18.03.2025 19:10" },
    { id: 20, from: 6, to: 1, text: "Thanks! You too! 😊", time: "18.03.2025 19:15" },
  
    // Messages between User 1 and User 7
    { id: 21, from: 1, to: 7, text: "Hi Tom! Are you coming to the meeting? 🕒", time: "18.03.2025 20:00" },
    { id: 22, from: 7, to: 1, text: "Hey! Yes, I'll be there on time. 👍", time: "18.03.2025 20:10" },
    { id: 23, from: 1, to: 7, text: "Great! See you there! 👋", time: "18.03.2025 20:15" },
    { id: 24, from: 7, to: 1, text: "See you! 🚀", time: "18.03.2025 20:20" },
  
    // Messages between User 1 and User 8
    { id: 25, from: 1, to: 8, text: "Hi Lucy! Can you send me the report? 📄", time: "18.03.2025 21:00" },
    { id: 26, from: 8, to: 1, text: "Sure! I'll send it in a few minutes. 📩", time: "18.03.2025 21:05" },
    { id: 27, from: 1, to: 8, text: "Thanks a lot! 🙏", time: "18.03.2025 21:10" },
    { id: 28, from: 8, to: 1, text: "You're welcome! 😊", time: "18.03.2025 21:15" },
  
    // Messages between User 1 and User 9
    { id: 29, from: 1, to: 9, text: "Hi John! How's the project going? 🚧", time: "18.03.2025 22:00" },
    { id: 30, from: 9, to: 1, text: "Hey! It's going well. Almost done! 🚀", time: "18.03.2025 22:10" },
    { id: 31, from: 1, to: 9, text: "Awesome! Keep up the great work! 💪", time: "18.03.2025 22:15" },
    { id: 32, from: 9, to: 1, text: "Thanks! Will do! 😊", time: "18.03.2025 22:20" },
  
    // Messages between User 1 and User 10
    { id: 33, from: 1, to: 10, text: "Hi Emma! Are you available for a call? 📞", time: "18.03.2025 23:00" },
    { id: 34, from: 10, to: 1, text: "Hey! Yes, let me know the time. 😊", time: "18.03.2025 23:05" },
    { id: 35, from: 1, to: 10, text: "How about tomorrow at 10 AM? 🕙", time: "18.03.2025 23:10" },
    { id: 36, from: 10, to: 1, text: "Perfect! See you then! 👋", time: "18.03.2025 23:15" },

    // Massage between User 1 and User 11
    { id: 37, from: 1, to: 11, text: "Hi Mark! How's your day going? 🌞", time: "19.03.2025 00:00" },
    { id: 38, from: 11, to: 1, text: "Hey! It's going well. How about you? 🌞", time: "19.03.2025 00:05" },
    { id: 39, from: 1, to: 11, text: "Same here! 😊", time: "19.03.2025 00:10" },
    { id: 40, from: 11, to: 1, text: "Thanks! Will do! 😊", time: "19.03.2025 00:15" },

    // Massage between User 1 and User 12
    { id: 41, from: 1, to: 12, text: "Hi Lucy! Can you send me the report? 📄", time: "19.03.2025 01:00" },
    { id: 42, from: 12, to: 1, text: "Sure! I'll send it in a few minutes. 📩", time: "19.03.2025 01:05" },
    { id: 43, from: 1, to: 12, text: "Thanks a lot! 🙏", time: "19.03.2025 01:10" },
    { id: 44, from: 12, to: 1, text: "You're welcome! 😊", time: "19.03.2025 01:15" },
  ]);

  const [message, setMessage] = useState<string>('');
  const [editingMessageId, setEditingMessageId] = useState<number | null>(null);
  const [showStickers, setShowStickers] = useState<boolean>(false);

  const [dropdownOpenId, setDropdownOpenId] = useState<number | null>(null);
  
  function sendMessage(e: FormEvent) {
    e.preventDefault();
    if (!message.trim()) return;

    if (editingMessageId) {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === editingMessageId ? { ...msg, text: message } : msg
        )
      );
      setEditingMessageId(null);
    } else {
      const newMessage: Massage = {
        id: messages.length + 1,
        from: 1,
        to: props.selectedUser ? props.selectedUser.id : 1,
        text: message,
        time: getFormattedDateTime(),
      };
      setMessages([...messages, newMessage]);
    }
    setMessage("");
  }

  function handleStickerClick(sticker: string) {
    setMessage(prev => prev + " " + sticker); 
    setShowStickers(false);
  }

  function editMassage(id: number) {
    const messageToEdit = messages.find((item) => item.id === id);
    if (!messageToEdit) return;

    setMessage(messageToEdit.text); 
    setEditingMessageId(id); 
    setDropdownOpenId(null); 
  }
  
  function deleteMassage(id: number) {
    setMessages(messages.filter((item) => item.id !== id));
    setDropdownOpenId(null); 
  }


  function getFormattedDateTime() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0'); 
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    return `${day}.${month}.${year} ${hours}:${minutes}`;
  }

  if( !props.selectedUser ) {
    return (
      <div className="content">
        <div className="inContent">
          <h1>Select a user to start chat</h1>
        </div>
      </div>
    )
  }
  
  return (
    <div className="content">
      <div className="inContent">
        <div className="user-info">
          <FaUserCircle className="user-icon" />
          <div>
          <h1>{props.selectedUser?.userName}</h1>
            <p>
              <BsTelephone /> {props.selectedUser!.phone}
            </p>
          </div>
        </div>
        <div className="icons">
          <FaPhoneVolume />
          <CiMenuBurger />
        </div>
      </div>
      <div className="chats">
      <ul>
        {messages
          .filter(
            (item) =>
              (item.from === 1 && item.to === props.selectedUser!.id) ||
              (item.from === props.selectedUser!.id && item.to === 1)
          )
          .map((message) => (
            <li className={`massage ${message.from === 1 && "right"}`} key={message.id}>
              {/* dropdown bo'limi */}
              <div className="dropdown">
                  <CiMenuFries
                    className="dropdown-iconMenu"
                    onClick={() =>
                      setDropdownOpenId(dropdownOpenId === message.id ? null : message.id)
                    }
                  />
                  {dropdownOpenId === message.id && (
                    <div className="dropdown-menu">
                      <div
                        onClick={() => deleteMassage(message.id)}
                        className="dropdown-item"
                      >
                        <MdOutlineDelete /> delete
                      </div>
                      <div 
                        onClick={() => editMassage(message.id)}
                        className="dropdown-item">
                        <AiFillEdit /> edit
                      </div>
                    </div>
                  )}
                </div>
              {message.text}
              <span>{message.time}</span>
            </li>
          ))}
      </ul>

      </div>
      {/* stiker bo'limi */}
        {showStickers && (
          <div className="sticker-menu">
            {stickers.map((sticker, index) => (
              <span key={index} onClick={() => handleStickerClick(sticker)} className="sticker">
                {sticker}
              </span>
            ))}
          </div>
      )}
      <div className="bottom">
        <form onSubmit={sendMessage}>
          <button type="button" onClick={() => setShowStickers(!showStickers)}>
            <FaSmile />
          </button>
          <input value={message} onChange={(e) => setMessage(e.target.value)} type="text" placeholder="Type a message..." />
          <button type="submit"><AiOutlineSend /></button>
        </form>
      </div>
    </div>
  );
}

export default Content