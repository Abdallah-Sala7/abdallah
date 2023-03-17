// loading page

const preloader = document.querySelector(".loading");
window.addEventListener("load", function () {
  preloader.style.display = "none";
  document.body.style.overflow = "auto";
});

// auto nav hide on scroll

const nav = document.querySelector("nav");
let isStuk,
  ticking = false;
let scrollPosition = window.scrollY;

document.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  if (!ticking) {
    window.requestAnimationFrame(() => {
      if (scrollY > 50 && !isStuk) {
        isStuk = true;
        nav.classList.add("is-hide");
      }

      if (scrollY < scrollPosition && isStuk) {
        isStuk = false;
        nav.classList.remove("is-hide");
      }

      scrollPosition = scrollY;
      ticking = false;
    });
    ticking = true;
  }
});

// type writer effect
const textDisplay = document.querySelector(".span-skils");
const phrases = [
  "frontend developer",
  "react developer",
  "react native",
  "react js",
];
let i = 0;
let j = 0;
let currentPhrase = [];
let isDeleting = false;
let isEnd = false;

function loop() {
  isEnd = false;
  textDisplay.innerHTML = currentPhrase.join("");

  if (i < phrases.length) {
    if (!isDeleting && j <= phrases[i].length) {
      currentPhrase.push(phrases[i][j]);
      j++;
      textDisplay.innerHTML = currentPhrase.join("");
    }

    if (isDeleting && j <= phrases[i].length) {
      currentPhrase.pop(phrases[i][j]);
      j--;
      textDisplay.innerHTML = currentPhrase.join("");
    }

    if (j == phrases[i].length) {
      isEnd = true;
      isDeleting = true;
    }

    if (isDeleting && j === 0) {
      currentPhrase = [];
      isDeleting = false;
      i++;
      if (i === phrases.length) {
        i = 0;
      }
    }
  }
  const spedUp = Math.random() * (80 - 50) + 50;
  const normalSpeed = Math.random() * (300 - 200) + 200;
  const time = isEnd ? 2000 : isDeleting ? spedUp : normalSpeed;
  setTimeout(loop, time);
}

loop();

// add project to portfolio and filter it

const portfolio = document.querySelector(".projects-info");
const filterBtn = document.querySelectorAll(".filter-btn button");

fetch("assets/js/portfolio.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((project) => {
      const projectItem = document.createElement("div");
      projectItem.classList.add(`project-item`);
      projectItem.classList.add(`${project.cat}`);

      projectItem.innerHTML = `
      <img 
        src="${project.image}" 
        alt="${project.title}" 
        loading="lazy" 
        class="project-img" 
      />

      <div class="projects-link">
        <a 
          href="${project.demo}" 
          title="${project.title}"
          target="_blank"
          rel="noopener noreferrer" 
          >
            <img 
              src="assets/images/icons/link-solid.svg" 
              alt="project demo link" 
              loading="lazy" 
            />
        </a>

        <a 
          href="${project.github}"
          title="${project.title}"
          target="_blank"
          rel="noopener noreferrer" 
        >
            <img 
              src="assets/images/icons/code-slash.svg" 
              alt="project code in github link"
              loading="lazy" 
            />
        </a>
      </div> `;

      portfolio.appendChild(projectItem);
    });
  });

filterBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const filter = btn.dataset.filter;
    const projectItem = document.querySelectorAll(".project-item");

    btn.parentElement.querySelector(".active").classList.remove("active");
    btn.classList.add("active");

    projectItem.forEach((item) => {
      if (filter === "all") {
        item.style.display = "block";
      } else {
        if (item.classList.contains(filter)) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      }
    });
  });
});

// send email

const formContint = document.querySelector(".form-contain");

formContint.addEventListener("submit", (e) => {
  emailjs
    .send("service_oekycvj", "template_yuv5jpc", {
      from_name: document.getElementById("fromName").value,
      from_email: document.getElementById("fromEmail").value,
      from_jop: document.getElementById("fromJop").value,
      from_mobile: document.getElementById("fromMobile").value,
      message: document.getElementById("message").value,
    })
    .then(
      function () {
        document.getElementById("fromName").value = "";
        document.getElementById("fromEmail").value = "";
        document.getElementById("fromJop").value = "";
        document.getElementById("message").value = "";
        document.getElementById("fromMobile").value = "";
        alert("Your message has been sent successfully");
      },
      function (error) {
        console.log("FAILED", error);
      }
    );
  e.preventDefault();
});
