import React, { Component } from 'react';
import './App.css';
import { Route, BrowserRouter } from 'react-router-dom';
import Nav from './components/Nav';
import Response from './components/Response';
import FooterSection from './components/FooterSection';
import IncomingQuestions from './components/IncomingQuestions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      threads: []
    };
  }
  
  componentDidMount() {
    window.fetch('https://hfc2018red.herokuapp.com/threads')
      .then(res => {
        return res.json();
      }).then(json => {
        this.setState(Object.assign({}, this.state, {
          threads: json
        }));
      })
  }
  
  render() {
    console.log(this.state.threads);
    return (
      <div>
        <Nav />
        <div style={styles.main}>
          <BrowserRouter>
            <Route render={()=><IncomingQuestions threads={this.state.threads}/> }/>
          </BrowserRouter>
          <Response />
        </div>
        <FooterSection />
      </div>
    );
  }
}

const styles = {
  main: {
    display: 'flex'
    
  }
}

export default App;
