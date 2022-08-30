const name = "Ammar";

const age = 34;

const user = {
  name,
  age,
  location: "Egypt",
};

console.log(user);

// Object destructuring

const product = {
  label: "Red notebook",
  price: 3,
  stock: 201,
  salePrice: undefined,
};

// extract the label fom product and rename it productLabel
// destructing rating and provide a default value in case it's not available
const { label: productLabel, price, rating = 5 } = product;

console.log(label, price);

const transaction = (type, { label, stock }) => {
  console.log(type, label, stock);
};

transaction("order", product);
