import React from 'react';
import logo from './logo.svg';
import './App.css';

const GITHUB_USER_URL = "https://api.github.com/users/rossmawd"
const GITHUB_REPOS_URL = "https://api.github.com/users/rossmawd/repos?page=3&per_page=100"

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      numberOfRepos: null
    }
  }

  fetchAllRepos = () => {
    //find out how many Repos the user has:
   fetch(GITHUB_USER_URL).then(
      resp => resp.json()
    ).then(user => {
      
      this.setState({numberOfRepos: user.public_repos})
      console.log("the number of Repos is", this.state.numberOfRepos)
    })

    return fetch(GITHUB_REPOS_URL).then(
      resp => resp.json()
    ).then(user => console.log(user))
  }

  componentDidMount() {
    this.fetchAllRepos()
    console.log("component has mounted")
  }

  // }
  // function App() {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
        </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        </a>
        </header>
      </div>
    );
  }
}

export default App;
