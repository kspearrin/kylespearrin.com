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
  var success = document.getElementById("email-success");
  var failed = document.getElementById("email-failed");
  failed.style.display = success.style.display = "none";
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      "Accept": "application/json",
    }
  }).then(response => {
    if (response.ok) {
      success.style.display = "block";
      form.reset();
    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, "errors")) {
          var emailErrors = document.getElementById("email-errors");
          emailErrors.innerHTML = data["errors"].map(error => error["message"]).join(", ");
        }
        failed.style.display = "block";
      });
    }
  }).catch(error => {
    failed.style.display = "block";
  });
}
form.addEventListener("submit", handleSubmit);

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    ga('create', 'UA-1080667-3', 'auto');
    ga('send', 'pageview');
