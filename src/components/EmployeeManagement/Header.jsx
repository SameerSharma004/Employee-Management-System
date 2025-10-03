const Header = ({ onAddEmployee, onSearch }) => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between pb-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
        Employee Dashboard
      </h1>
      <div className="flex items-center space-x-4 w-full md:w-auto">
        <input
          type="text"
          placeholder="Search by name..."
          onChange={(e) => onSearch(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-200"
        />
        <button
          onClick={onAddEmployee}
          className="px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 whitespace-nowrap"
        >
          + Add Employee
        </button>
      </div>
    </div>
  );
};

export default Header;
