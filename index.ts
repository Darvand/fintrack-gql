import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { loadFiles } from "@graphql-tools/load-files";

const transactions = [
  {
    source: "PriceSmart",
    value: -900000,
    date: "2022-05-11",
    paymentMethod: "CREDIT",
    category: "GROCERIES",
    details: [],
  },
];

(async () => {
  // Resolvers define how to fetch the types defined in your schema.
  // This resolver retrieves books from the "books" array above.
  const resolvers = {
    Query: {
      getTransactions: () => transactions,
    },
  };

  // The ApolloServer constructor requires two parameters: your schema
  // definition and your set of resolvers.
  const server = new ApolloServer({
    typeDefs: await loadFiles("./src/**/*.graphql"),
    resolvers,
    introspection: true,
  });

  // Passing an ApolloServer instance to the `startStandaloneServer` function:
  //  1. creates an Express app
  //  2. installs your ApolloServer instance as middleware
  //  3. prepares your app to handle incoming requests
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀  Server ready at: ${url}`);
})();
