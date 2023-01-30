let DIMENSION = 9; //size of the field
let arr = Array.from(Array(DIMENSION), () => {
  return new Array(DIMENSION).fill(0);
});
//Generate unique random numbers between 0 and DIMENSION^2-1
function randomNumbers(DIMENSION) {
  let randomNumbers = [];
  while (randomNumbers.length < DIMENSION + 1) {
    let r = Math.floor(Math.random() * Math.pow(DIMENSION, 2));
    if (randomNumbers.indexOf(r) === -1) randomNumbers.push(r);
  }
  return randomNumbers;
}

//console.log(randomNumbers(DIMENSION));

let rn = randomNumbers(DIMENSION);

//console.log(rn);
//Generates coordinates for the bombs using the array of random numbers as paratemers
function coodinatesBombs(r) {
  let coor = [];
  for (let index = 0; index < r.length; index++) {
    let a = Math.floor(r[index] / DIMENSION);
    coor.push({ i: a, j: r[index] - a * DIMENSION });
  }
  return coor;
}
//console.log(coodinatesBombs(rn));
//Surrounding coordinates for a single bomb
export function surroundingSingleCoor(c) {
  let a = [];
  let b = [];
  a.push({ i: c.i - 1, j: c.j - 1 });
  a.push({ i: c.i - 1, j: c.j });
  a.push({ i: c.i - 1, j: c.j + 1 });
  a.push({ i: c.i, j: c.j - 1 });
  a.push({ i: c.i, j: c.j + 1 });
  a.push({ i: c.i + 1, j: c.j - 1 });
  a.push({ i: c.i + 1, j: c.j });
  a.push({ i: c.i + 1, j: c.j + 1 });

  for (let index = 0; index < a.length; index++) {
    if (a[index].i !== -1 && a[index].i !== DIMENSION && a[index].j !== -1 && a[index].j !== DIMENSION) {
      b.push(a[index]);
    }
  }
  return b;
}

//Get surrounding coordinates for all the bombs
function surroundingCoor(coor) {
  let c = [];
  for (let index = 0; index < coor.length; index++) {
    c.push(...surroundingSingleCoor(coor[index]));
  }
  return c;
}
//console.log(surroundingCoor(coodinatesBombs(rn)));

//Applying values to the global array

export let a = coodinatesBombs(rn);
function applyValues() {
  let b = surroundingCoor(a);

  for (let index = 0; index < a.length; index++) {
    arr[a[index].i][a[index].j] = -1;
  }
  for (let index = 0; index < b.length; index++) {
    if (arr[b[index].i][b[index].j] !== -1) {
      arr[b[index].i][b[index].j] = arr[b[index].i][b[index].j] + 1;
    }
  }
  return arr.slice();
}

export const minesArr = applyValues();
//----------------------------------------------------------------------------------
const emptySurroundings = (z) => {
  let zeros = [];
  let temp = [];
  z.initial.forEach((element) => {
    [element, ...surroundingSingleCoor(element)].forEach((element) => {
      if (temp.some((item) => item.i === element.i && item.j === element.j) === false) {
        temp.push(element);
      }
    });
  });

  temp.forEach((element) => {
    if (z.allCoor.some((item) => item.i === element.i && item.j === element.j) === false) {
      z.allCoor.push(element);
      if (minesArr[element.i][element.j] === 0) {
        zeros.push(element);
      }
    }
  });
  return { initial: zeros, allCoor: z.allCoor };
};

export function otherf(obj) {
  while (obj.initial.length !== 0) {
    obj = emptySurroundings(obj);
  }
  return obj;
  //console.log(obj.allCoor);
}
