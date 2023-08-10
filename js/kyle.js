document.getElementById("year").innerHTML = new Date().getFullYear();

if(location.search === "?emailed=true") {
    document.getElementById("email-success").style.display = "block";
    
    if (history.replaceState) {
        history.replaceState({}, '', location.pathname);
    }
}

var form = document.getElementById("contact-form");
async function handleSubmit(event) {
  event.preventDefault();
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      "Accept": "application/json",
    }
  }).then(response => {
    if (response.ok) {
      document.getElementById("email-success").style.display = "block";
      form.reset();
    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, "errors")) {
          alert(data["errors"].map(error => error["message"]).join(", "));
        } else {
          alert("Oops! There was a problem submitting your form.");
        }
      })
    }
  }).catch(error => {
    alert("Oops! There was a problem submitting your form.");
  });
}
form.addEventListener("submit", handleSubmit);

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-1080667-3', 'auto');
    ga('send', 'pageview');
