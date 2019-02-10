import React, { Component } from 'react'
import { FilePond } from 'react-filepond'
import FileUpload from './fileUpload'
import 'filepond/dist/filepond.min.css'

class Upload extends Component {
  render() {
    return (
      <div>
        <FilePond allowMultiple={true} acceptedFileTypes="audio/mp3" server="" />
        <FileUpload />
      </div>
    )
  }
}

export default Upload
