import {PersonOutline, ScheduleOutlined, QuestionAnswerOutlined } from '@mui/icons-material';
import useQuestions from "../../../hooks/useQuestions";

function AdminQuestion() {
  const { questions } = useQuestions();

  return (
    <div className="admin-questions-container">
      <div className="questions-header">
        <h2 className="questions-title">Customer Questions</h2>
      </div>

      {/* Questions List */}
      <div className="questions-list">
        {questions.map((question) => (
          <div className="question-card" key={question.id}>
            <div className="question-content">
              <div className="question-text">
                <QuestionAnswerOutlined className="question-icon" />
                <p className="question">{question.question}</p>
              </div>
              
              <div className="question-meta">
                <span className="meta-item">
                  <PersonOutline className="meta-icon" />
                  {question.username || 'Anonymous'}
                </span>
                
                <span className="meta-item">
                  <ScheduleOutlined className="meta-icon" />
                  {question.createdAt}
                </span>
              </div>
            </div>
            
            <div className="answer-section">
              <h4 className="answer-title">Answer:</h4>
              <p className="answer">
                {question.answer || 'Not answered yet'}
              </p>
            </div>
          
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminQuestion;