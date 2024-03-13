// dashboard pages

function showPage(pageId) {
  // Hide all pages
  const pages = document.querySelectorAll(".page");
  pages.forEach((page) => page.classList.remove("active"));

  // Show the selected page
  const selectedPage = document.getElementById(pageId);
  console.log(selectedPage);
  selectedPage.classList.add("active");
}

const btns = document.querySelectorAll(".dash-btn");
// console.log(btns);

// this use textContent

// btns.forEach((btn) => {
//   btn.addEventListener("click", (e) => {
//     console.log(e.target.textContent.toLowerCase()); // i get id here b
//     showPage(e.target.textContent.toLowerCase()); //not working
//   });
// });
const arrbtns = Array.from(btns);
// console.log(arrbtns);

arrbtns.map((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(e.target.dataset.id);
    const pageId = e.target.dataset.id; //page 1
    showPage(pageId);
  });
});
