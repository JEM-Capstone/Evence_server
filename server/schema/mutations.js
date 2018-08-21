const graphql = require(`graphql`);
const { User, Topic, UserGroup, UserEvent, UserTopic } = require(`../db/models/index`);
const { UserType, UserTopicType, TopicType, GroupType, EventType } = require(`./types.js`)

const {
  GraphQLObjectType, GraphQLSchema, GraphQLString, GraphQLID, GraphQLInt, GraphQLList, GraphQLBoolean
} = graphql;

const Mutation = new GraphQLObjectType({ 
  name: 'Mutation',
  fields: {
    favoriteEvent: {
      type: EventType,
      args: {
        id: { type: GraphQLID },
        favorite: {type: GraphQLBoolean }
      },
      async resolve(root, args){
        const targetEvent = await UserEvent.findById(args.id)
        const bool = targetEvent.favorite

        const [rows, updatedEvent] = await UserEvent.update({
          favorite: !bool
        }, {
          where: {id: args.id},
          returning: true,
          plain: true
        })
        return updatedEvent
      }
    },
    location: {
      type: null, // this is clearly not the correct value
      args: {
        id: { type: GraphQLID },
        area: { type: GraphQLString },
      },
      async resolve(root, args) {
        const updatedCity = await User.update({
          area: args.area
        }, {
          where: {id: args.id },
          returning: true,
          plain: true,
        })
        return updatedCity
      }
    }
  }
})

module.exports = Mutation
