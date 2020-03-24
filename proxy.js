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
  }
});

//proxyBears.asdf = true; // Get error

proxyBears.polar = true;
console.log(bears.polar); // returns value altered by proxy
