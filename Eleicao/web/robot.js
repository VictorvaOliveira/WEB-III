var ws;

function verResultado(msg) {
    var votos = JSON.parse(msg.data);
    var total = votos.reduce((a, b) => a + b, 0);
    var output = document.getElementById("output");
    for (var i = 0; i < votos.length; i++) {
        var voto = votos[i];
        var li = output.getElementsByTagName("li").item(i);
        var spans = li.getElementsByTagName("span");
        spans[0].innerHTML = voto + " voto(s).";
        var barra = li.getElementsByTagName("meter")[0];
        barra.value = (100 * voto / total);
        spans[1].innerHTML = Math.round(10000 * voto / total) / 100 + "%";
    }
    document.getElementById("total").innerHTML = total;
    coeficiente(votos, total);
}

function coeficiente(votos, total) {
    var votosValidos = total - votos[6] - votos[7];
    var quociente_eleitoral = Math.round(votosValidos / 21);
    var cadeiras = document.getElementById("cadeiras");
    for (var i = 0; i < 6; i++) {
        var li = cadeiras.getElementsByTagName("li").item(i);
        var spans = li.getElementsByTagName("span");
        var valor = Math.round(votos[i] / quociente_eleitoral) - 1;
        if (isNaN(valor) || !isFinite(valor))
            spans[0].innerHTML = 0;
        else
            spans[0].innerHTML = valor;
    }

    document.getElementById("quociente_eleitoral").innerHTML = quociente_eleitoral;
}


function votar() {
    var partido = Math.floor(Math.random() * 8);
    ws.send(partido);
}

function iniciarVotacao() {

    $("#output").hide();
    $("#start").click(function () {
        var wsUri = "ws://" + document.location.host + document.location.pathname + "urna";
        ws = new WebSocket(wsUri);
        console.log(wsUri);
        ws.onmessage = verResultado;
        //FUNÇÕES A SEREM INICIALIZADAS
        $("#iniciando").hide();
        $("#output").show();
        setInterval("votar()", 10*1000);
    });
}
onload = iniciarVotacao;