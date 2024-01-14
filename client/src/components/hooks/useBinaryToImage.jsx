import { useState, useEffect } from "react";

function useImagesFromBinaryArray(binaryArray) {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    if (binaryArray.length === 0) return;
    try {
      const urlarray = binaryArray.map((binaryData) => {
        const blob = new Blob([binaryData], { type: "image/jpeg" });
        return URL.createObjectURL(blob);
      });
      setImageUrls(urlarray);
      console.log(urlarray);
      return () => {
        urlarray.forEach((url) => {
          URL.revokeObjectURL(url);
        });
      };
    } catch (error) {
      console.error("Failed to convert binary data to image URL:", error);
    }
  }, []); // Add binaryArray to the dependency array
  console.log(imageUrls);
  return imageUrls;
}

export default useImagesFromBinaryArray;
