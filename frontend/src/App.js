// 引包
// 同redux和react query使用方法类似
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client'
import DisplayData from "./DisplayData";
import CreateUser from "./CreateUser";


function App() {

    // apollo配置参数
    const config = {
        cache: new InMemoryCache(),
        uri: 'http://localhost:4000/graphql', // graphql的后端API接口
    }
    const client = new ApolloClient(config)

    return (
      <ApolloProvider client={client}>
          <div className="App">
              <DisplayData />
              <CreateUser />
          </div>
      </ApolloProvider>

    );
}

export default App;
