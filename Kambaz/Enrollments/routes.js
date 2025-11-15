import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app, db) {
  const dao = EnrollmentsDao(db);

  app.get("/api/users/:uid/enrollments", (req, res) => {
    const { uid } = req.params;
    const mine = db.enrollments.filter((e) => e.user === uid);
    res.json(mine);
  });

  app.post("/api/enrollments", (req, res) => {
    const { user, course } = req.body;
    const created = dao.enrollUserInCourse(user, course);
    res.json(created);
  });

  app.delete("/api/users/:uid/enrollments/:cid", (req, res) => {
    const { uid, cid } = req.params;
    db.enrollments = db.enrollments.filter(
      (e) => !(e.user === uid && e.course === cid)
    );
    res.sendStatus(200);
  });
}
