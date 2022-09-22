// 引包
// 通过ApolloServer()方法创建GraphQL服务器
import {ApolloServer} from 'apollo-server'
import typeDefs from "./schema/type-defs.js";
import resolvers from './schema/resolvers.js'



// typeDefs参数表示GraphQL所定义的类，也就是schema，以及query方法
// resolvers表示具体的实现方法，如插入数据等的方法
const server = new ApolloServer({typeDefs, resolvers})

server.listen().then(({url}) => {
    console.log(`Server is running at ${url}!`)
})
