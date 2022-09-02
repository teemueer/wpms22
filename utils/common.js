export const myFetch = async (url, options = {}) => {
  try {
    const res = await fetch(url, options);
    const json = await res.json();
    if (res.ok) {
      return json;
    } else {
      //console.error(json.message);
      throw new Error(json.message);
    }
  } catch (error) {
    //console.error("myFetch():", error);
    throw new Error(error.message);
  }
};
