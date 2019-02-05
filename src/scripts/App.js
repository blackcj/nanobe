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
      url: '/sample?a=1'
    }).then(response => {
      this.setState({
        // .data for axios and .data for what is returned from the server
        data: response.data.data,
      });
    }).catch(error => {
      console.log(error);
    })
  }

  render() {
    return (
      <div>
        <h1>Simple Server with React</h1>
        <p>Data: {JSON.stringify(this.state.data)}</p>
      </div>
    );
  }
}

export default App;
