import { useState } from "react";
import axios from "axios";
import useBinaryToImage from "../components/hooks/useBinaryToImage";
function SettingsPage() {
  const [file, setFiles] = useState(null);
  function uploadFiles(files) {
    console.log(files);
    axios
      .post("/images/upload-images", files, {
        headers: { "Content-Type": "mulipart/form-data" },
      })
      .then((res) => {
        const { data } = res;
        setFiles(data);
      });
  }
  console.log(file);
  return (
    <div>
      Settings
      <input
        type="file"
        name="fileUpload"
        onChange={(e) => uploadFiles(e.target.files)}
      />
    </div>
  );
}

export default SettingsPage;
