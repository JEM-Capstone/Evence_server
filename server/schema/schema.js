const graphql = require(`graphql`);
const { User, Topic, UserGroup, UserEvent, UserTopic } = require(`../db/models/index`);

const {
  GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLID, GraphQLInt, GraphQLList
} = graphql;

const { UserType, UserTopicType, TopicType, GroupType, EventType } = require(`./types.js`)

const Mutation = require('./mutations')

const RootQuery = new GraphQLObjectType({
  name: `RootQueryType`,
  fields: {
    user: { // this names the query for frontend usage
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(root, args) {
        return User.findById(args.id)
      }
    },
    topic: { // this names the query for frontend usage
      type: TopicType,
      args: { id: { type: GraphQLID } }, // what you'll use to look up individual topics
      resolve(root, args) {
        return Topic.findById(args.id);
      },
    },
    group: {
      type: GroupType,
      args: { id: { type: GraphQLID } },
      resolve(root, args) {
        return UserGroup.findById(args.id);
      },
    },
    userTopic: {
      type: UserTopicType,
      args: { id: { type: GraphQLID } },
      resolve(root, args) {
        return UserTopic.findById(args.userId);
      },
    },
    event: {
      type: EventType,
      args: { id: { type: GraphQLID } },
      resolve(root, args) {
        return UserEvent.findById(args.id);
      },
    },
    events: {
      type: new GraphQLList(EventType),
      args: { userId: { type: GraphQLID } },
      resolve (root, args) {
        return UserEvent.findAll({where: {userId: args.userId}});
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation
});
