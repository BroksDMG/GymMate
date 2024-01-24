import { useState, useEffect, useMemo } from "react";
import axios from "axios";

const useGetImagesFromDataBase = (imagesData) => {
  const [downloadedImages, setDownloadedImages] = useState([]);
  const [error, setError] = useState(null);

  const imageIds = useMemo(
    () => imagesData.map((imageData) => imageData.imageId),
    [imagesData]
  );

  useEffect(() => {
    if (imageIds.length === 0) return;
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
  }, [imageIds]);

  return [downloadedImages, error];
};

export default useGetImagesFromDataBase;
