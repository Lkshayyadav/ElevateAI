import React, { createContext, useContext, useState } from 'react';

export const InterviewContext = createContext();

export const InterviewProvider = ({ children }) => {
      const [report, setReport] = useState(null);
  const [reports, setReports] = useState([]); // Default empty array prevents crashes
  const [loading, setLoading] = useState(false);

  return (
    <InterviewContext.Provider value={{loading, setLoading, report, setReport, reports, setReports}}>
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

