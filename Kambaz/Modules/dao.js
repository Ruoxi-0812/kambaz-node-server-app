import { v4 as uuidv4 } from "uuid";
import courseModel from "../Courses/model.js";

export default function ModulesDao(db) {
  // 6.4.2.2 
  async function findModulesForCourse(courseId) {
    const course = await courseModel.findById(courseId);
    return course?.modules || [];
  }

  // 6.4.2.3 
  async function createModule(courseId, module) {
    const newModule = { ...module, _id: uuidv4() };
    await courseModel.updateOne(
      { _id: courseId },
      { $push: { modules: newModule } }
    );
    return newModule;
  }

  // 6.4.2.4 
  async function deleteModule(courseId, moduleId) {
    const status = await courseModel.updateOne(
      { _id: courseId },
      { $pull: { modules: { _id: moduleId } } }
    );
    return status;
  }

  // 6.4.2.5 
  async function updateModule(courseId, moduleId, moduleUpdates) {
    const course = await courseModel.findById(courseId);
    if (!course) return null;
    const module = course.modules.id(moduleId);
    if (!module) return null;

    Object.assign(module, moduleUpdates);
    await course.save();
    return module;
  }

  return {
    findModulesForCourse,
    createModule,
    deleteModule,
    updateModule,
  };
}
