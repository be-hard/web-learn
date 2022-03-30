module.exports = function game(playAction) {
  const myActionNum = Math.ceil(Math.random() * 3);
  const actionMap = {
    1: "stone",
    2: "scissor",
    3: "cloth",
  };
  let myAction = actionMap[myActionNum];
  if (myAction === playAction) {
    return 0;
  } else if (
    (myAction === "stone" && playAction === "scissor") ||
    (myAction === "scissor" && playAction === "cloth") ||
    (myAction === "cloth" && playAction === "stone")
  ) {
    return 1;
  }else{
    return -1;
  }
};
