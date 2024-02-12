// const CreateStudyGoal = () => {
//     return (
//         <h1>Hello world</h1>
//     )

// }

// export default CreateStudyGoal

// StudyGoalForm.tsx
"use client"
import React, { useState } from 'react';

type StudyGoal = {
    goal: string;
    startDate: string;
    endDate: string;
  };

const StudyGoalForm: React.FC<{
  onSubmit: (studyGoal: StudyGoal) => void;
}> = ({ onSubmit }) => {
  const [goal, setGoal] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = () => {
    const studyGoal: StudyGoal = {
      goal,
      startDate,
      endDate,
    };
    onSubmit(studyGoal);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Create Study Goal</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">What do you want to learn?</label>
        <input
          type="text"
          className="mt-1 p-2 w-full border rounded-md"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Start Date</label>
        <input
          type="date"
          className="mt-1 p-2 w-full border rounded-md"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">End Date</label>
        <input
          type="date"
          className="mt-1 p-2 w-full border rounded-md"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-600">Actual Goal</label>
        <textarea
          className="mt-1 p-2 w-full border rounded-md"
          rows={3}
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
        />
      </div>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default StudyGoalForm;
