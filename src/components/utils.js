let DIMENSION = 9; //size of the field
let arr = Array.from(Array(DIMENSION), () => {
  return new Array(DIMENSION).fill(0);
});
//Generate unique random numbers between 0 and DIMENSION^2-1
const randomNumbers = () => {
  let rn = [];
  while (rn.length < DIMENSION + 1) {
    let r = Math.floor(Math.random() * Math.pow(DIMENSION, 2));
    if (rn.indexOf(r) === -1) rn.push(r);
  }
  return rn;
};

//console.log(randomNumbers(DIMENSION));

//Generates coordinates for the bombs using the array of random numbers as paratemers
function coordinatesBombs(r) {
  let coor = r.map((item) => {
    let a = Math.floor(item / DIMENSION);
    return { i: a, j: item - a * DIMENSION };
  });
  return coor;
}
//console.log(coodinatesBombs(rn));
//Surrounding coordinates for a single bomb
function surroundingSingleCoor(c) {
  const a = [
    { i: c.i - 1, j: c.j - 1 },
    { i: c.i - 1, j: c.j },
    { i: c.i - 1, j: c.j + 1 },
    { i: c.i, j: c.j - 1 },
    { i: c.i, j: c.j + 1 },
    { i: c.i + 1, j: c.j - 1 },
    { i: c.i + 1, j: c.j },
    { i: c.i + 1, j: c.j + 1 },
  ];
  const b = a.filter((item) => item.i !== -1 && item.i !== DIMENSION && item.j !== -1 && item.j !== DIMENSION);
  return b;
}

//Get surrounding coordinates for all the bombs
function surroundingCoor(coor) {
  const c = coor.map((item) => surroundingSingleCoor(item));
  const f = c.flat();
  return f;
}
//console.log(surroundingCoor(coordinatesBombs(rn)));

//Applying values to the global array

export let a;

function applyValues() {
  a = coordinatesBombs(randomNumbers());
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
const emptySurroundings = ({ initial, allCoor }) => {
  let zeros = [];
  let temp = [];
  initial.forEach((element) => {
    [element, ...surroundingSingleCoor(element)].forEach((element) => {
      if (temp.some((item) => item.i === element.i && item.j === element.j) === false) {
        temp.push(element);
      }
    });
  });

  temp.forEach((element) => {
    if (allCoor.some((item) => item.i === element.i && item.j === element.j) === false) {
      allCoor.push(element);
      if (minesArr[element.i][element.j] === 0) {
        zeros.push(element);
      }
    }
  });
  return { initial: zeros, allCoor: allCoor };
};

export function otherf(obj) {
  while (obj.initial.length !== 0) {
    obj = emptySurroundings(obj);
  }
  return obj;
  //console.log(obj.allCoor);
}
