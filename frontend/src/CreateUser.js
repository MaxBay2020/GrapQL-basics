import {useState} from "react";
// 引包
import {gql, useMutation} from '@apollo/client'

const CreateUser = () => {

    // 根据GQL服务器的type-defs.js文件，我们创建user时，需要以下参数：
    // input CreateUserInput {
    //          name: String!
    //         username: String!
    //         age: Int!
    //         nationality: Nationality = BRAZIL
    // }

    const [user, setUser] = useState({})

    // 准备GQL语句
    const CREATE_USER_MUTATION = gql`
            mutation addUser($newUser: CreateUserInput!){
                createUser(input: $newUser){
                    id,
                    name
                }
            }
        `

    // 使用useMutation()添加数据
    // 第一个参数是提供给我们的方法，触发这个方法，才执行GQL
    // 从GQL服务器返回来的数据放在了data中
    const [createUser, {data:userAdded}] = useMutation(CREATE_USER_MUTATION)

    const handleChange = (e) => {
        const {name, value} = e.target
        setUser({
            ...user,
            [name]: value
        })

    }

    return (
        <>
            <input type="text" name='name' placeholder="name" onChange={(e) => handleChange(e)} />
            <input type="text" name='username' placeholder="username" onChange={(e) => handleChange(e)} />
            <input type="number" name='age' placeholder="age" onChange={(e) => handleChange(e)} />
            <input type="text" name='nationality' placeholder="nationality" onChange={(e) => handleChange(e)} />
            {/*点击按钮，触发createUser()方法，添加数据*/}
            <button
                onClick={()=>createUser({
                    variables: {
                        newUser: {...user, age: Number(user.age)}
                    }
                })}
            >Create User</button>
        </>
    )
}

export default CreateUser
