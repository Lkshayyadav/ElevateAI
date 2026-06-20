import React, { createContext, useContext, useState } from 'react';

export const InterviewContext = createContext(null);   // ✅ named export so useInterview.js can import it

export const InterviewProvider = ({ children }) => {
  const [reports, setReports] = useState([]);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);

  return (
    <InterviewContext.Provider value={{ reports, setReports, report, setReport, loading, setLoading }}>
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