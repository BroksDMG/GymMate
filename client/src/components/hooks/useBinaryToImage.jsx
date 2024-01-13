import { useState, useEffect } from "react";

function useBinaryToImage(binaryData) {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (binaryData) {
      const blob = new Blob([binaryData], { type: "image/jpeg" });
      const url = URL.createObjectURL(blob);
      setImageUrl(url);

      // Clean up function to revoke the object URL
      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [binaryData]);

  return imageUrl;
}

export default useBinaryToImage;
