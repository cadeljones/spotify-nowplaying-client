import React, { Component } from 'react';
import './App.css';

// const dotenv = require('dotenv');
// const env = dotenv.config();
require('dotenv').config()

class App extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    const token = params.access_token;
    this.state = {
      loggedIn: token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: '', isPlaying: false },
      token: token,
    }
  }
  componentDidMount() {
    let timerId
    timerId =  setInterval(
      () => this.getNowPlaying(),
      1000
  );
    this.setState({
      timerId: timerId
    })
  }
  componentWillUnmount() {
    window.clearInterval(this.state.timerId)
  }

    getHashParams() {
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }

  getNowPlaying(){
    let myHeaders = new Headers({
      "Authorization":
      "Bearer " + this.state.token
    });

    var url = 'https://api.spotify.com/v1/me/player';

    fetch(url, {
      method: 'GET', 
      headers:myHeaders
    }).then(response => {
      return response.text()
    })
    .then((data) => {
      data = JSON.parse(data)
        this.setState({
          nowPlaying: {
              name: data.item.name,
              albumArt: data.item.album.images[0].url,
              isPlaying: data.is_playing
            }
        });
    })
    .catch((error) => {
      console.log(error)
    })
  }

  pause(){
    let myHeaders = new Headers({
      "Accept": "application/json",
      "Content-type": "application/json",
      "Authorization":
      "Bearer " + this.state.token
    });

    var url = 'https://api.spotify.com/v1/me/player/pause';

    fetch(url, {
      method: 'PUT', 
      headers:myHeaders
    }).then(response => {
      return response.text()
    })
    .then((data) => {
      console.log(data ? JSON.parse(data) : {})
    })
    .catch((error) => {
      console.log(error)
    })
  }
  play(){
    let myHeaders = new Headers({
      "Accept": "application/json",
      "Content-type": "application/json",
      "Authorization":
      "Bearer " + this.state.token
    });

    var url = 'https://api.spotify.com/v1/me/player/play';

    fetch(url, {
      method: 'PUT', 
      headers:myHeaders
    }).then(response => {
      return response.text()
    })
    .then((data) => {
      console.log(data ? JSON.parse(data) : {})
    })
    .catch((error) => {
      console.log(error)
    })
  }
  next(){
    let myHeaders = new Headers({
      "Accept": "application/json",
      "Content-type": "application/json",
      "Authorization":
      "Bearer " + this.state.token
    });

    var url = 'https://api.spotify.com/v1/me/player/next';

    fetch(url, {
      method: 'POST', 
      headers:myHeaders
    }).then(response => {
      return response.text()
    })
    .then((data) => {
      console.log(data ? JSON.parse(data) : {})
    })
    .catch((error) => {
      console.log(error)
    })
  }
  prev(){
    let myHeaders = new Headers({
      "Accept": "application/json",
      "Content-type": "application/json",
      "Authorization":
      "Bearer " + this.state.token
    });

    var url = 'https://api.spotify.com/v1/me/player/previous';

    fetch(url, {
      method: 'POST', 
      headers:myHeaders
    }).then(response => {
      return response.text()
    })
    .then((data) => {
      console.log(data ? JSON.parse(data) : {})
    })
    .catch((error) => {
      console.log(error)
    })
  }


  render() {
    return (
      <div className="App">
        {this.state.loggedIn ? <div></div> : <a href={process.env.REACT_APP_LOGIN_URL} > Login to Spotify </a>}
        { this.state.loggedIn &&
          <div>
            <img src={this.state.nowPlaying.albumArt} style={{ height: '90vh' }}/>
            <br/>
            <button onClick={() => this.prev()}>
              Prev
            </button>

            {this.state.nowPlaying.isPlaying ?
            <button onClick={() => this.pause()}>
              Pause
            </button> :
            <button onClick={() => this.play()}>
              Play
            </button>
            }

            <button onClick={() => this.next()}>
              Next
            </button>
          </div>
        }
      </div>
    );
  }
}

export default App;