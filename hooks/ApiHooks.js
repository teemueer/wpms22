import { useState, useEffect } from "react";
import { baseUrl, myTag } from "../utils/config";
import { myFetch } from "../utils/common";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useMedia = (update, setLoading) => {
  const [mediaArray, setMediaArray] = useState([]);

  const loadMedia = async () => {
    setLoading(true);
    try {
      const media = await myFetch(`${baseUrl}/tags/${myTag}`);
      const mediaDetails = await Promise.all(
        media.map(
          async (item) => await myFetch(`${baseUrl}/media/${item.file_id}`)
        )
      );
      setMediaArray(
        mediaDetails.sort((a, b) => (a.time_added > b.time_added ? -1 : 1))
      );
    } catch (error) {
      console.error("loadMedia():", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  const postMedia = async (token, data) => {
    try {
      const options = {
        method: "POST",
        headers: { "x-access-token": token },
        body: data,
      };
      const res = await myFetch(`${baseUrl}/media`, options);
      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  useEffect(() => {
    loadMedia();
  }, [update]);

  return { mediaArray, postMedia };
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
      throw new Error(error.message);
    }
  };

  return { postLogin };
};

const useUser = () => {
  const getUserById = async (token, id) => {
    try {
      const options = {
        method: "GET",
        headers: { "x-access-token": token },
      };
      const user = await myFetch(`${baseUrl}/users/${id}`, options);
      return user;
    } catch (error) {
      throw new Error(error.message);
    }
  };

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

  const postUser = async (data) => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      const res = await myFetch(`${baseUrl}/users`, options);
      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const checkUsername = async (username) => {
    try {
      const res = await myFetch(`${baseUrl}/users/username/${username}`);
      return res.available;
    } catch (error) {
      console.error("checkUsername()", error);
    }
  };

  const putUser = async (data) => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const options = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify(data),
      };
      const res = await myFetch(`${baseUrl}/users`, options);
      console.log(res);
      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return { getUserById, getUserByToken, postUser, checkUsername, putUser };
};

const useTag = () => {
  const getFilesByTag = async (tag) => await myFetch(`${baseUrl}/tags/${tag}`);

  const postTag = async (token, tag) => {
    const options = {
      method: "POST",
      headers: {
        "x-access-token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tag),
    };
    try {
      const res = await myFetch(`${baseUrl}/tags`, options);
      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return { getFilesByTag, postTag };
};

const useFavorite = () => {
  const getFavoritesById = async (token, id) => {
    const options = {
      method: "GET",
      headers: {
        "x-access-token": token,
      },
    };
    try {
      const favorites = await myFetch(
        `${baseUrl}/favourites/file/${id}`,
        options
      );
      const favoritesDetails = await Promise.all(
        favorites.map(
          async (f) => await myFetch(`${baseUrl}/users/${f.user_id}`, options)
        )
      );
      return favoritesDetails;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const addFavorite = async (token, id) => {
    const options = {
      method: "POST",
      headers: {
        "x-access-token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ file_id: id }),
    };
    try {
      const res = await myFetch(`${baseUrl}/favourites`, options);
      return res;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  return { getFavoritesById, addFavorite };
};

export { useMedia, useLogin, useUser, useTag, useFavorite };
