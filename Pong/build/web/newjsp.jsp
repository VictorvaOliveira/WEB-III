function atualizaAreaDeJogo() {
    //Controle da barra
    if (this.pong1.y <= 0) {
        data.pong1.y = 0;
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
        areaDeJogo.pararJogo();
    }
    if (this.ball.x >= 700) {
        this.ball.x = 0;
        this.point1 += 1;
        areaDeJogo.pararJogo();
    }

    areaDeJogo.clear();
    this.pong1.update();
    this.pong2.update();
    this.ball.update();
    scorePong1.text = "SCORE: " + this.point1;
    scorePong1.update();
    scorePong2.text = "SCORE: " + this.point2;
    scorePong2.update();

//    console.log();
    var json = {
        "pong1": this.pong1,
        "pong2": this.pong2,
        "ball": this.ball,
        "point1": this.point1,
        "point2": this.point2
    };
    var json2 = JSON.stringify(json);
//    console.log(json2);
    ws.send(json2);

}
