const Employee = require("../models/Employee");
const User = require("../models/User");

const resolvers = {
  Query: {
    getEmployees: async () => {
      return await Employee.find({});
    },
    getEmployeeByID: async (parent, args) => {
      return await Employee.findById(args._id);
    },
    login: async (parent, args) => {
      const { username, email, password } = args;
      const user = await User.findOne({
        $or: [{ username: email }, { email: email }],
      });

      if (!user) {
        throw new Error("User not found");
      }

      if (password !== user.password) {
        throw new Error("Invalid password");
      }

      return user;
    },
  },

  Mutation: {
    signup: async (parent, args) => {
      const { username, email, password } = args;
      const newUser = new User({
        username: username,
        email: email,
        password: password,
      });
      try {
        await newUser.save();
        return newUser;
      } catch (err) {
        throw new Error("Username or email already exists");
      }
    },
    addEmployee: async (parent, args) => {
      const { first_name, last_name, email, gender, salary } = args;

      const newEmployee = new Employee({
        first_name: first_name,
        last_name: last_name,
        email: email,
        gender: gender,
        salary: salary,
      });

      return await newEmployee.save();
    },
    updateEmployee: async (parent, args) => {
      const { _id, first_name, last_name, email, gender, salary } = args;

      const existingEmployee = await Employee.findById(_id);
      if (!existingEmployee) {
        throw new Error("Employee not found");
      }

      return await Employee.findByIdAndUpdate(
        _id,
        {
          first_name: first_name,
          last_name: last_name,
          email: email,
          gender: gender,
          salary: salary,
        },
        { new: true }
      );
    },
    deleteEmployee: async (_, { _id }) => {
      const employee = await Employee.findById(_id);
      if (!employee) {
        throw new Error("Employee not found");
      }
      return employee.findByIdAndDelete(_id);
    },
  },
};

module.exports = resolvers;
