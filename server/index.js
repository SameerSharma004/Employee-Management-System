const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 5000;

const app = express();
app.use(cors());
app.use(express.json());

async function connectDB() {
  try {
    await mongoose.connect("mongodb://localhost:27017/company");
    console.log("mongoDB connected");
  } catch (error) {
    console.error("MongoDB connecton failed:", error);
    process.exit(1);
  }
}
connectDB();

const EmployeeSchema = new mongoose.Schema({
  employeeId: { type: Number, unique: true },
  employeeName: { type: String, required: true },
  employeeSalary: { type: Number, required: true },
});

const Employee = mongoose.model("Employee", EmployeeSchema);


app.post("/api/login", (req, res) => {
  if (req.body.username === "123" && req.body.password === "123") {
    res.json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

app.get("/api/employees", async (req, res) => {
  try {
    const { search } = req.query;
    let query = {};
    if (search) {
      query = { employeeName: { $regex: search, $options: "i" } };
    }
    const employees = await Employee.find(query);
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch employees", error });
  }
});


app.post("/api/employees", async (req, res) => {
  try {
    const newEmployee = new Employee(req.body);
    const savedEmployee = await newEmployee.save();
    res.status(201).json(savedEmployee);
  } catch (error) {
    console.error("Error creating employee:", error);
    res
      .status(400)
      .json({ message: "Failed to create employee", error: error.message });
  }
});


app.put("/api/employees/:id", async (req, res) => {
  const updatedEmployee = await Employee.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updatedEmployee);
});


app.delete("/api/employees/:id", async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.status(204).send();
});


app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});