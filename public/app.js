// Toggle Btn
const toggleBtn = document.querySelector('.toggle-btn');
const linksContainer = document.querySelector('.links-container');

toggleBtn.addEventListener('click', () =>{
    toggleBtn.classList.toggle('active');
    linksContainer.classList.toggle('show');
})

// Links to toggle the active class
const links = document.querySelectorAll('.link');
links.forEach(link => {
    link.addEventListener('click', () =>{
        links.forEach(ele => ele.classList.remove('active'));
        link.classList.add('active');
    })
});

// Creating dynamic project cards
const projectContainer = document.querySelector('.project-container');
projects.forEach(project =>{
    projectContainer.innerHTML += `
    <div class="project-card" data-tags="#all, ${project.tags}">
    <img src="img/${project.image}" class="projectImage" alt="">
    <div class="content">
        <h1 class="project-name">${project.name}</h1>
        <span class="tags">${project.tags}</span>
    </div>
    </div>
    `
})

// Filter
const filters = document.querySelectorAll('.filter-btn');

filters.forEach(filterBtn => {
    filterBtn.addEventListener('click', () =>{
        let id = filterBtn.getAttribute('id');
        let projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach(card =>{
            if(card.getAttribute('data-tags').includes(id)){
                card.classList.remove('hide');
            } else {
                card.classList.add('hide');
            }
        })

        filters.forEach(btn => btn.classList.remove('active'));
        filterBtn.classList.add('active');
    })
})

// Contact form
const contactBtn = document.querySelector('.contact-btn');
const firstName = document.querySelector('.first-name');
const lastName = document.querySelector('.last-name');
const email = document.querySelector('.email');
const msg = document.querySelector('.message');

contactBtn.addEventListener('click', () =>{
    if(firstName.value.length && lastName.value.length && email.value.length && msg.value.length){
        fetch('/mail', {
            method: 'post',
            headers: new Headers({ 'Content-Type': 'application/json'}),
            body: JSON.stringify({
                firstname: firstName.value,
                lastname: lastName.value,
                email: email.value,
                msg: msg.value
            })
        })
        .then(res => res.json())
        .then(data => {
            alert(data)
        })
    }
})