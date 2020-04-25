import React from 'react'
import ImageUploader from 'react-images-upload'
import API from './api.js'
import { Redirect } from 'react-router-dom'
import './IntroDisplay.css'

import ResultLoading from './ResultLoading.js'


class IntroDisplay extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      imageDataURI: null,
      activatedImageDataURI: null,
      imageUploaded: false,
      proceedToResult: false,
      resultNotes: null,
      loading: false,
      internalError: false
    }
    this.handleImageUpload = this.handleImageUpload.bind(this)
    this.checkCXR = this.checkCXR.bind(this)
  }

  handleImageUpload(inputImage, inputImageDataURI) {

    this.setState({
      imageDataURI: inputImageDataURI[0],
      imageUploaded: true
    })

  }

  checkCXR()
  {
    this.setState({
      loading: true
    })
    API.post(`/run_cnn`, {imageDataURI: this.state.imageDataURI})
      .then(res => {
        this.setState({
          proceedToResult: true,
          loading: false,
          resultNotes: res.data.notes
        })
      })
      .catch(err => {
        console.log('An error occurred')
        this.setState({
          internalError: true
        })
      })

    // this.setState({
    //   proceedToResult: true,
    //   resultNotes: 'Test',
    //   activatedImageDataURI: ''
    // })
  }


  render() {

    const checkButton =
    (
      <div className="button-to-start">
        <button type="button" onClick={this.checkCXR}><span>{"Check!"}</span></button>
      </div>
    )

    if (this.state.loading) {

      return (
        <ResultLoading loading={true} internalError={this.state.internalError}/>
      )
    }

    else if (this.state.proceedToResult)
    {
      return (
        <Redirect push to={{
            pathname: '/result',
            state: {
              imageDataURI: this.state.imageDataURI,
              resultNotes: this.state.resultNotes,
              activatedImageDataURI: this.state.activatedImageDataURI
            }

        }} />
      )

    }
    else
    {
      return (
        <div className="page">
          <h1>X-COVID AI Assistant</h1>
          <p>A tool to detect signs of COVID-19 presence from Chest X-Rays using Deep Learning</p>
          <div className="head">Upload a Chest X-Ray</div>
          <ImageUploader style={{ maxWidth: '500px', margin: "20px auto" }}
             withPreview={true}
             onChange={this.handleImageUpload}
             imgExtension={['.jpg', '.png', '.jpeg']}
             maxFileSize={5242880}
             label='Max file size: 5mb, accepted: jpg|png'
             singleImage={true}
           />
          {
            this.state.imageUploaded
            ? checkButton
            : null
          }


        </div>
      )
    }


  }

}

export default IntroDisplay
