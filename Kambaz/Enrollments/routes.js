import EnrollmentsDao from "./dao.js";
import model from "./model.js";

export default function EnrollmentsRoutes(app, db) {
  const dao = EnrollmentsDao(db);

  app.get("/api/users/:uid/enrollments", async (req, res) => {
    const { uid } = req.params;
    const mine = await model.find({ user: uid });
    res.json(mine);
  });

  app.post("/api/enrollments", async (req, res) => {
    const { user, course } = req.body;
    const created = await dao.enrollUserInCourse(user, course);
    res.json(created);
  });
  
  app.delete("/api/users/:uid/enrollments/:cid", async (req, res) => {
    const { uid, cid } = req.params;
    await dao.unenrollUserFromCourse(uid, cid);
    res.sendStatus(200);
  });
}
