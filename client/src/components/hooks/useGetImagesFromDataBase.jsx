import { useState, useEffect } from "react";
import axios from "axios";

const useGetImagesFromDataBase = (imagesData) => {
  const [downloadedImages, setDownloadedImages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (imagesData.length === 0) return;
    const imageIds = imagesData.map((imageData) => imageData.imageId);
    async function getImages() {
      try {
        const response = await axios.get(
          `/images/get-images?images=${imageIds.join(",")}`
        );
        setDownloadedImages(response.data);
      } catch (error) {
        setError(error);
      }
    }
    getImages();
  }, [imagesData]);

  return [downloadedImages, error];
};

export default useGetImagesFromDataBase;
