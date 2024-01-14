import { useState, useEffect } from "react";
import axios from "axios";
import useBinaryToImage from "../components/hooks/useBinaryToImage";
function SettingsPage() {
  const [files, setFiles] = useState([]);
  useEffect(() => {
    async function uploadFiles() {
      const formData = new FormData();
      for (let file of files) {
        formData.append("files", file);
      }

      try {
        const respone = await axios.post("/images/upload-images", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        console.log(respone);
      } catch (error) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message);
        }
        console.log(error.config);
      }
    }
    uploadFiles();
  }, [files]);
  console.log([files]);
  return (
    <div>
      Settings
      <input
        type="file"
        name="fileUpload"
        multiple
        onChange={(e) => setFiles(e.target.files)}
      />
    </div>
  );
}

export default SettingsPage;
