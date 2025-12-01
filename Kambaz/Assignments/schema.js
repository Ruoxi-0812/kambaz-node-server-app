import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    _id: String, 
    course: {
      type: String,
      ref: "CourseModel", 
      required: true,
    },
    title: String,
    description: String,
    points: Number,

    group: String,
    displayGradeAs: String,
    submissionType: String,
    onlineEntryOptions: [String],
    assignTo: String,

    due: String,
    availableFrom: String,
    availableUntil: String,
  },
  { collection: "assignments" }
);

export default assignmentSchema;
