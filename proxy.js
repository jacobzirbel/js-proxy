let bears = { grizzly: true };

let grizzlyCount = 0;

// hanlder for when property is accessed
const proxyBears = new Proxy(bears, {
  get: (target, prop) => {
    if (prop === "grizzly") grizzlyCount++;
    return target[prop];
  },
  set: (target, prop, value) => {
    if (["grizzly", "brown", "polar"].indexOf(prop) === -1) {
      throw new Error("Not a known type of bear");
    }
    target[prop] = !value;
  },
  deleteProperty: (target, prop) => {
    console.log("you have deleted" + prop);
    delete target[prop];
  }
});

//proxyBears.asdf = true; // Get error

// proxyBears.polar = true;
// console.log(bears.polar); // returns value altered by proxy

// delete proxyBears.polar; // logs message when deleted
// delete bears.polar; // does not log message

function growl() {
  return "grrr";
}

const loudGrowl = new Proxy(growl, {
  apply: (target, thisArg, args) => {
    return target().toUpperCase() + "!!!";
  }
});

console.log(loudGrowl());
