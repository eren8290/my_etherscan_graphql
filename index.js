const { ApolloServer } = require("apollo-server");
const { importSchema } = require("graphql-import");
const EtherDataSource = require("./datasource/ethDatasource");
const typeDefs = importSchema("./schema.graphql"); 

// Import the ApolloServer, graphql-import, EtherDataSource, and schema

require("dotenv").config(); 

// Load environment variables from .env file

const resolvers = {
  Query: {
    getEthByAddress: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.etherBalanceByAddress(),
    getTotalSupplyEth: (root, _args, { dataSources }) =>  
      dataSources.ethDataSource.totalSupplyOfEther(),
    
    // Define resolvers for existing queries
    
    getEthPrice: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getLatestEthereumPrice(),
    
    // Resolver to get latest ETH price
    
    getEstimationTimePerTransaction: (root, _args, { dataSources }) =>
      dataSources.ethDataSource.getBlockConfirmationTime(),
    
    // Resolver to get estimated time per transaction

  },
};

// Define resolvers map

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    ethDataSource: new EtherDataSource(),
  }), 
});

// Create ApolloServer instance

server.timeout = 0;
server.listen("9000").then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

// Start ApolloServer on port 9000