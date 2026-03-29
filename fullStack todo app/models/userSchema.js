import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  task: {
    type: String,
  },
  dueDate: {
    type: String,
  },
  status: {
    type: String,
  },
  priority: {
    type: String,
  },
});


const UserModal = mongoose.model("Task", userSchema);

export default UserModal;
