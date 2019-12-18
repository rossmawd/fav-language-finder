import React from 'react';
import './App.css';
import SearchBox from './SearchBox/SearchBox'
import SearchResults from './SearchResults/SearchResults'
import Loading from './Loading';

const GITHUB_URL = "https://api.github.com/users/"
const GITHUB_USER_URL = (user) => `${GITHUB_URL}${user}`
const GITHUB_REPOS_URL = (page, user) => `${GITHUB_URL}${user}/repos?page=${page}&per_page=100`

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      repos: [],
      numberOfRepos: null,
      favLanguage: null,
      favLanguageNumber: null,
      username: ""
    }
  }

  handleUserNameSubmit = async () => {
    await this.setState({ repos: [] })
    await this.fetchAllRepos()
    this.findFavouriteLanguage()
  }

  updateUsername = (event) => {
    this.setState({ username: event.target.value })
  }

  fetchAllRepos = async () => {
    const result = await fetch(GITHUB_USER_URL(this.state.username))
    const user = await result.json()

    console.log("fetching Repos...")

    //store how many Repos the user has:
    this.setState({ numberOfRepos: user.public_repos })
    console.log("the number of Repos is", this.state.numberOfRepos)
    //calculate the number of requests that must be done to gather all repos
    let numberOfRequests = Math.ceil(this.state.numberOfRepos / 100)
    console.log("the number of requests is", numberOfRequests)

    //loop through the required requests and add the response into the 'repos' state
    let i = 0
    do {
      i += 1
      console.log("request", i)
      let resp = await fetch(GITHUB_REPOS_URL(i, this.state.username))
      let repos = await resp.json()
      this.setState({ repos: [...this.state.repos, ...repos] })
      console.log("the repos in state are currently:", this.state.repos)
    }
    while (i < numberOfRequests);
  }


  findFavouriteLanguage = () => {
    let languages = []
    console.log("Finding favourite language...")

    this.state.repos.map(repo => languages.push(repo.language))
    languages.sort()

    this.countLanguages(languages)
  }

  countLanguages = (languages) => {
    console.log("Here are the languages", languages)

    console.log("Counting Languages...")
    let maxCount = 0
    let currentCount = 0
    let currentWinner = ""
    let currentLang = languages[0]

    languages.forEach((language, i) => {
      if (language === currentLang) {
        currentCount += 1
      } else {

        if (currentCount > maxCount) {
          maxCount = currentCount
          currentWinner = languages[i - 1]
          console.log("as the max count is now", maxCount)
          console.log("...the current winner has been changed to", currentWinner)
        }
        currentLang = language
        currentCount = 0
      }
      //return language
    })

    this.setState({ favLanguage: currentWinner })
    this.setState({ favLanguageNumber: maxCount })
    console.log("This Users favourite language is: ", this.state.favLanguage)
  }

  render() {
    return (
      <div className="App">

        <SearchBox
          updateUsername={this.updateUsername}
          currentUsername={this.state.username}
          handleUserNameSubmit={this.handleUserNameSubmit}
        />
        <br />
        {this.state.favLanguageNumber ? (<SearchResults
          favLanguage={this.state.favLanguage}
          favLanguageNumber={this.state.favLanguageNumber}
        />) : <Loading />}
      </div>
    );
  }
}

export default App;


