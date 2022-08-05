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

new GitHubCalendar(".calendar", "abdallah-sala7");