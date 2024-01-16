import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import useImagesFromBinaryArray from "../components/hooks/useBinaryToImage";

function SettingsPage() {
  const [files, setFiles] = useState([]);
  const [imagesData, setImagesData] = useState([
    { imageBinary: "binary", imageId: "438f93c4-0ae2-442d-b6de-cf68691bb2af" },
    { imageBinary: "binary", imageId: "b5b8b74b-9270-47f9-8f97-f72163ccf03d" },
  ]);

  const [isLoaded, setIsLoaded] = useState(false);
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
        setIsLoaded(true);
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
  // console.log(downloadedImages);
  // Funkcja do konwersji binarnych danych na URL obrazu
  const convertBinaryToImage = (imageData) => {
    const base64Image = imageData?.buffer.toString("base64");
    const imageUrl = `data:${imageData?.mimetype};base64,${base64Image}`;
    return imageUrl;
  };
  const [imageUrls, setImageUrls] = useState([]);
  // const binaryArr = downloadedImages.map((image) => image.imageBinary);
  // const binaryArr = useMemo(
  //   () =>
  //     downloadedImages.map((image) => { // Add this line
  //       const base64Data = image.imageBinary.split(",")[1];
  //       if (!base64Data) {
  //         console.error("Invalid imageBinary data:", image.imageBinary);
  //         return new Uint8Array();
  //       }
  //       let binary = atob(base64Data);
  //       let array = [];
  //       for (let i = 0; i < binary.length; i++) {
  //         array.push(binary.charCodeAt(i));
  //       }
  //       return new Uint8Array(array);
  //     }),
  //   [downloadedImages]
  // );
  useEffect(() => {
    if (downloadedImages.length === 0) return;
    try {
      const urlarray = downloadedImages
        .map((image) => {
          const base64Data = image?.imageData.buffer;
          if (!base64Data) {
            console.error(
              "Invalid imageData.buffer data:",
              image?.imageData.buffer
            );
            return null;
          }
          let binaryString;
          try {
            binaryString = window.atob(base64Data); // Decode base64
          } catch (error) {
            console.error("Failed to decode base64 string:", base64Data, error);
            return null;
          }
          const len = binaryString.length;
          const bytes = new Uint8Array(len);
          for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }
          const blob = new Blob([bytes.buffer], {
            type: image.imageData.mimetype,
          });
          return window.URL.createObjectURL(blob);
        })
        .filter(Boolean);
      setImageUrls(urlarray);
      return () => {
        urlarray.forEach((url) => {
          URL.revokeObjectURL(url);
        });
      };
    } catch (error) {
      console.error("Failed to convert binary data to image URL:", error);
    }
  }, [downloadedImages]);
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
      {downloadedImages.map((imageData, key) => {
        return (
          <img
            key={key}
            src={convertBinaryToImage(imageData.imageData)}
            alt={"binaryIMG" + key}
          />
        );
      })}
    </div>
  );
}

export default SettingsPage;
