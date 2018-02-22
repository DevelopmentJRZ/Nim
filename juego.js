var sfuego = new Audio('sound/fuego.m4a');
var ssalto = new Audio('sound/salto.wav');
var smusic = new Audio('sound/music.mp3');
var smusicgameover = new Audio('sound/musicgameover.mp3');
var sgameover = new Audio('sound/gameover.m4a');
var scoin = new Audio('sound/coin.m4a');


sfuego.volume = 0.8;
ssalto.volume = 1;
smusic.volume = 0.6;
smusicgameover.volume = 0.5;
sgameover.volume = 0.3;
scoin.volume = 1;

/*
sfuego.volume = 0;
ssalto.volume = 0;
smusic.volume = 0;
smusicgameover.volume = 0;
sgameover.volume = 0;
scoin.volume = 0;
*/


var swich = true;
document.addEventListener('click', function(evento){
    //if(evento.keyCode == 32){
        if(nivel.empezar){
            if(!nivel.vida){
                saltar();
            }
            else{
                nivel.vida = false;
                nivel.empezar = true;
                nivel.velocidad = 1.2;
                nube.velocidad = 1;
                monte.velocidad = 0.3;
                nube.x = 1000;
                monte.x = 1000;
                fuego.x = ancho+100;
                arbol.x = ancho;
                swich = true;
                smusic.play();
                smusicgameover.pause();
                smusicgameover.currentTime = 0;
                nivel.marcador = 0;
            }
        }
    else{
        
        nivel.vida = false;
        nivel.empezar = true;
        nivel.velocidad = 1.2;
        nube.velocidad = 1;
        monte.velocidad = 0.3;
        nube.x = 1000;
        monte.x = 1000;
        fuego.x = ancho+100;
        arbol.x = ancho;
        swich = true;
        smusic.play();
        smusicgameover.pause();
        smusicgameover.currentTime = 0;
        nivel.marcador = 0;
    }
    //}
});

