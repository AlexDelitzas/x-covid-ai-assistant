import React from 'react'
import './ResultDisplay.css'

class ResultDisplay extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      imageDataURI: this.props.location.state.imageDataURI,
      resultNotes: this.props.location.state.resultNotes,
      activatedImageDataURI: this.props.location.state.activatedImageDataURI,
      imageShown: this.props.location.state.imageDataURI
    }

    this.showHideActivated = this.showHideActivated.bind(this)
  }

  showHideActivated() {
    if (this.state.imageShown === this.state.imageDataURI) {
      this.setState({
        imageShown: this.state.activatedImageDataURI
      })
    }
    else {
      this.setState({
        imageShown: this.state.imageDataURI
      })
    }

  }

  render() {

    return (
      <div className="page">
        <h1>X-COVID AI Assistant</h1>
        <p>A tool to detect signs of COVID-19 presence from Chest X-Rays using Deep Learning</p>
        <div className="head">Result</div>
        <div className="cxr-image">
          <img src={this.state.imageShown} alt="chest-x-ray" />
        </div>
        <div className="result-text">
          <div className="title">
            Prediction notes:
          </div>
          <div className="notes">
            {this.state.resultNotes}
          </div>
          {
            // <div className="button-title">
            //   Predictive image regions
            // </div>
            // <div className="button-regions">
            //   <button type="button" onClick={this.showHideActivated}>Show&#47;Hide</button>
            // </div>
          }

        </div>
      </div>
    )
  }

}

export default ResultDisplay
