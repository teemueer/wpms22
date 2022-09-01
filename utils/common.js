export const myFetch = async (url, options = {}) => {
  try {
    const res = await fetch(url, options);
    const json = await res.json();
    return json;
  } catch (error) {
    console.error("myFetch():", error);
  }
};
