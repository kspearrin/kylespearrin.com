document.getElementById("year").innerHTML = new Date().getFullYear();

if(location.search === "?emailed=true") {
    document.getElementById("email-success").style.display = "block";
    
    if (history.replaceState) {
        history.replaceState({}, '', location.pathname);
    }
}

window.addEventListener("load", function(){
   ga('create', 'UA-1080667-3', 'auto');
   ga('send', 'pageview');
});

