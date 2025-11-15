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
    const newUser = dao.createUserForCourse(courseId, req.body);
    res.json(newUser);
  };

  const updateUserInCourse = (req, res) => {
    const { courseId, userId } = req.params;
    const updated = dao.updateUserInCourse(courseId, userId, req.body);
    if (!updated) {
      res.sendStatus(404);
    } else {
      res.json(updated);
    }
  };

  const deleteUserFromCourse = (req, res) => {
    const { courseId, userId } = req.params;
    dao.deleteUserFromCourse(courseId, userId);
    res.sendStatus(200);
  };

  app.get("/api/courses/:courseId/people", findPeopleForCourse);
  app.post("/api/courses/:courseId/people", createUserForCourse);
  app.put("/api/courses/:courseId/people/:userId", updateUserInCourse);
  app.delete("/api/courses/:courseId/people/:userId", deleteUserFromCourse);
}
