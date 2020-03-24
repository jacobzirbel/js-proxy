const person = {
  first: "Bear",
  last: "McBearison"
};

const cleverPerson = new Proxy(person, {
  get: (target, prop) => {
    // if the prop doesn't exist
    if (!(prop in target)) {
      // split prop into array by _
      // .map to loop through array
      // join together
      return prop
        .split("_")
        .map(part => {
          return target[part];
        })
        .join(" ");
    }
    return target[prop];
  }
});

cleverPerson.first; //will be normal
console.log(cleverPerson["first_last"]); // returns "Bear McBearison"

person.last = "asdfasdfasdf";
console.log(cleverPerson.first_last); // changes last as expected
