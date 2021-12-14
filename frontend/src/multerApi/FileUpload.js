import React, { useState } from "react";
import { multipleFilesUpload } from "./Api";

const FileUpload = (props) => {
  const [multipleFiles, setMultipleFiles] = useState();
  const MultipleFileChange = (e) => {
    setMultipleFiles(e.target.files[0]);
  };
  const UploadMultipleFiles = async () => {
    const formData = new FormData();
    for (let i = 0; i < multipleFiles.length; i++) {
      formData.append("files", multipleFiles[i]);
      console.log(formData);
    }
    await multipleFilesUpload(formData);
    props.getMultiple();
  };
  console.log(multipleFiles);
  return (
    <div>
      <div className="row">
        <div className="col-6">
          <div className="form-group">
            <input
              type="file"
              name="files"
              onChange={(e) => MultipleFileChange(e)}
              multiple
            />
          </div>
        </div>
        <button onClick={() => UploadMultipleFiles()}>Upload</button>
      </div>
    </div>
  );
};

export default FileUpload;
