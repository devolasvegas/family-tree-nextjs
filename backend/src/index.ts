import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { readFileSync } from "fs";

import "dotenv/config";

import resolvers from "./schema/resolvers.js";

const typeDefs = readFileSync("./src/schema/schema.graphql", {
  encoding: "utf-8",
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: {
    host: "::",
    port: process.env.PORT ? parseInt(process.env.PORT) : 4000,
  },
});

console.log(`🚀  Server ready at: ${url}`);
