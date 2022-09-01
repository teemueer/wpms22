export const myFetch = async (url) => {
  try {
    const res = await fetch(url);
    const json = await res.json();
    return json;
  } catch (error) {
    console.error("myFetch():", error);
  }
};
