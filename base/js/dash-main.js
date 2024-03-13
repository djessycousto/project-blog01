function showPage(pageId) {
  // Hide all pages
  const pages = document.querySelectorAll(".page");

  //   console.log(pages);
  pages.forEach((page) => {
    console.log(page, "pages to remove");
    page.classList.remove("active");
  });

  // Show the selected page
  const selectedPage = document.getElementById(pageId);
  console.log(selectedPage, "page id");
  selectedPage.classList.add("active");
}

const btns = document.querySelectorAll(".dash-btn");

const arrbtns = Array.from(btns);
// console.log(arrbtns);

arrbtns.map((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    console.log(e.target.dataset.id, "id");
    const pageId = e.target.dataset.id; //page 1
    showPage(pageId);
  });
});

// chart

const ctx = document.getElementById("myChart");

const chart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Red", "Blue", "Yellow", "Green"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5],
        borderWidth: 1,
      },
    ],
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

// Chart.canvas.parentNode.style.height = "128px";
// Chart.canvas.parentNode.style.width = "128px";
