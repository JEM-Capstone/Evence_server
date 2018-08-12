const graphql = require(`graphql`);
const { UserTopic, UserGroup, UserEvent } = require(`../db/index`);

const {
  GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLID, GraphQLInt,
} = graphql;

// /// QUERY TYPES ///// (other type is "mutation" which encompasses create, update, and delete)
const UserTopicType = new GraphQLObjectType({
  name: `UserTopic`,
  fields: () => ({
    id: { type: GraphQLID },
    // name: { type: GraphQLString },
    // description: { type: GraphQLString },
    // imageUrl: { type: GraphQLString },
    // price: { type: GraphQLInt },
    // unitsInStock: { type: GraphQLInt },
  }),
});

const UserGroupType = new GraphQLObjectType({
  name: `UserGroup`,
  fields: () => ({
    id: { type: GraphQLID },
    // name: { type: GraphQLString },
    // description: { type: GraphQLString },
    // imageUrl: { type: GraphQLString },
    // price: { type: GraphQLInt },
    // unitsInStock: { type: GraphQLInt },
  }),
});


// you'll have multiple root queries
const RootQuery = new GraphQLObjectType({
  name: `RootQueryType`,
  fields: {
    userTopic: { // this names the query for frontend usage
      type: UserTopicType,
      args: { id: { type: GraphQLID } }, // what you'll use to look up individual products (id)
      resolve(root, args) { // code to get data from db or other source (e.g. linkedIn api)
        return UserTopic.findById(args.id);
      },
    },
    userGroup: {
      type: UserGroupType,
      args: { id: { type: GraphQLID } },
      resolve(root, args) {
        return UserGroup.findById(args.id);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
