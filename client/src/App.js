import React from 'react'
import { Route, BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import IntroDisplay from './IntroDisplay.js'
import ResultDisplay from './ResultDisplay.js'
import SamplesDisplay from './SamplesDisplay.js'
import './App.css'


class App extends React.Component {

  render() {
    const NotFoundRedirect = () => <Redirect to='/' />

    return (
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={IntroDisplay} />
            <Route path="/result" component={ResultDisplay} />
            <Route path="/samples" component={SamplesDisplay} />
            <Route component={NotFoundRedirect} />
          </Switch>
        </div>
      </Router>
    )

  }

}

export default App
