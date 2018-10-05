var ws;
var sala;
function game() {
//Variáveis globais
    var casa_selecionada = null;
    var peca_selecionada = null;
    //Novas variáveis para armazenar a pontuação
    var pontos_pretas = 0;
    var pontos_brancas = 0;
//Funções
    function MontarTabuleiro() {
        var i;
        for (i = 0; i < 8; i++) {
            $("#tabuleiro").append("<div id='linha_" + i.toString() + "' class='linha' >");

            for (j = 0; j < 8; j++) {
                var nome_casa = "casa_" + i.toString() + "_" + j.toString();
                var classe = (i % 2 == 0 ? (j % 2 == 0 ? "casa_branca" : "casa_preta") : (j % 2 != 0 ? "casa_branca" : "casa_preta"));
                $("#linha_" + i.toString()).append("<div id='" + nome_casa + "' class='casa " + classe + "' />");

                if (classe == "casa_preta") {
                    if (i < 3) {
                        $("#" + nome_casa).append("<img src='peca_preta.png' class='peca' id='" + nome_casa.replace("casa", "peca_preta") + "'/>");
                    } else
                    if (i > 4) {
                        $("#" + nome_casa).append("<img src='peca_branca.png' class='peca' id='" + nome_casa.replace("casa", "peca_branca") + "'/>");
                    }

                }
            }
        }
    }

    MontarTabuleiro();

    $(".casa").click(function () {
        var aI, aJ, nI, nJ, dI, dJ;
        var casa_anterior, peca_anterior;
        if (peca_selecionada != null) {
            aI = parseInt(casa_selecionada.substr(5, 1));
            aJ = parseInt(casa_selecionada.substr(7, 1));

            nI = parseInt($(this).attr("id").substr(5, 1));
            nJ = parseInt($(this).attr("id").substr(7, 1));

            dI = parseInt(((aI - nI) < 0 ? (aI - nI) * (-1) : (aI - nI)));
            dJ = parseInt(((aJ - nJ) < 0 ? (aJ - nJ) * (-1) : (aJ - nJ)));
        }

        $("#" + casa_selecionada).removeClass("casa_selecionada");
        casa_anterior = casa_selecionada;
        peca_anterior = peca_selecionada;
        casa_selecionada = $(this).attr("id");
        $("#" + casa_selecionada).addClass("casa_selecionada");
        peca_selecionada = $("#" + casa_selecionada).children("img").attr("id");

        if (peca_selecionada == null) {
            $("#info_peca_selecionada").text("NENHUMA PECA SELECIONADA");
            if (peca_anterior != null) {
                if (((peca_anterior.indexOf("preta") >= 0) && (nI > aI)) || ((peca_anterior.indexOf("branca") >= 0) && (nI < aI))) {
                    var obj = $("#" + peca_anterior);
                    if ((dI == 1) && (dJ == 1)) {
                        $("#" + casa_anterior).remove("#" + peca_anterior);
                        $("#" + casa_selecionada).append(obj);
                    } else
                    if ((dI == 2) && (dJ == 2)) {
                        if ((peca_anterior.indexOf("branca") >= 0)) {
                            var casa_meio = null, peca_meio = null;
                            if (nJ < aJ) {
                                casa_meio = "#casa_" + (nI + 1).toString() + "_" + (nJ + 1).toString();
                            } else {
                                casa_meio = "#casa_" + (nI + 1).toString() + "_" + (nJ - 1).toString();
                            }
                            if ($(casa_meio).children().size() > 0)
                                peca_meio = $(casa_meio).children("img");

                            if (peca_meio != null) {
                                $("#compila").append(peca_meio);
                                peca_meio.remove();
                                pontos_brancas++;
                                $("#info_pontos_brancas").text(pontos_brancas.toString());
                                $("#" + casa_anterior).remove("#" + peca_anterior);
                                $("#" + casa_selecionada).append(obj);
                            }
                        } else
                        if ((peca_anterior.indexOf("preta") >= 0)) {
                            var casa_meio = null, peca_meio = null;
                            if (nJ < aJ) {
                                casa_meio = "#casa_" + (nI - 1).toString() + "_" + (nJ + 1).toString();
                            } else {
                                casa_meio = "#casa_" + (nI - 1).toString() + "_" + (nJ - 1).toString();
                            }
                            if ($(casa_meio).children().size() > 0)
                                peca_meio = $(casa_meio).children("img");
                            if (peca_meio != null) {
                                peca_meio.remove();
                                pontos_pretas++;
                                $("#info_pontos_pretas").text(pontos_pretas.toString());
                                $("#" + casa_anterior).remove("#" + peca_anterior);
                                $("#" + casa_selecionada).append(obj);
                            }
                        }
                    }
                }
            }
        } else {
            $("#info_peca_selecionada").text(peca_selecionada.toString());
        }


        if (pontos_pretas == 12 || pontos_brancas == 12) {
            $("#info").html("<h1>Fim de jogo!</h1>");
        }

    });
}
;
this.jogar = function (msg) {
    var json = JSON.parse(msg.data);
    console.log(json);
    if (json.jogador == 0) {
        $("#tabela_jogo").show();
        $("#login_botao").hide();
    }
    if (json.jogador == 1) {
        alert("Esperando segundo jogador");
    } else if (json.jogador == 2) {
        console.log("Jogo em andamento");
        $("#login_botao").hide();
        game();
    } else if (json.message == "Atingiu o limite de jogadores") {
        alert("Sala fechada");
        $("#tabela_jogo").hide();
        $("#login_botao").show();
    }
};

function onOpen() {
    ws.send(sala);
}

function init() {
//    DEFININDO QUAL/IS CAMPO/S DEVE/M SER MOSTRADO/S NO HTML
    $("#login").show();
    $("#tabuleiro").hide();
    $("#info").hide();

    $("#loginBtn").click(function () {
        var wsUri = "ws://" + document.location.host + document.location.pathname + "sala/" + sala;
        ws = new WebSocket(wsUri);
        ws.onopen = onOpen;
        ws.onmessage = jogar;
        $("#login").hide();
        $("#tabuleiro").show();
        $("#info").show();

    });
}
;

onload = init;