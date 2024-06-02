import drawClosedStringerStraight from "./closeStringerStraight.js";

const renderStairCase = (store, scene) => {

  const { stairCaseType, stringerType, sizes } = store;
  
  switch (stairCaseType) {
    case 'straight':
      if (stringerType === 'closed') {
        drawClosedStringerStraight(scene, sizes);
      }
  }
};

export default renderStairCase;