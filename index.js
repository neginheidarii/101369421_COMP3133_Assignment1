const mongoose = require("mongoose");
const express = require("express");
const typeDefs = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");
const { ApolloServer } = require("apollo-server-express");

async function startServer() {
  const app = express();
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app, path: "/graphql" });

  const DB_USER = "neginDb";
  const DB_USER_PASSWORD = "nLVZd9xMAyuTNgyQ";
  const DB_CLUSTER = "cluster0.tgc1gdl.mongodb.net";
  const DB_NAME = "Comp3133_Assignment1";
  const mongodb_atlas_url = `mongodb+srv://${DB_USER}:${DB_USER_PASSWORD}@${DB_CLUSTER}/${DB_NAME}?retryWrites=true&w=majority`;
  await mongoose
    .connect(mongodb_atlas_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((success) => {
      console.log("Success Mongodb connection");
    })
    .catch((err) => {
      console.log("Error Mongodb connection");
    });

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(
      `Server running on http://localhost:${PORT}${apolloServer.graphqlPath}`
    );
  });
}

startServer();
