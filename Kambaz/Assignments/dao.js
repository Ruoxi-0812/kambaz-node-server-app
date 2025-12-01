import { v4 as uuidv4 } from "uuid";
import model from "./model.js";

export default function AssignmentsDao(db) {
  async function findAssignmentsForCourse(courseId) {
    return model.find({ course: courseId });
  }

  async function findAssignmentById(assignmentId) {
    return model.findById(assignmentId);
  }

  async function createAssignment(assignment) {
    const newAssignment = {
      ...assignment,
      _id: assignment._id && assignment._id !== "" ? assignment._id : uuidv4(),
    };
    const created = await model.create(newAssignment);
    return created;
  }

  async function updateAssignment(assignmentId, assignmentUpdates) {
    const updated = await model.findByIdAndUpdate(
      assignmentId,
      assignmentUpdates,
      { new: true }
    );
    return updated; 
  }
  
  async function deleteAssignment(assignmentId) {
    const status = await model.deleteOne({ _id: assignmentId });
    return status;
  }

  return {
    findAssignmentsForCourse,
    findAssignmentById,
    createAssignment,
    updateAssignment,
    deleteAssignment,
  };
}
