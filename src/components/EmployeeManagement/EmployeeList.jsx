import React from "react";
import EmployeeListItem from "./EmployeeListItem";

const EmployeeList = ({ employees, onEdit, onDelete }) => {
  if (!employees) {
    return (
      <p className="text-center text-gray-500 mt-8">
        No employees found. Add one to get started!
      </p>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md mt-6">
      <div className="hidden md:grid grid-cols-4 gap-4 p-4 border-b-2 border-gray-200 bg-gray-50 rounded-t-lg">
        <h3 className="font-bold text-xs text-gray-500 uppercase tracking-wider">
          Employee ID
        </h3>
        <h3 className="font-bold text-xs text-gray-500 uppercase tracking-wider">
          Name
        </h3>
        <h3 className="font-bold text-xs text-gray-500 uppercase tracking-wider">
          Salary
        </h3>
        <h3 className="font-bold text-xs text-gray-500 uppercase tracking-wider text-right">
          Actions
        </h3>
      </div>
      <div>
        {employees.map((employee) => (
          <EmployeeListItem
            key={employee._id}
            employee={employee}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default EmployeeList;
