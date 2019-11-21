import React from 'react';
import logo from './logo.svg';
import './App.css';

const GITHUB_USER_URL = "https://api.github.com/users/defunkt"
const GITHUB_REPOS_URL = (page) => `https://api.github.com/users/defunkt/repos?page=${page}&per_page=100`

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      numberOfRepos: null,
      languages: []
    }
  }


  fetchAllRepos = async () => {
    console.log("fetching Repos...")

    const result = await fetch(GITHUB_USER_URL)
    const user = await result.json()

    await new Promise(resolve => setTimeout(resolve, 500))

    console.log("fetch complete")
    //store how many Repos the user has:
    this.setState({ numberOfRepos: user.public_repos })
    console.log("the number of Repos is", this.state.numberOfRepos)
    //calculate the number of requests that must be done to gather all repos
    let numberOfRequests = Math.ceil(this.state.numberOfRepos / 100)
    console.log("the number of requests is", numberOfRequests)

    let i = 0
    do {
      i += 1
      console.log("request", i)
      let resp = await fetch(GITHUB_REPOS_URL(i))
      let repos = await resp.json()
      this.setState({ repos: [...this.state.repos, ...repos] })
      console.log("the repos in state are currently:", this.state.repos)
    }
    while (i < numberOfRequests);

  }

  findFavouriteLanguage = () => {
    let languages = []
    console.log("Finding favourite language...")

    this.state.repos.map(repo => {
      languages.push(repo.language)
    }

    )
    console.log(languages)
  }

  componentDidMount() {
    this.fetchAllRepos().then(
      resp => this.findFavouriteLanguage()
    )
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



  // fetchAllRepos = () => {
  //   //find out how many Repos the user has:
  //   fetch(GITHUB_USER_URL).then(
  //     resp => resp.json()
  //   ).then(user => {
  //     //save this number into state
  //     this.setState({ numberOfRepos: user.public_repos })
  //     console.log("the number of Repos is", this.state.numberOfRepos)
  //     //calculate the rounded up number of requests that must be done to gather all repos
  //     let numberOfRequests = Math.ceil(this.state.numberOfRepos / 100)
  //     console.log("the number of requests is", numberOfRequests)
  //     return numberOfRequests
  //   }).then(requests => {

  //   })

  //   return fetch(GITHUB_REPOS_URL).then(
  //     resp => resp.json()
  //   ).then(user => console.log(user))
  // }
