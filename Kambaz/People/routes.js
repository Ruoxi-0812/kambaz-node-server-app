import PeopleDao from "./dao.js";

export default function PeopleRoutes(app, db) {
  const dao = PeopleDao(db);

  const findPeopleForCourse = (req, res) => {
    const { courseId } = req.params;
    const people = dao.findPeopleForCourse(courseId);
    res.json(people);
  };

  const createUserForCourse = (req, res) => {
    const { courseId } = req.params;
    const user = req.body;
    const newUser = dao.createUserForCourse(courseId, user);
    res.json(newUser);
  };

  const updateUserInCourse = (req, res) => {
    const { courseId, userId } = req.params;
    const updates = req.body;
    const updated = dao.updateUserInCourse(courseId, userId, updates);
    if (!updated) {
      res.sendStatus(404);
    } else {
      res.json(updated);
    }
  };
  
  const deleteUserFromCourse = (req, res) => {
    const { courseId, userId } = req.params;
    const status = dao.deleteUserFromCourse(courseId, userId);
    res.json(status);
  };

  app.get("/api/courses/:courseId/people", findPeopleForCourse);
  app.post("/api/courses/:courseId/people", createUserForCourse);
  app.put("/api/courses/:courseId/people/:userId", updateUserInCourse);
  app.delete("/api/courses/:courseId/people/:userId", deleteUserFromCourse);
}
