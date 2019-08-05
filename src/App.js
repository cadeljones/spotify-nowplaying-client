import React, { Component } from 'react';
import './App.css';

require('dotenv').config()

class App extends Component {
  constructor(){
    super();
    const params = this.getHashParams();
    this.token = params.access_token;
    this.myHeaders = new Headers({
      "Authorization":
      "Bearer " + this.token
    });

    this.url = 'https://api.spotify.com/v1/me/player';
    this.state = {
      loggedIn: this.token ? true : false,
      nowPlaying: { name: 'Not Checked', albumArt: '', isPlaying: false },
    }
  }
  componentDidMount() {
    this.timerId = setInterval(
      () => this.getNowPlaying(),
      1000
  );
  }
  componentWillUnmount() {
    window.clearInterval(this.timerId)
  }

    getHashParams() {
    let hashParams = {};
    let e, r = /([^&;=]+)=?([^&;]*)/g, q = window.location.hash.substring(1);
    e = r.exec(q)
    while (e) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
       e = r.exec(q);
    }
    return hashParams;
  }

  getNowPlaying(){
    fetch(this.url, {
      method: 'GET', 
      headers:this.myHeaders
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
    const url = this.url + '/pause';

    fetch(url, {
      method: 'PUT', 
      headers:this.myHeaders
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
    const url = this.url + '/play';

    fetch(url, {
      method: 'PUT', 
      headers:this.myHeaders
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
    const url = this.url + '/next';

    fetch(url, {
      method: 'POST', 
      headers:this.myHeaders
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
    const url = this.url + '/previous';

    fetch(url, {
      method: 'POST', 
      headers:this.myHeaders
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
            <img alt="album cover" src={this.state.nowPlaying.albumArt} style={{ height: '90vh' }}/>
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