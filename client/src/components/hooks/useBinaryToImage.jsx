import { useState, useEffect } from "react";

function useImagesFromBinaryArray(downloadedImages) {
  const [imageUrls, setImageUrls] = useState([]);

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
          const len = base64Data.length;
          const bytes = new Uint8Array(len);
          for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
          }
          const blob = new Blob([bytes.buffer], {
            type: image.imageData.mimetype,
          });
          image.imageData.url = window.URL.createObjectURL(blob);
          return image;
        })
        .filter(Boolean);
      setImageUrls(urlarray);
      return () => {
        urlarray.forEach((url) => {
          URL.revokeObjectURL(url.imageData);
        });
      };
    } catch (error) {
      console.error("Failed to convert binary data to image URL:", error);
    }
  }, [downloadedImages]);

  return imageUrls;
}

export default useImagesFromBinaryArray;
