import "./App.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import PeopleList from "./components/PeopleList";
import AddPerson from "./components/forms/AddPerson";

const client = new ApolloClient({
  uri: "http://localhost:4001/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>People and Cars</h1>
        <AddPerson />
        <PeopleList />
      </div>
    </ApolloProvider>
  );
}

export default App;
