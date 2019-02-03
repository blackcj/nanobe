import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: 'replace me',
    }
  }

  componentDidMount() {
    this.getDataFromServer();
  }

  getDataFromServer = () => {
    axios({
      method: 'GET',
      url: '/sample'
    }).then(response => {
      this.setState({
        data: response.data,
      });
    }).catch(error => {
      console.log(error);
    })
  }

  render() {
    return (
      <div>
        <h1>Simple Server with React</h1>
        <p>Data: {this.state.data}</p>
      </div>
    );
  }
}

export default App;
