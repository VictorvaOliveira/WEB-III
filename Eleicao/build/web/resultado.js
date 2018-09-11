var ws;
function verResultado(msg){
    var votos = JSON.parse(msg.data);
    var total = votos.reduce((a,b) => a+b, 0);
    var output = document.getElementById("output");
    for (var i = 0; i < votos.length; i++) {
        var voto = votos[i];
        var li = output.getElementsByTagName("li").item(i);
        var spans = li.getElementsByTagName("span");
        spans[0].innerHTML = voto + "voto(s).";
        var barra =  li.getElementsByTagName("meter")[0];
        barra.value = (100*voto/total);
        spans[1].innerHTML = Math.round(10000 * voto/total)/100 + "%";
    }
    document.getElementById("total").innerHTML = total;
    algummetodo();
}

onload = setInterval("verResultado()", 5*1000);