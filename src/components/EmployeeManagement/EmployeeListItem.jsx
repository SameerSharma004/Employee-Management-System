import React from "react";

const EmployeeListItem = ({ employee, onEdit, onDelete }) => {
  const formatSalary = (salary) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(salary);
  };

  return (
    <div className="grid grid-cols-2  md:grid-cols-4 gap-4 items-center p-4 border-b border-gray-200 hover:bg-gray-50">
      <div>
        <div className="md:hidden text-xs font-bold text-gray-500 uppercase">
          ID
        </div>
        <div className="text-sm font-mono text-gray-700">
          {employee.employeeId}
        </div>
      </div>
      <div>
        <div className="md:hidden text-xs font-bold text-gray-500 uppercase">
          Name
        </div>
        <div className="font-medium text-gray-900">{employee.employeeName}</div>
      </div>
      <div>
        <div className="md:hidden text-xs font-bold text-gray-500 uppercase">
          Salary
        </div>
        <div className="text-green-600 font-semibold">
          {formatSalary(employee.employeeSalary)}
        </div>
      </div>
      <div className="flex justify-start md:justify-end space-x-3">
        <button
          onClick={() => onEdit(employee)}
          className="px-3 py-1 text-sm font-medium text-indigo-600 bg-indigo-100 rounded-md hover:bg-indigo-200"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(employee._id)}
          className="px-3 py-1 text-sm font-medium text-red-600 bg-red-100 rounded-md hover:bg-red-200"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default EmployeeListItem;
