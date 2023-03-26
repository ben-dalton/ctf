const parser = new DOMParser();

const fetchFlag = async (url) => {
  const flagLocation = await fetch(url);
  const flagLocationResponse = await flagLocation.text();
  const flagHTML = parser.parseFromString(flagLocationResponse, "text/html");
  const flag = flagHTML.querySelector("body").innerText;

  return flag;
};

export default fetchFlag;
