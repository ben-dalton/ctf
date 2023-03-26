const parser = new DOMParser();

const fetchFlag = async (flagLocation) => {
  const flagLocationFetch = await fetch(flagLocation);
  const flagLocationResponse = await flagLocationFetch.text();
  const flagHTML = parser.parseFromString(flagLocationResponse, "text/html");

  const theFlag = flagHTML.querySelector("body").innerText;
  return theFlag;
};

export default fetchFlag;
