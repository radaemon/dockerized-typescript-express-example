// Web server
const express = require('express');
// GraphQL
const { graphqlHTTP } = require('express-graphql');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const typeDefs = require('./graphql/types');
const resolvers = require('./graphql/resolvers');

// GraphQL Endpoint MW
const app = express();
app.use(
  '/graphql',
  graphqlHTTP({
    schema: makeExecutableSchema({ typeDefs, resolvers }),
    graphiql: true,
  })
);

// Start the server
app.listen(process.env.PORT, () => {
  console.log('Server Running');
});
