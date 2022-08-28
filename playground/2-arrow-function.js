// const sq = (x) => x * x;

// console.log(sq(5));

const myEvent = {
  name: "Birthday Party",
  guestList: ["Ammar", "Ahmed", "Ali"],
  printGuestList() {
    console.log("Guest List for BD: " + this.name);
    this.guestList.forEach((guest) =>
      console.log(guest + " is attending " + this.name)
    );
  },
};

myEvent.printGuestList();
