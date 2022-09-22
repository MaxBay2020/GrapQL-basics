// resolvers里写具体的方法实现
// 如在type-defs.js文件中红定义了一个users方法，那么具体怎么实现就写在resolvers.js文件中
import {movieList, userList} from '../dummyData.js'

const resolvers = {
    // 实现Query的方法
    Query: {
        // 实现users()方法
        users: () =>{
            // 这里链接数据库，来取得数据并返回
            return userList
        },

        // 实现user(id: ID!)方法
        // 注意！id放在了第二个参数args中！
        user: (_, args) => {
            // 这里链接数据库，来取得数据并返回
            // 注意！即使数据库中的id是int类型，但将来使用此方法时传进来的id是string，所以要进行数据类型转换
            return userList.find(user => user.id === Number(args.id))
        },

        movies: () => {
            return movieList
        },

        movie: (_, args) => {
            return movieList.find(movie => movie.name === args.name)
        }

    },

    // 实现Mutation的方法
    Mutation: {
        // 实现createUser()方法
        // 传进来的实参放在了第二个参数args中
        createUser: (_, args) => {
            const user = args.input
            // 这里可以链接数据库来添加数据
            const lastId = userList.length
            user.id = lastId + 1
            userList.push(user)
            return user
        },

        updateUsername: (_, args) => {
            const {id, newUsername} = args.input
            // 这里可以链接数据库来更改数据
            const user = userList.find(user => user.id === Number(id))
            user.username = newUsername
            return user
        },

        deleteUser: (_, args) => {
            const id = args.id
            // 这里可以链接数据库来删除数据
            const newUserList = userList.filter(user => user.id !== Number(id))
            console.log(newUserList)
            return null
        }
    }
}

export default resolvers
