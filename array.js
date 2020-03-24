const IndexedArray = new Proxy(Array, {
  // trap for 'new' operator
  construct: (target, [originalArray]) => {
    // index array when created
    const index = {};
    originalArray.forEach(item => {
      index[item.id] = item;
    });

    const newArray = new target(...originalArray);
    // we know when item is pushed to array
    // when pushed, this returns a function
    return new Proxy(newArray, {
      get: (target, name) => {
        if (name === "push") {
          return item => {
            //indexes by id
            index[item.id] = item;
            // so item is actually pushed
            return target[name].call(target, item);
          };
        } else if (name === "findById") {
          return searchId => {
            return index[searchId];
          };
        }
        return target[name]; // so other methods can be accessed on array (pop etc)
      }
    });
  }
});

let bears = new IndexedArray([
  { id: 2, name: "grizzly" },
  { id: 4, name: "black" },
  { id: 3, name: "polar" }
]);

bears.push({
  id: 55,
  name: "brown"
});

const brown = bears.findById(55);
console.log(brown);

// // bad way to find bear with id.
// let found = null;
// bears.forEach(bear => {
//   if (bear.id === 3) {
//     found = bear;
//   }
// });

// // better, but has to be redone when array changes
// const index = {};
// bears.forEach(bear => {
//   index[bear.id] = bear;
// });
// console.log(index);
// const polar = index[3];
// const black = index[4];

// Proxy
