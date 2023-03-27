const parser = new DOMParser();

const fetchFlag = async (url) => {
  try {
    const flagLocation = await fetch(url);
    if (!flagLocation.ok) {
      throw new Error("The flag was not located.");
    } else {
      const flagLocationResponse = await flagLocation.text();
      const flagHTML = parser.parseFromString(
        flagLocationResponse,
        "text/html"
      );
      const flag = flagHTML.querySelector("body").innerText;

      return flag;
    }
  } catch (error) {
    throw new Error(error);
  }
};

export default fetchFlag;
