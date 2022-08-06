let navsBtn = document.querySelectorAll('nav ul li');

// add event listener to navs

navsBtn.forEach(e =>{
    e.addEventListener('click', ()=>{
        navsBtn.forEach(e=>{
            e.classList.remove('active');
        })
        e.classList.add('active');
    })
})

// type writer effect
const textDisplay = document.querySelector('.span-skils')
const phrases = ['frontend developer', 'android developer', 'reactjs developer.']
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


// filter projects
const filterBtn = document.querySelectorAll('.filter-btn button');
const projects = document.querySelectorAll('.project-item');

filterBtn.forEach(e=>{
    e.addEventListener('click', ()=>{
        filterBtn.forEach(e=>{
            e.classList.remove('active');
        })
        e.classList.add('active');

        let filter = e.dataset.filter;
        projects.forEach(e=>{
            e.classList.remove('hide');
            if(!e.classList.contains(filter) && filter != 'all'){
                e.classList.add('hide');
            }
        })
    })
})