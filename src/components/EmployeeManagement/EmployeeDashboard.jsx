import { useState, useEffect, useCallback } from "react";
import * as api from "../../../services/api";
import Header from "./Header";
import EmployeeList from "./EmployeeList";
import EmployeeModal from "./EmployeeModal";

const EmployeeDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchEmployees = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await api.getEmployees(searchTerm);
      setEmployees(data);
    } catch (err) {
      console.error("Failed to fetch employees:", err);
    } finally {
      setIsLoading(false);
    }
  }, [searchTerm]);

  useEffect(() => {
    const delay = setTimeout(fetchEmployees, 300);
    return () => clearTimeout(delay);
  }, [searchTerm, fetchEmployees]);

  const handleAdd = () => {
    setCurrentEmployee(null);
    setIsModalOpen(true);
  };

  const handleEdit = (employee) => {
    setCurrentEmployee(employee);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      try {
        await api.deleteEmployee(id);
        fetchEmployees();
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSave = async (employeeData) => {
    try {
      if (currentEmployee) {
        await api.updateEmployee(currentEmployee._id, employeeData);
      } else {
        const { _id, ...newEmployee } = employeeData;
        await api.addEmployee(newEmployee);
      }
      fetchEmployees();
    } catch (err) {
      console.error(err);
      alert(
        err.response?.data?.message ||
          "Failed to save employee. Employee ID must be unique."
      );
    } finally {
      setIsModalOpen(false);
      setCurrentEmployee(null); 
    }
  };

  const handleSearch = (term) => setSearchTerm(term);

  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        <Header onAddEmployee={handleAdd} onSearch={handleSearch} />
        {isLoading ? (
          <p className="text-center text-gray-500 mt-8">Loading employees...</p>
        ) : (
          <EmployeeList
            employees={employees}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
      <EmployeeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        employee={currentEmployee}
      />
    </div>
  );
};

export default EmployeeDashboard;
