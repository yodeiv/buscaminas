function matrix(dimention, startingCoor = [], numberOfMines = 10) {
  //No bomb is gonna be in this coordinates startingCoor
  let randomNumbers = (() => {
    let rn = [];
    while (rn.length < numberOfMines) {
      let r = Math.floor(Math.random() * dimention[0] * dimention[1]);
      if (rn.indexOf(r) === -1 && r !== startingCoor[0] * dimention[1] + startingCoor[1]) rn.push(r);
    }
    return rn;
  })();

  let emptyArray = (() => {
    return Array.from(Array(dimention[0]), () => {
      return new Array(dimention[1]).fill(0);
    });
  })();

  //Generates coordinates for the bombs using the array of random numbers as paratemers
  let coordinatesBombs = (() => {
    let coor = randomNumbers.map((item) => {
      let a = Math.floor(item / dimention[1]);
      //console.log(item, `${a},${item - a * dimention}`);
      return { i: a, j: item - a * dimention[1] };
    });
    return coor;
  })();
  //Surrounding coordinates for a single bomb
  function surroundingSingleCoo(coor) {
    const a = [
      { i: coor.i - 1, j: coor.j - 1 },
      { i: coor.i - 1, j: coor.j },
      { i: coor.i - 1, j: coor.j + 1 },
      { i: coor.i, j: coor.j - 1 },
      { i: coor.i, j: coor.j + 1 },
      { i: coor.i + 1, j: coor.j - 1 },
      { i: coor.i + 1, j: coor.j },
      { i: coor.i + 1, j: coor.j + 1 },
    ];
    const b = a.filter((item) => item.i !== -1 && item.i !== dimention[0] && item.j !== -1 && item.j !== dimention[1]);
    return b;
  }
  //Get surrounding coordinates for all the bombs
  function surroundingCoor(coor) {
    const c = coor.map((item) => surroundingSingleCoo(item));
    return c.flat();
  }

  function emptySurroundings({ initial, allCoor }) {
    let zeros = [];
    let temp = [];
    initial.forEach((element) => {
      [element, ...surroundingSingleCoo(element)].forEach((element) => {
        if (temp.some((item) => item.i === element.i && item.j === element.j) === false) {
          temp.push(element);
        }
      });
    });

    temp.forEach((element) => {
      if (allCoor.some((item) => item.i === element.i && item.j === element.j) === false) {
        allCoor.push(element);
        if (mainMatrix[element.i][element.j] === 0) {
          zeros.push(element);
        }
      }
    });
    return { initial: zeros, allCoor: allCoor };
  }
  //Applying values to get the matrix
  let mainMatrix = (() => {
    let b = surroundingCoor(coordinatesBombs);
    for (let index = 0; index < coordinatesBombs.length; index++) {
      emptyArray[coordinatesBombs[index].i][coordinatesBombs[index].j] = -1;
    }
    for (let index = 0; index < b.length; index++) {
      if (emptyArray[b[index].i][b[index].j] !== -1) {
        emptyArray[b[index].i][b[index].j] = emptyArray[b[index].i][b[index].j] + 1;
      }
    }
    return emptyArray.slice();
  })();

  return {
    dimention,

    recursive(obj) {
      while (obj.initial.length !== 0) {
        obj = emptySurroundings(obj);
      }
      return obj;
    },
    get mainMatrix() {
      return mainMatrix;
    },
    get coordinatesBombs() {
      return coordinatesBombs;
    },
  };
}

export default matrix;

export const formatNumber = (n) => {
  //convert from -3 to ["0", "-", "3"]
  const str = n.toString().split("").reverse();
  const fill = ["0", "0", "0"];
  str.forEach((item, key) => {
    fill[key] = item;
  });
  return fill.reverse();
};
