import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app, db) {
  const dao = EnrollmentsDao(db);

  const requireUser = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return null;
    }
    return currentUser;
  };

  const findMyEnrollments = (req, res) => {
    const currentUser = requireUser(req, res);
    if (!currentUser) return;
    const enrollments = dao.findEnrollmentsForUser(currentUser._id);
    res.json(enrollments);
  };

  const enrollInCourse = (req, res) => {
    const currentUser = requireUser(req, res);
    if (!currentUser) return;
    const { courseId } = req.params;
    const enrollment = dao.enrollUserInCourse(currentUser._id, courseId);
    res.json(enrollment);
  };

  const unenrollFromCourse = (req, res) => {
    const currentUser = requireUser(req, res);
    if (!currentUser) return;
    const { courseId } = req.params;
    dao.unenrollUserFromCourse(currentUser._id, courseId);
    res.sendStatus(200);
  };

  app.get("/api/users/current/enrollments", findMyEnrollments);
  app.post("/api/users/current/courses/:courseId/enroll", enrollInCourse);
  app.delete("/api/users/current/courses/:courseId/enroll", unenrollFromCourse);
}
