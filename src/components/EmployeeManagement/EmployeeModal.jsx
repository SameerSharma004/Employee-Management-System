import { useState, useEffect } from "react";

const EmployeeModal = ({ isOpen, onClose, onSave, employee }) => {
  const [formData, setFormData] = useState({
    employeeId: "",
    employeeName: "",
    employeeSalary: "",
  });

  useEffect(() => {
    if (isOpen) {
      if (employee) {
        setFormData({
          employeeId: employee.employeeId || "",
          employeeName: employee.employeeName || "",
          employeeSalary: employee.employeeSalary || "",
        });
      } else {
        setFormData({ employeeId: "", employeeName: "", employeeSalary: "" });
      }
    }
  }, [employee, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const processedData = {
      ...formData,
      employeeId: formData.employeeId ? Number(formData.employeeId) : null,
      employeeSalary: Number(formData.employeeSalary),
    };
    onSave(processedData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6">
          {employee ? "Edit Employee" : "Add New Employee"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Employee ID
            </label>
            <input
              type="text"
              name="employeeId"
              value={formData.employeeId}
              onChange={handleChange}
              disabled={!!employee} // editable only when adding new employee
              className="mt-1 w-full p-2 border border-gray-300 rounded-md disabled:bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="employeeName"
              value={formData.employeeName}
              onChange={handleChange}
              required
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Salary
            </label>
            <input
              type="number"
              name="employeeSalary"
              value={formData.employeeSalary}
              onChange={handleChange}
              required
              className="mt-1 w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeModal;
