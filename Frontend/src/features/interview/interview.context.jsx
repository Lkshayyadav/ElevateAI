import React, { createContext, useContext, useState } from 'react';

const InterviewContext = createContext(null);

export const InterviewProvider = ({ children }) => {
  const [reports, setReports] = useState([]); // Default empty array prevents crashes
  const [loading, setLoading] = useState(false);

  return (
    <InterviewContext.Provider value={{ reports, loading }}>
      {children}
    </InterviewContext.Provider>
  );
};

export const useInterview = () => {
  const context = useContext(InterviewContext);
  if (!context) {
    throw new Error("useInterview must be used within an InterviewProvider");
  }
  return context;
};