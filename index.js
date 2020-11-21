// adapted from https://stackoverflow.com/questions/47391462/how-to-do-transition-effects-between-two-html-pages
window.transitionToPage = function(href) {
    document.querySelector('body').style.opacity = 0
    setTimeout(function() {
        window.location.href = href
    }, 500)
}

document.addEventListener('DOMContentLoaded', function(event) {
    document.querySelector('body').style.opacity = 1
})

function setUp(href){
  var username = prompt("Which emotion space do you want to open up / create?\nIf you want to create a new space, type in the name.\nIf you want to see an existing space, try 'jenny's music' or 'mom' ", "jenny's music");
  localStorage.setItem("username", username);
  window.transitionToPage(href);
}
