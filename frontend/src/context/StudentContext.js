// src/context/StudentContext.js
import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(
        "https://sms-2-ho50.onrender.com/api/students"
      );
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const addStudent = (newStudent) => {
    setStudents((prev) => [...prev, newStudent]);
  };

  const deleteStudent = async (id) => {
    try {
      await axios.delete(`https://sms-2-ho50.onrender.com/api/students/${id}`);
      setStudents((prev) => prev.filter((student) => student._id !== id));
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  return (
    <StudentContext.Provider value={{ students, addStudent, deleteStudent }}>
      {children}
    </StudentContext.Provider>
  );
};
