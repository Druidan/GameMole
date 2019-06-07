import React, { Component, Fragment } from 'react';
import '../styles/App.css'
import Header from './Header';
import ScrapedArticles from './ScrapedArticles';

import Navbar from './Navbar';
import SavedArticles from './savedArticles';

//This class was originally written by Maison Moa - Source: 'https://medium.com/@maison.moa/setting-up-an-express-backend-server-for-create-react-app-bc7620b20a61'
class App extends Component {
  state = {
      data: null
    };
  
    componentDidMount() {
        // Call our fetch function below once the component mounts
      this.callBackendAPI()
        .then(res => this.setState({ data: res.express }))
        .catch(err => console.log(err));
    }
      // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
    callBackendAPI = async () => {
      const response = await fetch('/express_backend');
      const body = await response.json();
      console.log(body)
  
      if (response.status !== 200) {
        throw Error(body.message) 
      }
      return body;
    };

    render() {
      return (
        <Fragment>
          <div className='pageTop'>
            <Navbar />
            <Header />
          </div>
          <div className='savedDiv' id='savedDivId'>
            <SavedArticles />
          </div>
          <div className='scrapedDiv' id='scrapedDivId'>
            <ScrapedArticles />
          </div>
        </Fragment>
      );
    }
};
  



export default App;
