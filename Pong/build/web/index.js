var ws;
var pong1;
var pong2;
var ball;
var scorePong1 = 0;
var scorePong2 = 0;
var point1 = 0;
var point2 = 0;

var areaDeJogo = {
    canvas: document.createElement("canvas"),
    iniciar: function () {
        this.canvas.width = 700;
        this.canvas.height = 400;
        this.context = this.canvas.getContext('2d');
        document.getElementById("tabela_jogo").insertBefore(this.canvas, document.getElementById("tabela_jogo").childNode);
        this.interval = setInterval(atualizaAreaDeJogo, 30);
        window.addEventListener('keydown', function (e) {
            areaDeJogo.keys = (areaDeJogo.keys || []);
            areaDeJogo.keys[e.keyCode] = true;
        });
        window.addEventListener('keyup', function (e) {
            areaDeJogo.keys[e.keyCode] = false;
        });
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }, stop: function () {
        clearInterval(this.interval);
    }
};

function carregaJogo() {
    $("#tb").hide();
    areaDeJogo.iniciar();
    pong1 = new component(8, 60, "white", 20, 150);
    pong2 = new component(8, 60, "red", 670, 150);
    ball = new component(7, 7, "blue", 350, 170);
    scorePong1 = new component("18px", "consolas", "white", 200, 30, "text");
    scorePong2 = new component("18px", "consolas", "red", 410, 30, "text");
}

function component(width, height, color, x, y, type) {
    this.type = type;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.update = function () {
        ctx = areaDeJogo.context;
        if (this.type == "text") {
            ctx.font = this.width + "" + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    };

    this.novaPosicao = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    };

    this.crashWith = function (otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    };
}

function atualizaAreaDeJogo() {
    //Controle da barra
    if (this.pong1.y <= 0) {
        this.pong1.y = 0;
    }
    if (this.pong1.y >= 350) {
        this.pong1.y = 350;
    }
    if (this.pong2.y <= 0) {
        this.pong2.y = 0;
    }
    if (this.pong2.y >= 350) {
        this.pong2.y = 350;
    }
    // Controles do jogo
    if (areaDeJogo.keys && areaDeJogo.keys[38]) {
        this.pong1.y -= 10;
        if (this.ball.crashWith(this.pong1)) {
            this.ball.speedY = -4;
            this.ball.speedX = 14;
        }
    }
    if (areaDeJogo.keys && areaDeJogo.keys[40]) {
        this.pong1.y += 10;
        if (this.ball.crashWith(this.pong1)) {
            this.ball.speedY = 4;
            this.ball.speedX = 14;
        }
    }
    if (areaDeJogo.keys && areaDeJogo.keys[37]) {
        this.pong2.y -= 10;
        if (this.ball.crashWith(this.pong2)) {
            this.ball.speedY = -4;
            this.ball.speedX = -8;
        }
    }
    if (areaDeJogo.keys && areaDeJogo.keys[39]) {
        this.pong2.y += 10;
        if (this.ball.crashWith(this.pong2)) {
            this.ball.speedY = 4;
            this.ball.speedX = -8;
        }
    }
    //Movimentos da bola
    this.ball.novaPosicao();
    if (this.ball.crashWith(this.pong1)) {
        this.ball.speedY = 0;
        this.ball.speedX = 13;
    } else if (this.ball.crashWith(this.pong2)) {
        this.ball.speedY = 0;
        this.ball.speedX = -8;
    } else {
        this.ball.x += -4;
    }
    if (this.ball.y <= 0) {
        this.ball.speedY = 4;
    }
    if (this.ball.y >= 390) {
        this.ball.speedY = -4;
    }
    if (this.ball.x <= 2) {
        this.ball.x = 690;
        this.point2 += 1;
    }
    if (this.ball.x >= 700) {
        this.ball.x = 0;
        this.point1 += 1;
    }

    areaDeJogo.clear();
    this.pong1.update();
    this.pong2.update();
    this.ball.update();
    scorePong1.text = "SCORE: " + this.point1;
    scorePong1.update();
    scorePong2.text = "SCORE: " + this.point2;
    scorePong2.update();

    if (this.point1 === 5 || this.point2 === 5) {
        areaDeJogo.stop();
        ws.close();
    }
}

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
        carregaJogo();
    } else if (json.message == "Atingiu o limite de jogadores") {
        alert("Sala fechada");
        $("#tabela_jogo").hide();
        $("#login_botao").show();
    }
}
;

function close() {
    ws.close();
}
function send() {
    ws.send("jogador");
}

function prepare() {
    grid = document.querySelectorAll("tbody tr td");
    for (let i = 0; i <= 1; i++) {
        var item = grid[i];
        item.onclick = send;
    }
}
function init() {

    $("#tabela_jogo").hide();

    $('#login').click(function () {
        var wsUri = "ws://" + document.location.host + document.location.pathname + "sala/" + this.value;
        ws = new WebSocket(wsUri);
        ws.onmessage = jogar;
        $("#tabela_jogo").show();
        $("#login_botao").hide();

    });
    $("#logout").click(function () {
        alert();
    });
    prepare();
}
onload = init;