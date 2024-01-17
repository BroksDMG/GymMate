import { useState, useEffect } from "react";
import axios from "axios";
import useImagesFromBinaryArray from "../components/hooks/useBinaryToImage";

function SettingsPage() {
  const [files, setFiles] = useState([]);
  const [imagesData, setImagesData] = useState([
    { imageBinary: "binary", imageId: "438f93c4-0ae2-442d-b6de-cf68691bb2af" },
    { imageBinary: "binary", imageId: "b5b8b74b-9270-47f9-8f97-f72163ccf03d" },
  ]);
  const [downloadedImages, setDownloadedImages] = useState([]);
  useEffect(() => {
    if (files.length === 0) return;
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
        setImagesData(respone.data);
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

  useEffect(() => {
    if (imagesData.length === 0) return;
    const imageIds = imagesData.map((imageData) => imageData.imageId);
    async function getImages() {
      try {
        const respone = await axios.get(
          `/images/get-images?images=${imageIds.join(",")}`
        );
        setDownloadedImages(respone.data);
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
    getImages();
  }, [imagesData]);
  console.log(downloadedImages);
  const imageUrls = useImagesFromBinaryArray(downloadedImages);
  return (
    <div>
      Settings
      <input
        type="file"
        name="fileUpload"
        multiple
        onChange={(e) => setFiles(e.target.files)}
      />
      {imageUrls.map((url, key) => {
        return <img key={key} src={url} alt={"image" + key} />;
      })}
    </div>
  );
}

export default SettingsPage;
