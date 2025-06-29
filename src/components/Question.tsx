import { useState } from "react";
import apiClient from "../apiClient/ApiClient";
import { toast } from "react-toastify";
import useContextPro from "../hooks/useContextPro";

function Question() {
  const [questInp, setQuestInp] = useState('');
  const {state: {user}} = useContextPro()

  const formatDateTime = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}.${month}.${year} ${hours}:${minutes}`;
  }

  const setQuestions = () => {
    const quesObj = {
      question: questInp,
      userId: user?.id,
      username: user?.username,
      createdAt: formatDateTime(new Date()),
      answer: null
    };
    apiClient.post("/questions", quesObj).then((res) => {
      console.log(res)
      toast.success("Your question has been sent successfully! 🩷");
      setQuestInp('');
    }).catch((err) => {
      toast.error("Error sending question");
      console.log(err);
    });
  }

  return (
    <div className="questions">
        <h1>Have Question in Mind? <br /> Let us help you</h1>
        <div className="question-inp">
            <input 
              onChange={(e) => setQuestInp(e.target.value)} 
              value={questInp} 
              type="text" 
              placeholder="Enter your question" 
            />
            <button onClick={setQuestions}>Send</button>
        </div>
    </div>
  )
}

export default Question