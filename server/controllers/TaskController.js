const Task = require("../models/Task");
const shortid = require("shortid");
const { QueryTypes } = require("sequelize");

// ---------------------------------------------------------------------------
module.exports.postTask = async (input, user) => {
  const { description, projectId } = input;
  if (user) {
    try {
      const task = await Task.create({
        _id: shortid.generate(),
        description,
        projectId,
        userId: user._id,
        completed: 0,
      });
      return task;
    } catch (e) {
      console.log(e);
      throw new Error("Failed to register the task");
    }
  } else {
    throw new Error("session expired");
  }
};

// ---------------------------------------------------------------------------
module.exports.getProjectTask = async (projectId, user) => {
  if (user) {
    try {
      const tasks = await Task.findAll({
        where: {
          projectId,
        },
        order: [["createdAt", "DESC"]],
      });
      return tasks;
    } catch (e) {
      console.log(e);
      throw new Error("Failed to get all the project tasks");
    }
  } else {
    throw new Error("session expired");
  }
};

// ---------------------------------------------------------------------------
module.exports.updateTask = async (taskId, user) => {
  if (user) {
    try {
      const task = await Task.findOne({
        where: {
          _id: taskId,
        },
      });
      if (task.completed) {
        await Task.sequelize.query(
          `UPDATE tasks SET completed=0
          WHERE _id='${task._id}';`,
          {
            type: QueryTypes.UPDATE,
          }
        );
      } else {
        await Task.sequelize.query(
          `UPDATE tasks SET completed=1
          WHERE _id='${task._id}';`,
          {
            type: QueryTypes.UPDATE,
          }
        );
      }
      return task;
    } catch (e) {
      console.log(e);
      throw new Error("The task status could not be modified");
    }
  } else {
    throw new Error("session expired");
  }
};

// ---------------------------------------------------------------------------
module.exports.deleteTask = async (taskId, user) => {
  if (user) {
    try {
      let task = await Task.destroy({
        where: {
          _id: taskId,
        },
      });
      return task;
    } catch (e) {
      console.log(e);
      throw new Error("Failed to delete the task");
    }
  } else {
    throw new Error("session expired");
  }
};
