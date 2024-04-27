import { useState, useEffect } from "react";
import useImagesFromBinaryArray from "./useBinaryToImage";
import useGetImagesFromDataBase from "./useGetImagesFromDataBase";
export default function useAvatarImg(avatar, defaultAvatar) {
  const [imagesData, setImagesData] = useState([]);
  useEffect(() => {
    if (avatar) {
      setImagesData(avatar);
    }
  }, [avatar]);
  const [downloadedImagesAvatar, errorDownload] =
    useGetImagesFromDataBase(imagesData);
  if (errorDownload) console.error(errorDownload);
  const imageUrls = useImagesFromBinaryArray(downloadedImagesAvatar);
  return imageUrls.length > 0 ? imageUrls[0]?.imageData.url : defaultAvatar;
}
