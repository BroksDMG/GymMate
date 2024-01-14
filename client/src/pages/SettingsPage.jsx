import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import useImagesFromBinaryArray from "../components/hooks/useBinaryToImage";

function SettingsPage() {
  const [files, setFiles] = useState([]);
  const [imagesData, setImagesData] = useState([
    { imageBinary: "binary", imageId: "9740cbe9-9ace-4da3-b754-19df5ffa8267" },
    { imageBinary: "binary", imageId: "40b698f7-21f0-4c8b-821e-b86ea0db9bb5" },
  ]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [downloadedImages, setDownloadedImages] = useState([]);
  const [imagesUrls, setImagesUrls] = useState([]);

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
  console.log(downloadedImages);
  // Funkcja do konwersji binarnych danych na URL obrazu
  const convertBinaryToImage = (binaryData) => {
    const base64Image = binaryData?.toString("base64");
    const imageUrl = `data:${"image/jpeg"};base64,${base64Image}`;
    return imageUrl;
  };
  const [imageUrls, setImageUrls] = useState([]);
  // const binaryArray = downloadedImages.map((image) => image.imageBinary);
  // const binaryArray = useMemo(
  //   () =>
  //     downloadedImages.map((image) => {
  //       console.log("imageBinary data:", image.imageBinary); // Add this line
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
  // console.log(binaryArray);
  // const imagesUrlsfromBinary = useImagesFromBinaryArray(imagebinary);
  // console.log(imagesUrlsfromBinary);
  // console.log([imagebinary]);
  // useEffect(() => {
  //   if (binaryArray.length === 0) return;
  //   try {
  //     const urlarray = binaryArray.map((binaryData) => {
  //       const blob = new Blob([binaryData], { type: "image/jpeg" });
  //       return URL.createObjectURL(blob);
  //     });
  //     setImageUrls(urlarray);
  //     return () => {
  //       urlarray.forEach((url) => {
  //         URL.revokeObjectURL(url);
  //       });
  //     };
  //   } catch (error) {
  //     console.error("Failed to convert binary data to image URL:", error);
  //   }
  // }, [binaryArray]);
  // console.log(imageUrls);
  // console.log(imagesUrlsfromBinary);
  return (
    <div>
      Settings
      <input
        type="file"
        name="fileUpload"
        multiple
        onChange={(e) => setFiles(e.target.files)}
      />
      {downloadedImages.map((imageData, key) => {
        console.log(convertBinaryToImage(imageData.imageBinary));
        return (
          <img
            key={key}
            src={convertBinaryToImage(imageData.imageBinary)}
            alt={"binaryIMG" + key}
          />
        );
      })}
    </div>
  );
}

export default SettingsPage;
