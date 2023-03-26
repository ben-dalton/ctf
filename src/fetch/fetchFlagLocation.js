const parser = new DOMParser();

const fetchFlagLocation = async () => {
  const challenge = await fetch(
    "https://tns4lpgmziiypnxxzel5ss5nyu0nftol.lambda-url.us-east-1.on.aws/challenge"
  );
  const challengeResponse = await challenge.text();
  const challengeHTML = parser.parseFromString(challengeResponse, "text/html");

  let flagLocation = "";

  if (challengeHTML) {
    const markers = challengeHTML.querySelectorAll('section[id*="11"]');
    markers.forEach((marker1) => {
      if (marker1) {
        const marker2 = marker1.querySelector('main[id*="22"]');
        if (marker2) {
          const marker3 = marker2.querySelector('article[id*="33"]');
          if (marker3) {
            const flagElement = marker3.querySelector("p.flag");
            if (flagElement && flagElement.hasAttribute("value")) {
              let flagValue = flagElement.getAttribute("value");
              flagLocation += flagValue;
            }
          }
        }
      }
    });
  }

  return flagLocation;
};

export default fetchFlagLocation;
