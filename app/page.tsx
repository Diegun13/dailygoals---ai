"use client";

import React, { useState } from "react";
import Employee from "./Employee";

interface EmployeeData {
  id: number;
  workedMinutes: number;
}

export default function App() {
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [employees, setEmployees] = useState<EmployeeData[]>([]);
  const [salesGoal, setSalesGoal] = useState(1000); // Example sales goal
  const [piercingGoal, setPiercingGoal] = useState(50); // Example piercing goal

  // Function to update an employee's worked minutes
  const updateEmployeeTime = (id: number, minutes: number) => {
    setEmployees((prev) => {
      const employeeIndex = prev.findIndex((emp) => emp.id === id);
      if (employeeIndex !== -1) {
        const updatedEmployees = [...prev];
        const currentMinutes = updatedEmployees[employeeIndex].workedMinutes;
        updatedEmployees[employeeIndex].workedMinutes = minutes;

        // Update the total minutes
        setTotalMinutes((prevTotal) => prevTotal - currentMinutes + minutes);
        return updatedEmployees;
      }
      return prev;
    });
  };

  // Function to add a new employee
  const addEmployee = () => {
    const newId = employees.length + 1;
    setEmployees((prev) => [...prev, { id: newId, workedMinutes: 0 }]);
  };

  // Calculate proportional sales and piercing goals
  const calculateProportionalGoals = (workedMinutes: number) => {
    if (totalMinutes === 0) return { sales: 0, piercing: 0 };

    const percentage = workedMinutes / totalMinutes;
    return {
      sales: Math.round(salesGoal * percentage),
      piercing: Math.round(piercingGoal * percentage),
    };
  };

  // Convert minutes to hours and minutes
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours} hr ${remainingMinutes} min`;
  };

  return (
    <>
      <div className="flex-col text-center">
        <h1 className="">Daily Goals</h1>
        <div>
          <label>
            Sales Goal:{" "}
            <input
              type="number"
              value={salesGoal}
              onChange={(e) => setSalesGoal(Number(e.target.value))}
            />
          </label>
          
          <label>
            Piercing Goal:{" "}
            <input
              type="number"
              value={piercingGoal}
              onChange={(e) => setPiercingGoal(Number(e.target.value))}
            />
          </label>
        </div>
        <h2>Total Hours Worked</h2>
        <p>
          {Math.floor(totalMinutes / 60)} hr {totalMinutes % 60} min
        </p>
        <h2>Employees</h2>
        {employees.map((employee) => {
          const goals = calculateProportionalGoals(employee.workedMinutes);
          return (
            <div key={employee.id}>
              <Employee
                id={employee.id}
                updateEmployeeTime={updateEmployeeTime}
              />
              <p>
                Worked Time: {formatTime(employee.workedMinutes)} <br />
                Sales Goal: ${goals.sales}, Piercing Goal: {goals.piercing}
              </p>
            </div>
          );
        })}
        <button className="bg-slate-600 rounded-md hover:bg-green-600" onClick={addEmployee}>Add Employee</button>
      </div>
    </>
  );
}
