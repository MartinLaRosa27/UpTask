const Participant = require("../models/Participant");
const Project = require("../models/Project");
const shortid = require("shortid");
const { QueryTypes } = require("sequelize");

// ---------------------------------------------------------------------------
module.exports.postParticipant = async (input, user) => {
  const { userId, projectId } = input;
  if (user) {
    try {
      const project = await Project.findOne({
        where: {
          _id: projectId,
        },
      });
      if (project.userId === user._id) {
        const participant = await Participant.create({
          _id: shortid.generate(),
          userId,
          projectId,
        });
        return participant;
      } else {
        throw new Error(
          "Only project administrators can add new participants to the project"
        );
      }
    } catch (e) {
      console.log(e);
      throw new Error("Failed to register the new participant to the project");
    }
  } else {
    throw new Error("session expired");
  }
};

// ---------------------------------------------------------------------------
module.exports.getParticipants = async (projectId, user) => {
  if (user) {
    try {
      const participants = await Participant.sequelize.query(
        `SELECT DISTINCT u._id AS "_id", u.username AS userId, pp.name AS projectId
          FROM participants AS p
          INNER JOIN projects AS pp ON pp._id = p.projectId
          INNER JOIN users AS u ON u._id = p.userId OR pp.userId = u._id
          WHERE pp._id = "${projectId}";`,
        {
          type: QueryTypes.SELECT,
        }
      );
      return participants;
    } catch (e) {
      console.log(e);
      throw new Error("Could not get the participants of the project");
    }
  } else {
    throw new Error("session expired");
  }
};

// ---------------------------------------------------------------------------
module.exports.deleteParticipant = async (userId, projectId, user) => {
  if (user) {
    try {
      const project = await Project.findOne({
        where: {
          _id: projectId,
        },
      });
      if (project.userId === user._id) {
        const participant = await Participant.destroy({
          where: {
            userId,
            projectId,
          },
        });
        return participant;
      } else {
        throw new Error(
          "Only project administrators can delete the the project"
        );
      }
    } catch (e) {
      console.log(e);
      throw new Error("The project participant could not be removed");
    }
  } else {
    throw new Error("session expired");
  }
};

// ---------------------------------------------------------------------------
module.exports.leaveProject = async (projectId, user) => {
  if (user) {
    try {
      const participant = await Participant.destroy({
        where: {
          userId: user._id,
          projectId,
        },
      });
      return participant;
    } catch (e) {
      console.log(e);
      throw new Error("The project participant could not be removed");
    }
  } else {
    throw new Error("session expired");
  }
};
