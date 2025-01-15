let toggleBtn = document.getElementById('toggle-btn');
let body = document.body;

let search = document.querySelector('.header .flex .search-form');

document.querySelector('#search-btn').onclick = () =>{
   search.classList.toggle('active');
   profile.classList.remove('active');
}

let sideBar = document.querySelector('.side-bar');

document.querySelector('#menu-btn').onclick = () =>{
   sideBar.classList.toggle('active');
   body.classList.toggle('active');
}

document.querySelector('#close-btn').onclick = () =>{
   sideBar.classList.remove('active');
   body.classList.remove('active');
}

window.onscroll = () =>{
   profile.classList.remove('active');
   search.classList.remove('active');

   if(window.innerWidth < 1200){
      sideBar.classList.remove('active');
      body.classList.remove('active');
   }
}