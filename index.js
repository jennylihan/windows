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
  var username = prompt("Pick a location to look through.");
  localStorage.setItem("username", username);
  if (username != null) {
    window.transitionToPage(href);    
  }
}