var imgNim, imgNube, imgFuego, imgSuelo, imgMont1, imgArb, imgBack;
function NA(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function cargaImagenes(){
    imgNim = new Image();
    imgNube = new Image();
    imgFuego = new Image();
    imgSuelo = new Image();
    imgMonte = new Image();
    imgArb  = new Image();
    imgBack = new Image();
    
    imgNim.src = 'img/ni.png';
    imgNube.src = 'img/cl.png';
    imgFuego.src = 'img/fu.png';
    imgSuelo.src = 'img/se.png';
    imgMonte.src = 'img/mo.png';
    imgArb.src = 'img/ar.png';
    imgBack.src = 'img/ba.jpg';
}



var ancho = screen.width;
var alto = screen.height;
var canvas,ctx;

function inicializa(){
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    cargaImagenes();
    smusicgameover.play();
}

function inicia(){
    
    if(!nivel.empezar){
        nivel.velocidad = 0;
        nube.velocidad = 0;
        monte.velocidad = 0;
        ctx.font = "40px impact";
        ctx.fillStyle = '#555555';
        ctx.textAlign = "center";
        ctx.fillText(`Bienvenido`,ancho/2,200);
        ctx.font = "15px impact";
        ctx.fillText(`'Tab' para iniciar`,ancho/2,230);
    }
}

function borraCanvas(){
    canvas.width = ancho;
    canvas.height = alto;
}

var suelo = alto - 285;
var tNim = {y: suelo, vy:0, gravedad: 2, salto: 28, vymax: 9, saltando: false};
var nivel = {velocidad: 1.2, marcador: 0, vida: false, empezar:false};
var fuego = {x: ancho+100 , y: suelo+25};
var nube = {x: ancho, y: 0, velocidad: 1};
var monte = {x: ancho, y: suelo-310,velocidad:0.3};
var suelog = {x: 0, y:suelo+75};
var arbol = {x: ancho , y: suelo-85};

var posX = 0;
var anchoNimImg = 2720;
var altoNimImg = 200;

var cols = 17;
var frame = 0;

var anchoNim = anchoNimImg / cols;
var altoNim = altoNimImg;

//LOGICAS
function logicaNim(){
    frame = ++frame % cols;
    posX = frame * anchoNim;
}
function logicaFuego(){
    if(fuego.x < -100){
        fuego.x = ancho + NA(100,2000);
        nivel.marcador++;
    }
    else{
        fuego.x -= nivel.velocidad*4;
    }
}
function logicaNube(){
    if(nube.x < -300){
        nube.x = ancho + NA(100,500);
        nivel.velocidad++;
        scoin.play();
    }
    else{
        nube.x -= nube.velocidad;
    }
}

function logicaMonte(){
    if(monte.x < -1000){
       monte.x = ancho + NA(100,500);
    }
    else{
        monte.x -= monte.velocidad;
    }
}
function logicaSuelo(){
    if(suelog.x > 1044){
        suelog.x = 0;
    }
    else{
        suelog.x +=nivel.velocidad;
    }
}
function logicaArbol(){
    if(arbol.x < -200){
        arbol.x = ancho + 100;
        
    }
    else{
        arbol.x -= nivel.velocidad;
    }
}

//DIBUJOS
function dibujaNim(){
    logicaNim();
    ctx.drawImage(imgNim,posX,0 ,160,200,30,tNim.y,90,90);
}
function dibujaFuego(){
    logicaFuego();
    ctx.drawImage(imgFuego, 0,0,100,64,fuego.x,fuego.y, 50,32)
}
function dibujaNube(){
    logicaNube();
    ctx.drawImage(imgNube, 0,0,632,632,nube.x,nube.y, 200,200)
}
function dibujaMonte(){
    logicaMonte();
    ctx.drawImage(imgMonte, 0,0,1200,1200,monte.x,monte.y, 600,600)
}
function dibujaSuelo(){
    logicaSuelo();
    ctx.drawImage(imgSuelo, suelog.x,0,2088,87,0,suelog.y, 5040,210)
}
function dibujaArbol(){
    logicaArbol();
    ctx.drawImage(imgArb, 0,0,632,632,arbol.x,arbol.y, 200,200)
}



//AMBIENTE

function colision(){
    if(fuego.x >= 30 && fuego.x <= 100){
        if(tNim.y >= fuego.y-25){
            nivel.vida = true;
            nivel.velocidad = 0;
            nube.velocidad = 0;
            monte.velocidad = 0;
            if(swich){
                sfuego.play();
                smusic.pause();
                smusic.currentTime = 0;
                smusicgameover.play();
                sgameover.play();
                swich = false;
            }
        } 
    }
}

function saltar(){
    if(!tNim.saltando){
        tNim.saltando = true;
        tNim.vy = tNim.salto;
        ssalto.play();
    }
    
}

function gravedad(){
    if(tNim.saltando == true){
        if(tNim.y - tNim.vy - tNim.gravedad > suelo)
            {
                tNim.saltando = false;
                tNim.vy = 0;
                tNim.y = suelo;
            }
        else{
            tNim.vy -= tNim.gravedad;
            tNim.y -= tNim.vy;
        }
   }
}


function puntuacion(){
    ctx.font = "30px impact";
    ctx.fillStyle = '#555555';
    ctx.fillText(`${nivel.marcador}`,ancho - 50,50);
    
    if(nivel.vida){
        ctx.font = "40px impact";
        ctx.fillStyle = '#555555';
        ctx.textAlign = "center";
        ctx.fillText(`GAME OVER`,ancho/2,200);
        ctx.font = "15px impact";
        ctx.fillText(`'Tab' para reiniciar`,ancho/2,230); 

    }
}


//BUCLE//
var fps = 60;
setInterval(function(){
    principal();
},1000/fps);

function principal(){
    borraCanvas();
    gravedad();
    colision();
    dibujaMonte();
    dibujaNube();
    dibujaArbol();
    dibujaSuelo();
    if(nivel.empezar){
        dibujaNim();
    }
    dibujaFuego();
    puntuacion();
    inicia();
}
