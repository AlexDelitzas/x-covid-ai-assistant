import axios from 'axios'

const baseURL = process.env.REACT_APP_BASEURL || "http://localhost:5000"

export default axios.create({
  baseURL: baseURL
})
