const navsBtn = document.querySelectorAll('.nav-item');
const nav = document.querySelector('nav');

// add event listener to navs

navsBtn.forEach(navs =>{
    navs.addEventListener('click', ()=>{
      document.querySelector('.nav-item.active').classList.remove('active');
      navs.classList.add('active');

      let target = navs.dataset.target;
  
      const pages = document.querySelectorAll('.page');
      pages.forEach(page =>{
        if(page.classList.contains(target)){
          page.scrollIntoView({behavior: 'smooth'});
        }
      })
    })
})


// auto nav hide on scroll

let isStuk, ticking = false;
let scrollPosition = window.scrollY ;

document.addEventListener('scroll', ()=>{
  const scrollY = window.scrollY;
  if(!ticking){

    window.requestAnimationFrame(()=>{

      if(scrollY > 50 && !isStuk){
        isStuk = true;
        nav.classList.add('is-hide');
      }

      if(scrollY < scrollPosition && isStuk){
        isStuk = false;
        nav.classList.remove('is-hide');
      }

      scrollPosition = scrollY;
      ticking = false;
    });
    ticking = true;
  }
});



// type writer effect
const textDisplay = document.querySelector('.span-skils')
const phrases = ['frontend developer', 'android developer', 'reactjs developer']
let i = 0
let j = 0 
let currentPhrase = []
let isDeleting = false
let isEnd = false

function loop () {
  isEnd = false
  textDisplay.innerHTML = currentPhrase.join('')

  if (i < phrases.length) {

    if (!isDeleting && j <= phrases[i].length) {
      currentPhrase.push(phrases[i][j])
      j++
      textDisplay.innerHTML = currentPhrase.join('')
    }

    if(isDeleting && j <= phrases[i].length) {
      currentPhrase.pop(phrases[i][j])
      j--
      textDisplay.innerHTML = currentPhrase.join('')
    }

    if (j == phrases[i].length) {
      isEnd = true
      isDeleting = true
    }

    if (isDeleting && j === 0) {
      currentPhrase = []
      isDeleting = false
      i++
      if (i === phrases.length) {
        i = 0
      }
    }
  }
  const spedUp = Math.random() * (80 -50) + 50
  const normalSpeed = Math.random() * (300 -200) + 200
  const time = isEnd ? 2000 : isDeleting ? spedUp : normalSpeed
  setTimeout(loop, time)
}

loop()

// add project to portfolio and filter it

const portfolio = document.querySelector('.projects-info');
const filterBtn = document.querySelectorAll('.filter-btn button');

fetch('assets/js/portfolio.json')
.then((response) => response.json())
.then((data) => {
  data.forEach((project) => {
    const projectItem = document.createElement('div');
    projectItem.classList.add(`project-item`);
    projectItem.classList.add(`${project.cat}`);

    projectItem.innerHTML =`
      <img 
        src="assets/images/hilton.webp" 
        alt="${project.title}" 
        loading="lazy" 
        class="project-img" 
      />

      <div class="projects-link">
        <a href="${project.demo}">
            <img 
              src="assets/images/icons/link-solid.svg" 
              alt="project demo link" 
              loading="lazy" 
            />
        </a>

        <a href="${project.github}">
            <img 
              src="assets/images/icons/code-slash.svg" 
              alt="project code in github link"
              loading="lazy" 
            />
        </a>
      </div> `

    portfolio.appendChild(projectItem);
  })
});

filterBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    const filter = btn.dataset.filter;
    const projectItem = document.querySelectorAll('.project-item');

    btn.parentElement.querySelector('.active').classList.remove('active');
    btn.classList.add('active');

    projectItem.forEach((item) => {
      if (filter === 'all') {
        item.style.display = 'block';
      } else {
        if (item.classList.contains(filter)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      }
    });
  });
});