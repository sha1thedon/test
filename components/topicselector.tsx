// components/TopicSelector.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TopicSelector: React.FC<{ onChange: (topicId: number) => void }> = ({ onChange }) => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    async function fetchTopics() {
      const response = await axios.get('/api/topics');
      setTopics(response.data);
    }
    fetchTopics();
  }, []);

  return (
    <select onChange={(e) => onChange(parseInt(e.target.value))}>
      {topics.map((topic: any) => (
        <option key={topic.id} value={topic.id}>
          {topic.name}
        </option>
      ))}
    </select>
  );
};

export default TopicSelector;
