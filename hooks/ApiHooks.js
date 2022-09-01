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
      console.error("loadMedia():", error);
    }
  };

  useEffect(() => {
    loadMedia();
  }, []);

  return { mediaArray };
};

const useLogin = () => {
  const postLogin = async (userCredentials) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCredentials),
    };

    try {
      const json = await myFetch(`${baseUrl}/login`, options);
      return json;
    } catch (error) {
      console.error("postLogin():", error);
    }
  };

  return { postLogin };
};

const useUser = () => {
  const getUserByToken = async (token) => {
    try {
      const options = {
        method: "GET",
        headers: { "x-access-token": token },
      };
      const user = await myFetch(`${baseUrl}/users/user`, options);
      return user;
    } catch (error) {
      console.error("getUserByToken():", error);
    }
  };

  return { getUserByToken };
};

export { useMedia, useLogin, useUser };