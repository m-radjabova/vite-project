import { useEffect, useState } from "react";
import apiClient from "../apiClient/ApiClient";
import { toast } from "react-toastify";
import { QuestionType } from "../page/types/Types";

const useQuestions = () => {
 const [questions, setQuestions] = useState<QuestionType[]>([]);

  useEffect(() => {
    getQuestions();
  }, []);

  const getQuestions = () => {
    apiClient.get("/questions").then((res) => {
      setQuestions(res.data);
    }).catch((err) => {
      toast.error("Error fetching questions");
      console.log(err);
    })
  }

  return { questions};
};

export default useQuestions;