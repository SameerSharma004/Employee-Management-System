import { BrowserRouter, Routes, Route } from 'react-router-dom';

import AdminLogin from './components/AdminLogin';
import EmployeeDashboard from './components/EmployeeManagement/EmployeeDashboard';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<AdminLogin />} />
          <Route path="/dashboard" element={<EmployeeDashboard />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;