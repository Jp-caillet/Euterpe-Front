import React, { Component } from 'react'
import axios from 'axios'

class FileUpload extends Component {
  constructor(props) {
    super(props)
    this.state = {
      uploadStatus: false
    }
    this.handleUpload = this.handleUpload.bind(this)
  }

  handleUpload(ev) {
    ev.preventDefault()

    const data = new FormData()
    data.append('file', this.uploadInput.files[0])
    data.append('filename', this.fileName.value)
    console.log(this.uploadInput.files[0])
    axios.post('http://localhost:4000/upload', data)
      .then(function (reponse) {
        this.setState({ imageURL: `http://localhost:4000/${data}`, uploadStatus: true })
        console.log(reponse)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  /* To be finished */

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleUpload}>
          <div className="form-group">
            <input className="form-control" ref={(ref) => { this.uploadInput = ref }} type="file" />
          </div>

          <div className="form-group">
            <input className="form-control" ref={(ref) => { this.fileName = ref }} type="text" placeholder="Optional name for the file" />
          </div>

          <button className="btn btn-success" type="submit">Upload</button>

        </form>
      </div>
    )
  }
}

export default FileUpload
