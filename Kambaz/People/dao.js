import { v4 as uuidv4 } from "uuid";

export default function PeopleDao(db) {
  const findPeopleForCourse = (courseId) => {
    const { users, enrollments } = db;
    const enrolledUserIds = enrollments
      .filter((e) => String(e.course) === String(courseId))
      .map((e) => e.user);

    return users.filter((u) => enrolledUserIds.includes(u._id));
  };

  const createUserForCourse = (courseId, user) => {
    const newUser = {
      _id: uuidv4(),
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      loginId: user.loginId || "",
      section: user.section || "",
      role: user.role || "STUDENT",
      lastActivity: user.lastActivity || "—",
      totalActivity: user.totalActivity || "—",
    };

    db.users = [...db.users, newUser];
    db.enrollments = [
      ...db.enrollments,
      { _id: uuidv4(), user: newUser._id, course: courseId },
    ];

    return newUser;
  };

  const updateUserInCourse = (courseId, userId, updates) => {
    const { users } = db;
    const user = users.find((u) => u._id === userId);
    if (!user) return null;
    Object.assign(user, updates);
    return user;
  };

  const deleteUserFromCourse = (courseId, userId) => {
    const { enrollments } = db;
    db.enrollments = enrollments.filter(
      (e) =>
        !(String(e.course) === String(courseId) && String(e.user) === userId)
    );
    return { status: "ok" };
  };

  return {
    findPeopleForCourse,
    createUserForCourse,
    updateUserInCourse,
    deleteUserFromCourse,
  };
}
