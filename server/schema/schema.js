const graphql = require(`graphql`);
const { User, Topic, UserGroup, UserEvent } = require(`../db/index`);

const {
  GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLID, GraphQLInt, GraphQLList
} = graphql;

const TopicType = new GraphQLObjectType({
  name: `Topic`,
  fields: () => ({
    id: { type: GraphQLID },
    keyword: { type: GraphQLString },
    topics: { type: GraphQLList },
  }),
});

const UserGroupType = new GraphQLObjectType({
  name: `UserGroup`,
  fields: () => ({
    id: { type: GraphQLID },
    groupId: { type: GraphQLString },
    urlName: {type: GraphQLString},
    members: {type: GraphQLInt},
    nextEventId: {type: GraphQLString}
  }),
});


const RootQuery = new GraphQLObjectType({
  name: `RootQueryType`,
  fields: {
    userTopic: { // this names the query for frontend usage
      type: TopicType,
      args: { id: { type: GraphQLID } }, // what you'll use to look up individual topics
      resolve(root, args) { // code to get data from db or other source (e.g. linkedIn api)
        return Topic.findById(args.id);
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
