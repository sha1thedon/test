import {gql, ApolloServer} from "apollo-server-micro"
import {ApolloServerPluginLandingPageGraphQLPlayground} from "apollo-server-core"
import neo4j from "neo4j-driver"
import {Neo4jGraphQL} from "@neo4j/graphql"
import "ts-tiny-invariant"


const typeDefs = gql`
type Article {
    id: ID
    url: String
    score: Int
    title: String
    comments: String
    created: DateTime
    user: User @relationship(type:"SUBMITTED", direction: IN)
    tags: [Tag] @relationship(type:: "HAS_TAG", direction: OUT)
}


type User {
    username: String
    created: DateTime
    karma: Int
    about: String
    avatar: String
    invited_by: User @relationship(type:"INVITED_BY", direction: OUT)
    articles: [Article] @relationship(type: "SUBMITTED, direction:OUT)
}

type Tag{
    name: String
    articles: [Article] @relationship(type:"HAS_TAG", direction: IN)
}
`;

const driver = neo4j.driver(
    process.env.NEO4J_URI || 'bolt://localhost:7687',
    neo4j.auth.basic(process.env.NEO4J_USER || 'neo4j', process.env.NEO4J_PASSWORD || 'password')
  );

const resolvers = {
    Query : {
        getUser: () => {
            return {id:"Foo"}
        }
    }
}

const neoSchema = new Neo4jGraphQL({typeDefs, driver})

const apolloServer = new ApolloServer({
    typeDefs,
    introspection: true,
    resolvers,
    // playground: true,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground]
})

const startServer = apolloServer.start()

export default async function handler(req: Request, res: Response) {
    await startServer

    await apolloServer.createHandler({
        path: "/api/graphql"
    })
}

export const config = {
    api: {
        bodyParser: false
    }
}