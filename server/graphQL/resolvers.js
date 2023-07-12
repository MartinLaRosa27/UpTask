const {
  postUser,
  userAuthentication,
  patchUser,
  getUserByUsername,
} = require("../controllers/userController");
const { getAllCategories } = require("../controllers/categoryController");
const { getAllCountries } = require("../controllers/countryController");
const {
  postProject,
  getUserProjects,
  getProjectById,
  deleteProject,
} = require("../controllers/projectController");
const {
  postTask,
  getProjectTask,
  updateTask,
  deleteTask,
} = require("../controllers/TaskController");
const {
  postParticipant,
  getParticipants,
  deleteParticipant,
  leaveProject,
} = require("../controllers/participantController");
const { auth } = require("../middleware/auth");

module.exports.resolvers = {
  Query: {
    // Auth:
    auth: (root, { token }, context) => {
      return auth(token);
    },

    // User:
    userAuthentication: (root, { input }, context) => {
      return userAuthentication(input);
    },

    getUserByUsername: (root, { username, projectId }, context) => {
      return getUserByUsername(username, projectId, context.user);
    },

    // Category:
    getAllCategories: (root, {}, context) => {
      return getAllCategories();
    },

    // Country:
    getAllCountries: (root, {}, context) => {
      return getAllCountries();
    },

    // Project:
    getUserProjects: (root, {}, context) => {
      return getUserProjects(context.user);
    },

    getProjectById: (root, { id }, context) => {
      return getProjectById(id, context.user);
    },

    // Task:
    getProjectTask: (root, { projectId }, context) => {
      return getProjectTask(projectId, context.user);
    },

    // Participants:
    getParticipants: (root, { projectId }, context) => {
      return getParticipants(projectId, context.user);
    },
  },

  Mutation: {
    // User:
    postUser: (root, { input }, context) => {
      return postUser(input);
    },

    patchUser: (root, { input }, context) => {
      return patchUser(input, context.user);
    },

    // Project:
    postProject: (root, { input }, context) => {
      return postProject(input, context.user);
    },

    deleteProject: (root, { id }, context) => {
      return deleteProject(id, context.user);
    },

    // Task:
    postTask: (root, { input }, context) => {
      return postTask(input, context.user);
    },

    updateTask: (root, { taskId }, context) => {
      return updateTask(taskId, context.user);
    },

    deleteTask: (root, { taskId }, context) => {
      return deleteTask(taskId, context.user);
    },

    // Participant:
    postParticipant: (root, { input }, context) => {
      return postParticipant(input, context.user);
    },

    deleteParticipant: (root, { userId, projectId }, context) => {
      return deleteParticipant(userId, projectId, context.user);
    },

    leaveProject: (root, { projectId }, context) => {
      return leaveProject(projectId, context.user);
    },
  },
};
