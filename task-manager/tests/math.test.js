const { calcTip, fahrenhiteToCelsius, celsiusToFagrenhite, add } = require("../src/math");

test("Should calculate total with Tip", () => {
  const ttl = calcTip(10, 0.3);
  expect(ttl).toBe(13);
  //   if (ttl !== 13) throw new Error(`Total should be 13. Got ${ttl}`);
});

test("Should calculate total with default Tip", () => {
  const ttl = calcTip(10);
  expect(ttl).toBe(12.5);
});

test("Should convert 32 F to 0 C", () => {
  const temp = fahrenhiteToCelsius(32);
  expect(temp).toBe(0);
});

test("Should convert 0 C to 32 F", () => {
  const temp = celsiusToFagrenhite(0);
  expect(temp).toBe(32);
});

// test("Should Add 2 numbers", (done) => {
//   add(2, 3).then((sum) => {
//     expect(sum).toBe(5);
//     done();
//   });
// });

// test("Should add two numbers Async", async () => {
//   const ttl = await add(2, 3);
//   expect(ttl).toBe(5);
// });
