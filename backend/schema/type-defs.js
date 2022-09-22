// 定义GraphQL所用到的schema
// 引包
// 使用aplollo-server包里的gql，可以让我们使用GraphQL语法定义类
// 但是js不认识，但gql可以帮我们将其转换成js代码
import {gql} from 'apollo-server'

// 使用gql写GQL语法
// 注意！在type Query{}中，要写query方法，具体怎么实现，要卸载resolvers.js文件中，在这里只定义方法名和返回的数据类型
// 之后定义一个enum，一般用大写
const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        username: String!
        age: Int!
        nationality: Nationality!
        friends: [User!]
    }
    
    type Movie {
        id: ID!
        name: String!
        yearOfPublication: Int!
        isInTheaters: Boolean!
    }

    type Query {
        users: [User!]!
        user(id: ID!): User
        
        movies: [Movie!]!
        movie(name: String!): Movie
    }
    
    # 声明添加，更改和删除的方法签名
    type Mutation {
        # 声明创建user的方法，必须返回User对象，因为GQL会使用cache，需要用到返回的User对象，所以必须返回User对象
        # 注意！我们可以写成：createUser(name: String, ageLInt, ...)
        # 但这样参数会很多，因此我们可以声明一个input；
        # 我们之所以不这么写： createUser(user: User!): User!，那是因为User的schema中，Nationality是必填项
        # 我们如果项设置默认值并不能在schema中设置，但可以在input中设置，如下面的input CreateUserInput{}的声明
        # 并且，我们不应该传入id
        # 所以我们需要声明一个input
        createUser(input: CreateUserInput!): User!
        
        # 根据id更改username
        updateUsername(input: UpdateUsernameInput): User
        
        # 根据id删除user，返回被删除的user
        deleteUser(id: ID!): User
        
    }
    
    input UpdateUsernameInput {
        id: ID!
        newUsername: String!
    }
    
    # 注意！设置Nationality的默认值是BRAZIL
    input CreateUserInput {
        name: String!
        username: String!
        age: Int!
        nationality: Nationality = BRAZIL
    }
    
    
    enum Nationality {
        CANADA
        BRAZIL
        INDIA
        GERMANY
        CHILE
    }
`



export default typeDefs
