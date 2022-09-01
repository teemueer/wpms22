import { useState, useEffect } from "react";
import { baseUrl } from "../utils/config";
import { myFetch } from "../utils/common";

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  const loadMedia = async () => {
    try {
      const media = await myFetch(`${baseUrl}/media`);
      const mediaDetails = await Promise.all(
        media.map(
          async (item) => await myFetch(`${baseUrl}/media/${item.file_id}`)
        )
      );
      setMediaArray(mediaDetails);
    } catch (error) {
      console.error('loadMedia():', error);
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  return { mediaArray };
};

export { useMedia };
