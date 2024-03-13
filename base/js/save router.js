// document.querySelectorAll(".dash-btn").forEach((btn) => {
//   btn.addEventListener("click", route);
// });

// const routes = {
//   404: "/pages/404.html",
//   "/": "/pages/allstats.html",
//   "/profile": "/pages/profile.html",
//   "/addcontent": "/pages/addcontent.html",
// };

// const handleLocation = async () => {
//   const path = window.location.pathname;
//   const route = routes[path] || routes[404];
//   console.log("Path:", path);
//   console.log("Route:", route);
//   const html = await fetch(route).then((data) => data.text());
//   document.getElementById("main-container-dash").innerHTML = html;
// };

// const route = (e) => {
//   e = e || window.event;
//   e.preventDefault();
//   window.history.pushState({}, "", e.target.href);
//   handleLocation();
// };

// document.querySelectorAll(".dash-btn").forEach((btn) => {
//   btn.addEventListener("click", route);
// });

// window.onpopstate = handleLocation;
// handleLocation();
