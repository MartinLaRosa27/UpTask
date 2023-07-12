const Project = require("../models/Project");
const Category = require("../models/Category");
const shortid = require("shortid");
const { QueryTypes } = require("sequelize");

// ---------------------------------------------------------------------------
module.exports.postProject = async (input, user) => {
  const { name, categoryId } = input;
  if (user) {
    try {
      const project = await Project.create({
        _id: shortid.generate(),
        name,
        categoryId,
        userId: user._id,
      });
      return project;
    } catch (e) {
      console.log(e);
      throw new Error("Failed to register the project");
    }
  } else {
    throw new Error("session expired");
  }
};

// ---------------------------------------------------------------------------
module.exports.getUserProjects = async (user) => {
  if (user) {
    try {
      const projects = await Project.sequelize.query(
        `SELECT DISTINCT p._id AS "_id", p.name AS "name", p.userId AS "userId", p.categoryId AS "categoryId"
        FROM projects AS p
        LEFT OUTER JOIN participants AS pp ON pp.projectId = p._id
        WHERE p.userId = "${user._id}" OR pp.userId = "${user._id}";`,
        {
          type: QueryTypes.SELECT,
        }
      );
      return projects;
    } catch (e) {
      console.log(e);
      throw new Error("Failed to get all the user projects");
    }
  } else {
    throw new Error("session expired");
  }
};

// ---------------------------------------------------------------------------
module.exports.getProjectById = async (id, user) => {
  if (user) {
    try {
      let project = await Project.findOne({
        where: {
          _id: id,
          userId: user._id,
        },
      });
      if (!project) {
        project = await Project.sequelize.query(
          `SELECT p._id AS "_id", p.name AS "name", p.userId AS "userId", p.categoryId AS "categoryId"
          FROM projects AS p
          INNER JOIN participants AS pp ON pp.projectId = p._id
          WHERE pp.userId = "${user._id}" AND p._id = "${id}";`,
          {
            type: QueryTypes.SELECT,
          }
        );
        const categoryName = await Category.findOne({
          where: {
            _id: project[0].categoryId,
          },
        });
        project[0].categoryId = categoryName.name;
        return project[0];
      }
      const categoryName = await Category.findOne({
        where: {
          _id: project.categoryId,
        },
      });
      project.categoryId = categoryName.name;
      return project;
    } catch (e) {
      console.log(e);
      throw new Error("Failed to get the project information");
    }
  } else {
    throw new Error("session expired");
  }
};

// ---------------------------------------------------------------------------
module.exports.deleteProject = async (id, user) => {
  if (user) {
    try {
      const project = await Project.destroy({
        where: {
          _id: id,
          userId: user._id,
        },
      });
      return project;
    } catch (e) {
      console.log(e);
      throw new Error("Failed to delete the project");
    }
  } else {
    throw new Error("session expired");
  }
};
