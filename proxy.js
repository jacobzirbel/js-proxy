let bears = { grizzly: true };

let grizzlyCount = 0;

// hanlder for when property is accessed
const proxyBears = new Proxy(bears, {
  get: function(target, prop) {
    if (prop === "grizzly") grizzlyCount++;
    return target[prop];
  }
});

proxyBears.grizzly;
proxyBears.grizzly;
proxyBears.grizzly;
proxyBears.grizzly;
console.log(proxyBears.grizzly); // true
console.log(grizzlyCount); // 5
