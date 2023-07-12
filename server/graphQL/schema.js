const { gql } = require("apollo-server");

module.exports.typeDefs = gql`
  input userInput {
    username: String!
    password: String
    country: String
  }

  input projectInput {
    name: String!
    categoryId: String!
  }

  input taskInput {
    description: String!
    projectId: String!
  }

  input participantInput {
    userId: String!
    projectId: String!
  }

  type userType {
    _id: String
    username: String
    country: String
    img: String
  }

  type projectType {
    _id: String
    name: String
    userId: String
    categoryId: String
  }

  type categoryType {
    _id: String
    name: String
  }

  type countryType {
    _id: String
    country_name: String
    country_code: String
    phone_code: String
  }

  type taskType {
    _id: String
    description: String
    userId: String
    projectId: String
    completed: Boolean
  }

  type participantType {
    _id: String
    projectId: String
    userId: String
  }

  type Query {
    auth(token: String): userType
    userAuthentication(input: userInput): String
    getAllCategories: [categoryType]
    getAllCountries: [countryType]
    getUserProjects: [projectType]
    getProjectById(id: String): projectType
    getProjectTask(projectId: String): [taskType]
    getUserByUsername(username: String, projectId: String): [userType]
    getParticipants(projectId: String): [participantType]
  }

  type Mutation {
    postUser(input: userInput): String
    postProject(input: projectInput): projectType
    postTask(input: taskInput): taskType
    postParticipant(input: participantInput): participantType
    patchUser(input: userInput): String
    updateTask(taskId: String): taskType
    deleteProject(id: String): projectType
    deleteTask(taskId: String): taskType
    deleteParticipant(userId: String, projectId: String): participantType
    leaveProject(projectId: String): participantType
  }
`;
