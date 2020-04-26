import React from 'react'
import Loader from 'react-loader-spinner'
import './ResultLoading.css'

class ResultLoading extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      loading: this.props.loading,
      internalError: this.props.internalError
    }

  }

  render() {

    let content
    if (!this.props.internalError) {
      content = (
        <div className="loading-content">
          <Loader
            type="Oval"
            color="#3f4257"
            height={100}
            width={100}
          />
          <p>Evaluating the Chest X-Ray . . .</p>
        </div>
      )
    }
    else {
      content = (
        <div className="loading-content">
          An unknown server error occurred. We will keep the logs to further investigate this error.
        </div>
      )
    }
    return (
      <div className="page">
        <h1>X-COVID AI Assistant</h1>
        <p>A tool to detect signs of COVID-19 presence from Chest X-Rays using Deep Learning</p>
        <div className="head">Result</div>
        {content}
      </div>
    )
  }

}

export default ResultLoading
