require("dotenv").config({ path: ".env" });
const { ApolloServer } = require("apollo-server");
const { typeDefs } = require("./graphql/schema");
const { resolvers } = require("./graphql/resolvers");
const { DBConnection } = require("./config/DBConnection");
const { auth } = require("./middleware/auth");

DBConnection();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const user = auth(req.headers.authorization);
    return {
      user,
    };
  },
});

server.listen().then(({ url }) => {
  console.log(`The server is running in the URL ${url}`);
});
