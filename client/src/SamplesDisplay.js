import React from 'react'
import './SamplesDisplay.css'

class SamplesDisplay extends React.Component {

  render() {

    return (
      <div className="page">
        <h1>X-COVID AI Assistant</h1>
        <p>A tool to detect signs of COVID-19 presence from Chest X-Rays using Deep Learning</p>
        <div className="head">Samples</div>
        <div className="section-text">
          Below you can find some sample chest X-Rays from real cases:
          <div className="samples-table">
            <table className="center">
             <tr>
               <th>Download link</th>
               <th>Doctor diagnosis</th>
             </tr>
             <tr>
               <td><a href={process.env.PUBLIC_URL + '/sample-images/covid19/covid1.jpg'} download>Sample 1</a></td>
               <td>COVID-19 positive</td>
             </tr>
             <tr>
               <td><a href={process.env.PUBLIC_URL + '/sample-images/normal/normal1.png'} download>Sample 2</a></td>
               <td>COVID-19 negative</td>
             </tr>
             <tr>
               <td><a href={process.env.PUBLIC_URL + '/sample-images/covid19/covid2.jpg'} download>Sample 3</a></td>
               <td>COVID-19 positive</td>
             </tr>
             <tr>
               <td><a href={process.env.PUBLIC_URL + '/sample-images/covid19/covid3.jpg'} download>Sample 4</a></td>
               <td>COVID-19 positive</td>
             </tr>
             <tr>
               <td><a href={process.env.PUBLIC_URL + '/sample-images/normal/normal2.png'} download>Sample 5</a></td>
               <td>COVID-19 negative</td>
             </tr>
             <tr>
               <td><a href={process.env.PUBLIC_URL + '/sample-images/normal/normal3.png'} download>Sample 6</a></td>
               <td>COVID-19 negative</td>
             </tr>
            </table>
          </div>
        </div>
      </div>
    )
  }

}

export default SamplesDisplay
