function matrix(dimention, startingCoor = []) {
  //No bomb is gonna be in this coordinates startingCoor
  let randomNumbers = (() => {
    let rn = [];
    while (rn.length < dimention + 1) {
      let r = Math.floor(Math.random() * Math.pow(dimention, 2));
      if (rn.indexOf(r) === -1 && r !== startingCoor[0] * dimention + startingCoor[1]) rn.push(r);
    }
    return rn;
  })();

  let emptyArray = (() => {
    return Array.from(Array(dimention), () => {
      return new Array(dimention).fill(0);
    });
  })();

  //Generates coordinates for the bombs using the array of random numbers as paratemers
  let coordinatesBombs = (() => {
    let coor = randomNumbers.map((item) => {
      let a = Math.floor(item / dimention);
      //console.log(item, `${a},${item - a * dimention}`);
      return { i: a, j: item - a * dimention };
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
    const b = a.filter((item) => item.i !== -1 && item.i !== dimention && item.j !== -1 && item.j !== dimention);
    return b;
  }
  //Get surrounding coordinates for all the bombs
  function surroundingCoor(coor) {
    const c = coor.map((item) => surroundingSingleCoo(item));
    const f = c.flat();
    return f;
  }

  let applyValues = (() => {
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
    emptySurroundings({ initial, allCoor }) {
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
          if (applyValues[element.i][element.j] === 0) {
            zeros.push(element);
          }
        }
      });
      return { initial: zeros, allCoor: allCoor };
    },
    otherf(obj) {
      while (obj.initial.length !== 0) {
        obj = this.emptySurroundings(obj);
      }
      return obj;
    },
    get applyValues() {
      return applyValues;
    },
    get coordinatesBombs() {
      return coordinatesBombs;
    },
  };
}

export default matrix;
