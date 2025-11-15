import { v4 as uuidv4 } from "uuid";

export default function PeopleDao(db) {
  const findPeopleForCourse = (courseId) => {
    const { users, enrollments } = db;
    const enrolledUserIds = enrollments
      .filter((e) => e.course === courseId)
      .map((e) => e.user);
    return users.filter((u) => enrolledUserIds.includes(u._id));
  };

  const createUserForCourse = (courseId, user) => {
    const newUser = {
      _id: uuidv4(),
      firstName: user.firstName,
      lastName: user.lastName,
      loginId: user.loginId,
      section: user.section,
      role: user.role,
      lastActivity: user.lastActivity ?? "—",
      totalActivity: user.totalActivity ?? "—",
    };

    db.users.push(newUser);
    db.enrollments.push({
      _id: uuidv4(),
      user: newUser._id,
      course: courseId,
    });

    return newUser;
  };

  const updateUserInCourse = (courseId, userId, updates) => {
    const user = db.users.find((u) => u._id === userId);
    if (!user) return null;
    Object.assign(user, updates);
    return user;
  };
  
  const deleteUserFromCourse = (courseId, userId) => {
    db.users = db.users.filter((u) => u._id !== userId);
    db.enrollments = db.enrollments.filter(
      (e) => !(e.course === courseId && e.user === userId)
    );
  };

  return {
    findPeopleForCourse,
    createUserForCourse,
    updateUserInCourse,
    deleteUserFromCourse,
  };
}
