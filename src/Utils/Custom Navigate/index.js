const postNavigate = () => (url) => {
  if (typeof url === "string") {
    // send tokens to parent window
    window.parent.postMessage(
      {
        type: "url",
        data: url,
      },
      "*"
    );
  } else {
    console.log("error send link");
    throw new Error("The link must be string!!");
  }
};

export default postNavigate;
