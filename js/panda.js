window.onload = function(){
    let tetris = [];
    let tetrisField = document.querySelector('#tetris-field');
    let scoreField = document.querySelector('.score-field');
    let timer;
    let score = 0;
    let flag;

    function init(){
        let x = 9;
        let y = 15;
        for(let i = 0; i < y; i++){
            tetris[i] = [];
            for(let j = 0; j < x; j++){
                tetris[i][j] = 0;
            }
        }
        // console.table(tetris);
    }

    function draw(){
        let out = "";
        for(let i = 0; i < tetris.length; i++){
            for(let j = 0; j < tetris[i].length; j++){
                if(tetris[i][j] === 0){
                    out += `<div class="white"></div>`;
                }else if(tetris[i][j] === 1 || tetris[i][j] === 11){
                    out += `<div class="orange"></div>`;
                }else if(tetris[i][j] === 2 || tetris[i][j] === 12){
                    out += `<div class="blue"></div>`;
                }else if(tetris[i][j] === 3 || tetris[i][j] === 13){
                    out += `<div class="green"></div>`;       
                }else if(tetris[i][j] === 4 || tetris[i][j] === 14){
                    out += `<div class="red"></div>`;
                }else if(tetris[i][j] === 5 || tetris[i][j] === 15){
                    out += `<div class="yellow"></div>`;
                }        
            }
        }
        tetrisField.innerHTML = out;
        scoreField.innerHTML = score;
    }

    function drawElem(){
        function randomInteger(min, max) {
            let rand = min + Math.random() * (max + 1 - min);
            rand = Math.floor(rand);
            return rand;
          }
          tetris[0][0] = randomInteger(1, 5);
    }

    function run(){
        if(finish()) return false;
        timer = setTimeout(function(){
            draw();
            flag = true;
            for(let i = tetris.length - 1; i >=0; i--){
                for(let j = 0; j < tetris[i].length; j++){
                    if(tetris[i][j] < 10){
                        if (tetris[i][j] != 0){
                            if(i == tetris.length - 1){
                                tetris[i][j] = tetris[i][j] + 10;
                            }
                            else if(tetris[i + 1][j] === 0){
                                tetris[i+1][j] = tetris[i][j];
                                tetris[i][j] = 0;
                                flag = false;
                                if(i + 1 == tetris.length - 1){
                                    tetris[i + 1][j] = tetris[i + 1][j] + 10;
                                }
                            }
                            else if(tetris[i + 1][j] >=10){
                                tetris[i][j] = tetris[i][j] + 10;
                            }
                        }
                    }
                }
            }
            checkLine();
            if(flag) drawElem();
            run();
        }, 200);
    }

    function tetrisRight(){
        for(let i = tetris.length - 1; i >=0; i--){
            for(let j = tetris[i].length - 1; j >= 0; j--){
                if(tetris[i][j] < 10){
                    if(tetris[i][j] !=0 && tetris[i][j+1] == 0){
                        tetris[i][j+1] = tetris[i][j];
                        tetris[i][j] = 0;
                    }
                }
            }
        }
        draw();
    }
    function tetrisLeft(){
        for(let i = tetris.length - 1; i >=0; i--){
            for(let j = 0; j < tetris[i].length; j++){
                if(tetris[i][j] < 10){
                    if(tetris[i][j] !=0 && tetris[i][j-1] == 0){
                        tetris[i][j-1] = tetris[i][j];
                        tetris[i][j] = 0;
                    }
                }
            }
        }
        draw();
    }

    function checkLine(){
        for(let i = tetris.length - 1; i >=0; i--){
            for(let j = 0; j < tetris[i].length; j++){
                if(tetris[i][j] > 10 && tetris[i][j+1] != undefined && tetris[i][j+2] != undefined){
                    if(tetris[i][j] == tetris[i][j+1] && tetris[i][j] == tetris[i][j+2]){
                        tetris[i][j] = 0;
                        tetris[i][j+1] = 0;
                        tetris[i][j+2] = 0;
                        score +=10;
                        for(let m = i; m >= 0; m--){
                            if(tetris[m][j] > 10) tetris[m][j] = tetris[m][j] - 10;
                            if(tetris[m][j+1] > 10) tetris[m][j+1] = tetris[m][j+1] - 10;
                            if(tetris[m][j+2] > 10) tetris[m][j+2] = tetris[m][j+2] - 10;
                        }
                    }
                }
            }
        }
    }

    function finish(){
        let stop = false;
        for(let i = tetris.length - 1; i >=0; i--){
            for(let j = 0; j < tetris[i].length; j++){
                stop = true;
                for(let k = 0; k < tetris.length; k++){
                    if(tetris[k][j] == 0){
                        stop = false;
                        break;
                    }
                }
                if(stop){
                    clearTimeout(timer);
                    alert('You LOOSE!')
                    break;
                } 
            }
            if(stop) break;
        }
        return stop;
    }

    
    document.querySelector('.run').onclick = function(){
        init();
        draw();
        drawElem();
        run();
    };
    document.onkeydown = function(event){
        switch(event.code){
            case "ArrowRight": tetrisRight();
            break;
            case "ArrowLeft": tetrisLeft();
            break;
        }
        return false;
    }





}