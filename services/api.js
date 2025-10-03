import axios from "axios";

const BASE_URL = "http://localhost:5000/api/employees";


export const getEmployees = async (search = "") => {
  const response = await axios.get(`${BASE_URL}?search=${search}`);
  return response.data;
};


export const addEmployee = async (employeeData) => {
  const response = await axios.post(BASE_URL, employeeData);
  return response.data;
};


export const updateEmployee = async (id, employeeData) => {
  const response = await axios.put(`${BASE_URL}/${id}`, employeeData);
  return response.data;
};


export const deleteEmployee = async (id) => {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response.data;
};
