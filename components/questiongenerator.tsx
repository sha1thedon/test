// components/QuestionGenerator.tsx

import React, { useState } from 'react';
import axios from 'axios';

const QuestionGenerator: React.FC<{ topicId: number }> = ({ topicId }) => {
  const [questions, setQuestions] = useState([]);

  const generateQuestions = async () => {
    const response = await axios.get(`/api/questions?topicId=${topicId}`);
    setQuestions(response.data);
  };

  return (
    <div>
      <button onClick={generateQuestions}>Generate Questions</button>
      <ul>
        {questions.map((question: any) => (
          <li key={question.id}>{question.content}</li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionGenerator;
