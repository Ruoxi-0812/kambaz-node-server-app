import { v4 as uuidv4 } from "uuid";

export default function EnrollmentsDao(db) {
  function enrollUserInCourse(userId, courseId) {
    const enrollment = {
      _id: uuidv4(),
      user: userId,
      course: courseId,
    };
    db.enrollments.push(enrollment);
    return enrollment;
  }

  return {
    enrollUserInCourse,
  };
}