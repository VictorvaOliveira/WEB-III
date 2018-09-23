function viaGet() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            var message = document.getElementById("message");
            message.innerHTML = xhr.responseText;
        }
    };
    var nome = document.getElementById("nome");
    var idade = document.getElementById("idade");
    xhr.open("GET", "Server?nome=" + encodeURIComponent(nome.value) + "&idade="
            + encodeURIComponent(idade.value), true);
    xhr.send(null);
}

function viaPost() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            var message = document.getElementById("message");
            message.innerHTML = xhr.responseText;
        }
    };
    var nome = document.getElementById("nome");
    var idade = document.getElementById("idade");
    var params = "nome=" + encodeURIComponent(nome.value) + "&idade="
            + encodeURIComponent(idade.value);
    xhr.open("POST", "Server", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Content-length", params.length);
    xhr.send(params);
}