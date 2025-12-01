import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export default function CoursesDao(db) {
  // 6.4.1.1 
  function findAllCourses() {
    return model.find({}, { name: 1, description: 1, image: 1 });
  }

  // 6.4.1.1 
  async function findCoursesForEnrolledUser(userId) {
    const { enrollments } = db;
    const courses = await model.find({}, { name: 1, description: 1, image: 1 });

    const enrolledCourses = courses.filter((course) =>
      enrollments.some(
        (enrollment) =>
          enrollment.user === userId && enrollment.course === course._id
      )
    );
    return enrolledCourses;
  }

  // 6.4.1.2 
  function createCourse(course) {
    const newCourse = { ...course, _id: uuidv4() };
    return model.create(newCourse);
  }

  // 6.4.1.3
  function deleteCourse(courseId) {
    const { enrollments } = db;
    db.enrollments = enrollments.filter(
      (enrollment) => enrollment.course !== courseId
    );
    return model.deleteOne({ _id: courseId });
  }

  // 6.4.1.4 
  function updateCourse(courseId, courseUpdates) {
    const { _id, ...rest } = courseUpdates;

    return model.findByIdAndUpdate(courseId, rest, { new: true });
  }

  return {
    findAllCourses,
    findCoursesForEnrolledUser,
    createCourse,
    deleteCourse,
    updateCourse,
  };
}
