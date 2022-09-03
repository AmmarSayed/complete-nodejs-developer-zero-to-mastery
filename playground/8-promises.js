// const doWorkPromise = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     // resolve([1, 2, 3, 4, 5]);
//     reject("This is an error");
//   }, 2000);
// });

// doWorkPromise
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));

const add = (a, b) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
    }, 200);
  });
};

add(1, 2)
  .then((sum) => add(sum, 3))
  .then((sum) => add(sum, 4))
  .then((sum) => add(sum, 5))
  .then((sum) => add(sum, 6))
  .then((result) => console.log(result))
  .catch((err) => console.log(err));
