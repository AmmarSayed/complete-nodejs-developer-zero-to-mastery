const socket = io();
// Elements
const $root = document.getElementById("root");
const $messageForm = document.getElementById("messageForm");
const $messageFormBtn = document.getElementById("messageFormBtn");
const $btnSendLocation = document.getElementById("send-location");
const $sideBar = document.getElementById("chat__sidebar");

// Tempaltes
const $messageTemplates = document.getElementById("message-template").innerHTML;
const $locationTemplate = document.getElementById("link-template").innerHTML;
const $sideBarTemplate = document.getElementById("sidebar-template").innerHTML;

// Options
const { username = "anonymouse", room = "alex" } = Qs.parse(location.search, { ignoreQueryPrefix: true });

const autoScroll = () => {
  // get the new message element
  const $lastElement = $root.lastElementChild;

  if (!$lastElement || !$lastElement.previousElementSibling) return;

  let options = {
    root: $root,
    rootMargin: "0px",
    threshold: 0.5,
  };

  let callback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        $lastElement.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    });
  };

  let observer = new IntersectionObserver(callback, options);
  observer.observe($lastElement.previousElementSibling);

  // // Height of the new message
  // const newMessageStyles = getComputedStyle($newMessage);
  // const newMessageMargin = parseInt(newMessageStyles.marginBottom);
  // const newMessageHeight = $newMessage.offsetHeight + newMessageMargin;

  // // get visible height
  // const visibleHeight = $root.offsetHeight;

  // // get height of messages container
  // const containerHeight = $root.scrollHeight;

  // // calculate how far have i scrolled
  // const scrollOffset = $root.scrollTop + visibleHeight;

  // if (containerHeight - newMessageHeight <= scrollOffset) {
  //   $root.scrollTop = $root.scrollHeight;
  // }
};

//////////////////////
socket.on("message", async ({ username, message, createdAt }) => {
  // $root.insertAdjacentHTML("afterbegin", `<p>${message}</p>`);
  const html = Mustache.render($messageTemplates, {
    username,
    message,
    createdAt: moment(createdAt).format("h:mm a"),
  });
  $root.insertAdjacentHTML("beforeend", html);
  autoScroll();
});

//////////////////////

socket.on("locationMessage", ({ username, message, createdAt }) => {
  // const locationLink = Mustache.render($messageTemplates, {
  //   message: `<a href=${link}>Show in Map</a>`,
  // });

  // $root.insertAdjacentHTML("afterbegin", locationLink);

  const html = Mustache.render($locationTemplate, {
    username,
    link: message,
    createdAt: moment(createdAt).format("h:mm a"),
  });

  $root.insertAdjacentHTML("beforeend", html);
  // autoScroll();
});

//////////////////////

socket.on("roomData", ({ room, users }) => {
  const html = Mustache.render($sideBarTemplate, { room, users });
  $sideBar.innerHTML = html;
});

//////////////////////
$messageForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // disable form
  $messageFormBtn.setAttribute("disabled", "true");

  const $messageInput = e.target.elements.messageBox;

  socket.emit("reply", $messageInput.value, (error) => {
    if (error) {
      $messageFormBtn.removeAttribute("disabled");

      return console.log(error);
    }
    console.log("The reply is received!");
    $messageFormBtn.removeAttribute("disabled");
  });
  // enable form

  $messageInput.value = "";
  $messageInput.focus();
});

//////////////////////
$btnSendLocation.addEventListener("click", () => {
  $btnSendLocation.setAttribute("disabled", "true");
  const success = (position) => {
    const { latitude, longitude } = position.coords;

    // socket.emit("reply", `My Location: Latitude: ${latitude} °, Longitude: ${longitude} °`);
    socket.emit("sendLocation", { latitude, longitude }, (confMsg) => {
      if (confMsg === "error") return console.log("Failed:", confMsg);
      console.log("Location shared");
    });
  };

  const error = () => console.log("Unable to retrieve your location");

  if (!navigator.geolocation) {
    return console.log("Geolocation is not supported by your browser");
  }

  navigator.geolocation.getCurrentPosition(success, error);
  $btnSendLocation.removeAttribute("disabled");
});

//////////////////////
socket.emit("join", { username, room }, (error) => {
  if (error) {
    alert(error);
    //redirect to home
    location.href = "/";
  }
});

//////////////////////
