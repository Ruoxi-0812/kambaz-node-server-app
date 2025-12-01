import AssignmentsDao from "./dao.js";

export default function AssignmentsRoutes(app, db) {
  const dao = AssignmentsDao(db);

  const findAssignmentsForCourse = async (req, res) => {
    const { courseId } = req.params;
    try {
      const assignments = await dao.findAssignmentsForCourse(courseId);
      res.json(assignments);
    } catch (e) {
      console.error("Failed to find assignments for course", e);
      res.sendStatus(500);
    }
  };

  const findAssignmentById = async (req, res) => {
    const { assignmentId } = req.params;
    try {
      const assignment = await dao.findAssignmentById(assignmentId);
      if (!assignment) {
        res.sendStatus(404);
        return;
      }
      res.json(assignment);
    } catch (e) {
      console.error("Failed to find assignment by id", e);
      res.sendStatus(500);
    }
  };

  const createAssignmentForCourse = async (req, res) => {
    const { courseId } = req.params;
    try {
      const assignment = { ...req.body, course: courseId };
      const newAssignment = await dao.createAssignment(assignment);
      res.json(newAssignment);
    } catch (e) {
      console.error("Failed to create assignment", e);
      res.sendStatus(500);
    }
  };

  const updateAssignment = async (req, res) => {
    const { assignmentId } = req.params;
    const assignmentUpdates = req.body;
    try {
      const updated = await dao.updateAssignment(
        assignmentId,
        assignmentUpdates
      );
      if (!updated) {
        res.sendStatus(404);
        return;
      }
      res.json(updated);
    } catch (e) {
      console.error("Failed to update assignment", e);
      res.sendStatus(500);
    }
  };
  
  const deleteAssignment = async (req, res) => {
    const { assignmentId } = req.params;
    try {
      const status = await dao.deleteAssignment(assignmentId);
      res.json(status);
    } catch (e) {
      console.error("Failed to delete assignment", e);
      res.sendStatus(500);
    }
  };

  app.get("/api/courses/:courseId/assignments", findAssignmentsForCourse);
  app.post("/api/courses/:courseId/assignments", createAssignmentForCourse);
  app.get("/api/assignments/:assignmentId", findAssignmentById);
  app.put("/api/assignments/:assignmentId", updateAssignment);
  app.delete("/api/assignments/:assignmentId", deleteAssignment);
}
