const graphql = require(`graphql`);
const { User, Topic, UserGroup, UserEvent, UserTopic } = require(`../db/models/index`);

const {
  GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLID, GraphQLInt, GraphQLList
} = graphql;

const UserType = new GraphQLObjectType({
  name: `user`,
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    events: {
      type: new GraphQLList(EventType),
      resolve(root, args){
        return UserEvent.findAll({ where: { userId: root.id } })
      }
    },
    groups: {
      type: new GraphQLList(GroupType),
      resolve(root, args){
        return UserGroup.findAll({ where: { userId: root.id } })
      }
    },
    topics: {
      type: new GraphQLList(UserTopicType),
      resolve(root, args){
        return UserTopic.findAll({ where: { userId: root.id } })
      }
    }
  })
});

const UserTopicType = new GraphQLObjectType({
  name: `userTopic`,
  fields: () => ({
    userId: { type: GraphQLID },
    topicId: { type: GraphQLID },
  }),
});

const TopicType = new GraphQLObjectType({
  name: `topic`,
  fields: () => ({
    id: { type: GraphQLID },
    keyword: { type: GraphQLString },
    topics: { type: new GraphQLList(GraphQLString) },
  }),
});

const GroupType = new GraphQLObjectType({
  name: `group`,
  fields: () => ({
    id: { type: GraphQLID },
    groupId: { type: GraphQLString },
    displayName: { type: GraphQLString },
    urlName: {type: GraphQLString},
    members: {type: GraphQLInt},
    nextEventId: {type: GraphQLString},
    user: {
      type: UserType,
      resolve(root, args) {
        return User.findById(root.userId)
      }
    }
  }),
});

const EventType = new GraphQLObjectType({
  name: `event`,
  fields: () => ({
    id: { type: GraphQLID },
    eventName: { type: GraphQLString },
    eventId: { type: GraphQLString },
    photo: { type: GraphQLString },
    eventGroup: { type: GraphQLString },
    date: { type: GraphQLString },
    time: { type: GraphQLString },
    eventCity: { type: GraphQLString },
    rsvps: { type: GraphQLInt },
    venueName: { type: GraphQLString },
    venueAddress: { type: GraphQLString },
    fee: { type: GraphQLInt },
    description: { type: GraphQLString },
    webActions: { type: new GraphQLList(GraphQLString) },
    directLink: { type: GraphQLString },
    pastEvents: { type: GraphQLInt },
    hosts: { type: new GraphQLList(GraphQLString) },
  }),
});



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
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
