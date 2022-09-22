// 引包
// 使用useQuery来查询数据，useMutation来添加更改删除数据
// 使用gql来写GQL语句
import {useQuery, gql, useLazyQuery} from '@apollo/client'
import {useState} from "react";


const DisplayData = () => {
    const [movieName, setMovieName] = useState('');


    // gql的变量名一般用大写
    // 查找所有用户
    const QUERY_ALL_USERS = gql`
        # 起一个query名字
        query getAllUsers {
          # users()方法，返回值只显示id, name, username等内容
          users {
            id,
            name,
            username,
            age,
            nationality,
            friends {
              name,
              age
            }
          }
        }
    `

    // 查找所有movie
    const QUERY_ALL_MOVIES = gql`
        query getALlMovies {
            movies {
                id,
                name,
                yearOfPublication
            }
        }
    `

    // 根据movie name查询movie
    // 所需要的实参，在下面点击按钮所触发的方法中传入
    const QUERY_MOVIE_BY_NAME = gql`
        query getMovieByName($movieName: String!) {
            movie(name: $movieName){
                id,
                name,
                yearOfPublication
            }
        }
    `

    // 使用useQuery()进行GQL查询
    // 返回的数据放在了data中
    // 除了返回的data，useQuery()还提供了其他信息，如loading, error，refetch
    const {data:users, loading, error, refetch} = useQuery(QUERY_ALL_USERS)
    const {data:movies} = useQuery(QUERY_ALL_MOVIES)


    // 点击按钮，触发fetchMovie方法
    // 之后运行useLazyQuery()中的GQL语句
    // 最后将查询结果返回到data中
    // 除了data，还有其他参数，如loading，error等
    const [
        fetchMovie,
        {data:movieData}
    ] = useLazyQuery(QUERY_MOVIE_BY_NAME)

    console.log(users)
    console.log(movies)
    console.log(movieData)

    return (
        <>
            <input
                type="text"
                placeholder='move name'
                onChange={(e)=>setMovieName(e.target.value)}
            />
            {/*在这里将movie id传进去*/}
            <button
                onClick={()=>fetchMovie({
                    variables: {
                        movieName: movieName
                    }
                })}
            >Fetch data</button>

            <div>
                {
                    movieData && (
                        <div>
                            <h1>{movieData.movie.id}</h1>
                            <h1>{movieData.movie.name}</h1>
                            <h1>{movieData.movie.yearOfPublication}</h1>
                        </div>
                    )
                }
            </div>
        </>
    )
}

export default DisplayData
