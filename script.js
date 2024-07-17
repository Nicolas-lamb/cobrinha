const canvas = document.querySelector('canvas');
const contexto = canvas.getContext("2d");


const audio1 = new Audio('./assets/audio1.mp3')
const audio2 = new Audio('./assets/audio2.mp3')


var contComida= 0
let speed =300;
var recorde = 0
var distancia;


let level = document.getElementById("level")
let contLevel=0;
let parteRemovida = false;



var frutasComidas = document.getElementById('frutas')
//declarando as variaveis pegando  tela de inicio, o jogo, a tela de game over para que ele apareça quando clicar no botão
var jogo = document.getElementById('jogo')
var inicio = document.getElementById('inicio')
var gameOver = document.getElementById('gameOver')

var numero = document.getElementById('numero')
//tamanho dos quadrados
const size = 16;

//variavel da direção que ira se mover
let direction= undefined
//funcion para ele deixar a tela inicial escondida e aparecer a tela do jogo
function comecar(){
    if(jogo.style.display = 'none'){
        jogo.style.display = 'flex'
        inicio.style.display = 'none'
        direction= "right"
        level.innerHTML=`Level: ${contLevel}`
    }
}

let speedMaca = 20000
//funcion para ele deixar a tela de gameOver escondida e aparecer a tela do jogo
function recomecar(){
    if(jogo.style.display = 'none'){
        jogo.style.display = 'flex'
        gameOver.style.display = 'none'
        barra.style.width="100%"
        reiniciarIntervaloBarra()
        reiniciarIntervaloMaca()
        timeBarra = 10
        contLevel=0;
        level.innerHTML=`Level: ${contLevel}`
        direction= "right"
    }
    
    
}
//calcular distancia

//funcion para ele deixar a tela de gameOver escondida e aparecer a tela de inicio
function home(){
    if(inicio.style.display = 'none'){
        inicio.style.display = 'flex'
        gameOver.style.display = 'none'
        
    }
}
//criado array com as posições
let cobra = [
    {x: 224, y: 144},
    {x: 240, y:144},
    {x:256, y:144}
];

//funções para numeros,cores aleatoria das frutas e posições
const numeroAleatorio = (min, max)=>{
    return Math.round(Math.random() *(max-min)+min) // gera numero aleatorio arredondado
}
const randomPositionX =()=>{
    const numeroX = numeroAleatorio(0, canvas.width-size)
    return Math.round(numeroX/16)*16 // pega o numero divide por 20 e arredonda e depois multiplica por 20 para dar um multiplo de 20
}
const randomPositionY =()=>{
    const numeroY = numeroAleatorio(0, canvas.height-size)
    return Math.round(numeroY/16)*16 // pega o numero divide por 20 e arredonda e depois multiplica por 20 para dar um multiplo de 20
}


//criando a variavel de onde aparecerá a comida e a cor dela
const comida ={
    x:randomPositionX(),
    y:randomPositionY(),
}



//variavel para limpar o timeout
    let loopId

    const head = cobra[cobra.length -1];
    let difX = head.x-comida.x
    let difY = head.y-comida.y

    if(difX <0){
        difX = -1*difX
        
    }
    if( difY <0){
            difY = -1*difY
           
    }

//////////////barra de vida//////////////

let barra = document.getElementById("barra");
barra.style.width = "100%";
let timeBarra = 10;
let speedBarra = 10000;


function atualizarBarra() {
    let widthBarra = 100 - timeBarra;
    barra.style.width = widthBarra + "%";
    timeBarra += 10;
}
let intervaloBarra = setInterval(atualizarBarra, speedBarra);

function reiniciarIntervaloBarra() {
    clearInterval(intervaloBarra); // Pare o intervalo atual
    intervaloBarra = setInterval(atualizarBarra, speedBarra); // Inicie um novo intervalo
}


//*************************************

    distancia = Math.sqrt( Math.pow(difX, 2)+Math.pow(difY, 2))
    const divDistancia = document.querySelector("#distancia");

    //divDistancia.innerText = distancia

    function atualizarMaca(){
        //da novas posições para a fruta aleatoriamente
        let x = randomPositionX()
        let y = randomPositionY()

        //verificação para a fruta não spawnar na mesma posição que a cobra
        while(cobra.find((position)=> position.x == x && position.y == y)){
            x = randomPositionX()
            y = randomPositionY()
        }
        comida.x = x
        comida.y= y
 
        let difX = head.x-comida.x
        let difY = head.y-comida.y

        if(difX <0){
            difX = -1*difX
     
        }
        if( difY <0){
            difY = -1*difY
        
        }

        distancia = Math.sqrt( Math.pow(difX, 2)+Math.pow(difY, 2))
        const divDistancia = document.querySelector("#distancia");



        console.log(distancia)
        //divDistancia.innerText = distancia
    }
    let intervaloMaca = setInterval(atualizarMaca, speedMaca);

    function reiniciarIntervaloMaca() {
        clearInterval(intervaloMaca); // Pare o intervalo atual
        intervaloMaca = setInterval(atualizarMaca, speedMaca); // Inicie um novo intervalo
    }
    
const aparecerComida = ()=>{

    const {x,y} = comida
    
    let apple = new Image()
    apple.src="apple.png"

    apple.addEventListener('load', ()=>{
        contexto.drawImage(apple, 0, 0, 96, 96, x, y, size, size)
    })
    
}



const eventLoad = (x,y, image)=>{
    image.addEventListener('load', ()=>{
        contexto.drawImage(image, 0, 0, 96, 96, x, y, 16, 16)
    })
}

const desenharCorpo=(x,y)=>{
    if(direction=="right"){
        let bodyDraw = new Image();
        bodyDraw.src = "b1.png"
        eventLoad(x, y, bodyDraw)
    }
    if(direction=="left"){
        let bodyDraw = new Image();
        bodyDraw.src = "b1.png"
        eventLoad(x, y, bodyDraw)
    }
    if(direction=="up"){
        let bodyDraw = new Image();
        bodyDraw.src = "b2.png"
        eventLoad(x, y, bodyDraw)
    }
    if(direction=="down"){
        let bodyDraw = new Image();
        bodyDraw.src = "b2.png"
        eventLoad(x, y, bodyDraw)
    }
    if(direction=="leftUp"){
        let bodyDraw = new Image();
        bodyDraw.src = "b3.png"
        eventLoad(x, y, bodyDraw)
    }
    if(direction=="leftDown"){
        let bodyDraw = new Image();
        bodyDraw.src = "b4.png"
        eventLoad(x, y, bodyDraw)
    }
    if(direction=="rightUp"){
        let bodyDraw = new Image();
        bodyDraw.src = "b4.png"
        eventLoad(x, y, bodyDraw)
    }
    if(direction=="rightDown"){
        let bodyDraw = new Image();
        bodyDraw.src = "b3.png"
        eventLoad(x, y, bodyDraw)
    }
   
}



const desenharHead=(x, y)=>{
    if(direction=="right"){
        let headDraw = new Image();
        headDraw.src = "s5.png"
        eventLoad(x, y, headDraw)
    }
    if(direction=="left"){
        let headDraw = new Image();
        headDraw.src = "s1.png"
        eventLoad(x, y, headDraw)
    }
    if(direction=="up"){
        let headDraw = new Image();
        headDraw.src = "s3.png"
        eventLoad(x, y, headDraw)
    }
    if(direction=="down"){
        let headDraw = new Image();
        headDraw.src = "s7.png"
        eventLoad(x, y, headDraw)
    }
    if(direction=="leftUp"){
        let headDraw = new Image();
        headDraw.src = "s2.png"
        eventLoad(x, y, headDraw)
    }
    if(direction=="leftDown"){
        let headDraw = new Image();
        headDraw.src = "s8.png"
        eventLoad(x, y, headDraw)
    }
    if(direction=="rightUp"){
        let headDraw = new Image();
        headDraw.src = "s4.png"
        eventLoad(x, y, headDraw)
    }
    if(direction=="rightDown"){
        let headDraw = new Image();
        headDraw.src = "s6.png"
        eventLoad(x, y, headDraw)
    }
    
}
const desenharTail=(x, y)=>{
    if(direction=="right"){
        let tailDraw = new Image();
        tailDraw.src = "c4.png"
        eventLoad(x, y, tailDraw)
    }
    if(direction=="left"){
        let tailDraw = new Image();
        tailDraw.src = "c3.png"
        eventLoad(x, y, tailDraw)
    }
    if(direction=="up"){
        let tailDraw = new Image();
        tailDraw.src = "c5.png"
        eventLoad(x, y, tailDraw)
    }
    if(direction=="down"){
        let tailDraw = new Image();
        tailDraw.src = "c6.png"
        eventLoad(x, y, tailDraw)
    }
    if(direction=="leftUp"){
        let tailDraw = new Image();
        tailDraw.src = "c8.png"
        eventLoad(x, y, tailDraw)
    }
    if(direction=="leftDown"){
        let tailDraw = new Image();
        tailDraw.src = "c9.png"
        eventLoad(x, y, tailDraw)
    }
    if(direction=="rightUp"){
        let tailDraw = new Image();
        tailDraw.src = "c7.png"
        eventLoad(x, y, tailDraw)
    }
    if(direction=="rightDown"){
        let tailDraw = new Image();
        tailDraw.src = "c10.png"
        eventLoad(x, y, tailDraw)
    }
    
    
}


 //função de desenhar a cobra
const desenharCobra = () =>{
    cobra.forEach((position, index) => {
        //colocando a cabeça com outra cor
        if(index != cobra.length -1 && index != cobra.length - cobra.length){
            desenharCorpo(position.x, position.y)
        }
        if(index == cobra.length -1){
            desenharHead(position.x, position.y)
        }
        if(index == cobra.length - cobra.length){
            desenharTail(position.x, position.y)
        }
    })
    
    
    };

//função para a cobra se mover
const moverCobra = () =>{
    if(!direction) return;
    //criando uma variavel que pega qual o ultimo quadrado criado ou seja a cabeça
    const head = cobra[cobra.length -1];


    if(direction == "right"){
        cobra.push({x: head.x + size, y: head.y}) //coloca um novo valor no array com a posição que aparecerá o retangulo(direita)
        parteRemovida = false;
    }
    if(direction == "left"){
        cobra.push({x: head.x - size, y: head.y}) //coloca um novo valor no array com a posição que aparecerá o retangulo(esquerda) 
        parteRemovida = false;
    }
    if(direction == "down"){
        cobra.push({x: head.x, y: head.y+size}) //coloca um novo valor no array com a posição que aparecerá o retangulo (baixo)
        parteRemovida = false;
    }
    if(direction == "up"){
        cobra.push({x: head.x, y: head.y-size}) //coloca um novo valor no array com a posição que aparecerá o retangulo(cima)
        parteRemovida = false;
    }
    if(direction == "rightDown"){
        cobra.push({x:head.x+(size), y: head.y+(size)})
        removerUltimaParte()
        parteRemovida = true;
    }
    if(direction == "rightUp"){
        cobra.push({x:head.x+(size), y:head.y-(size)})
        removerUltimaParte()
        parteRemovida = true;
    }
    if(direction == "leftUp"){
        cobra.push({x:head.x-(size), y:head.y-(size)})
        removerUltimaParte()
        parteRemovida = true;
    }
    if(direction == "leftDown"){
        cobra.push({x:head.x-(size), y:head.y+(size)})
        removerUltimaParte()
        parteRemovida = true;
    }

    cobra.shift();  //remove o primeiro elemento do array
    //desenharCorpo()
}
//setar distancia inicial



const comer =()=>{
    const head = cobra[cobra.length -1];


    if(head.x== comida.x && head.y == comida.y){
        barra.style.width="100%"
        timeBarra = 10
        cobra.push(head)
        //coloca o audio de comer, podendo ser qualquer um dos 2
        let audioAleatorio = Math.round(Math.random() *(2-1)+1)
        if(audioAleatorio == 1){
            audio1.play()
        }else{
            audio2.play()
        }
        //da novas posições para a fruta aleatoriamente
        let x = randomPositionX()
        let y = randomPositionY()

        //verificação para a fruta não spawnar na mesma posição que a cobra
        while(cobra.find((position)=> position.x == x && position.y == y)){
             x = randomPositionX()
             y = randomPositionY()
        }

        comida.x = x
        comida.y= y

        contComida++;
        if(contComida>30){
            console.log(contComida)
            contLevel++;
            level.innerHTML=`Level: ${contLevel}`
        }
        reiniciarIntervaloBarra()
        reiniciarIntervaloMaca()
        frutasComidas.innerHTML= `Points: ${contComida} `

    let difX = head.x-comida.x
    let difY = head.y-comida.y

    if(difX <0){
        difX = -1*difX
        
    }
    if( difY <0){
            difY = -1*difY
           
    }
    

    distancia = Math.sqrt( Math.pow(difX, 2)+Math.pow(difY, 2))
    const divDistancia = document.querySelector("#distancia");

    //divDistancia.innerText = distancia

    }
    
}


const colisao =()=>{
    //pegando a cabeça
    const head = cobra[cobra.length -1]
    //variavel do limite em que a cobra pode chegar antes de morrer e variavel com a confirmação de que pegou na parede
    const limiteCanvasWidth =  canvas.width - size
    const limiteCanvasHeight =  canvas.height - size
    const colisaoParede = head.x < 0 || head.x > limiteCanvasWidth || head.y < 0 || head.y > limiteCanvasHeight
    const indexPescoco = cobra.length -2
    // ve se a cabeça bateu eu um quadrado que seja menor que o pescoço, pois se não colocar vai dar looping infinito pois a posição da cabeça iria ser igual a posição do ultimo quadrado criado
    const colisaoCobra = cobra.find((position, index)=>{
    return index < indexPescoco && position.x == head.x && position.y == head.y
    })
    //ve se colidiu então mostra a tela de gameover e reseta as informações para não dar que a cobra ja está morta
        if(colisaoParede || colisaoCobra || barra.style.width== "0%"){
            if(recorde<contComida){
                recorde = contComida
            }
            
            contComida = 0
            frutasComidas.innerHTML= `Points: ${contComida}`
            numero.innerHTML = `${recorde}`
            jogo.style.display = 'none'
            gameOver.style.display = 'flex'
            barra.style.width = "100%"
            direction= undefined
            cobra = [
                {x: 224, y: 144},
                {x: 240, y:144},
                {x:256, y:144}
            
                
            ];
            
        }
    

}

const removerUltimaParte = () => {
    if (cobra.length > 3 && parteRemovida == false) {
        cobra.shift();  // Remove o primeiro segmento (cauda) da cobra
    }
};

//faz um loop para ela ir na direção clicada
const gameLoop = () =>{
    clearInterval(loopId) //limpando loop para não ficar acumulando-os quando a função se repetir
    contexto.clearRect(0, 0, 480, 320); //limpa os retangulos da tela para que coloque os valores atualizados
    moverCobra()
    desenharCobra()
    aparecerComida()
    comer()
    colisao()
    

   
    
    if(contComida<10){
      speed=300;
//seta velocidade diagonal
        if(direction == "rightDown"){
            speed = speed*Math.sqrt(2)
        }
        if(direction == "rightUp"){
            
            speed = speed*Math.sqrt(2)
        }
        if(direction == "leftUp"){
            
            speed = speed*Math.sqrt(2)
        }
        if(direction == "leftDown"){
            
           speed = speed*Math.sqrt(2)
        }
      }
    
     
    
    loopId = setTimeout(()=>{
        //console.log(speed)
        gameLoop()
    },speed)//aumenta a velocidade da cobra conforme pega as "frutas"
    
    

}

gameLoop()//chama a primeira vez o loop


let keysPressed = {}; // Objeto para rastrear quais teclas estão pressionadas

// Função para definir a direção com base nas teclas pressionadas
const definirDirecao = () => {
    if (keysPressed["d"] && keysPressed["w"]) {
        direction = "rightUp";
    } else if (keysPressed["d"] && keysPressed["s"]) {
        direction = "rightDown";
    } else if (keysPressed["a"] && keysPressed["w"]) {
        direction = "leftUp";
    } else if (keysPressed["a"] && keysPressed["s"]) {
        direction = "leftDown";
    } else if (keysPressed["w"] && direction != "down") {
        direction = "up";
        parteRemovida = false;
    } else if (keysPressed["s"] && direction != "up") {
        direction = "down";
        parteRemovida = false;
    } else if (keysPressed["a"] && direction != "right") {
        direction = "left";
        parteRemovida = false;
    } else if (keysPressed["d"] && direction != "left") {
        direction = "right";
        parteRemovida = false;
    }
};

// Evento para quando uma tecla é pressionada
document.addEventListener("keydown", ({ key }) => {
    keysPressed[key.toLowerCase()] = true; // Armazena a tecla pressionada
    definirDirecao(); // Define a direção com base nas teclas pressionadas
});

// Evento para quando uma tecla é solta
document.addEventListener("keyup", ({ key }) => {
    delete keysPressed[key.toLowerCase()]; // Remove a tecla quando solta
    definirDirecao(); // Atualiza a direção após uma tecla ser solta
});

let touchStartX = 0;
let touchStartY = 0;

window.addEventListener("touchstart", (event) => {
    touchStartX = event.touches[0].clientX;
    touchStartY = event.touches[0].clientY;
});

window.addEventListener("touchmove", (event) => {
    let touchEndX = event.touches[0].clientX;
    let touchEndY = event.touches[0].clientY;

    let deltaX = touchEndX - touchStartX;
    let deltaY = touchEndY - touchStartY;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX > 0 && deltaY > 0 && direction !== "leftUp") {
            direction = "rightDown";
        } else if (deltaX > 0 && deltaY < 0 && direction !== "leftDown") {
            direction = "rightUp";
        } else if (deltaX < 0 && deltaY > 0 && direction !== "rightUp") {
            direction = "leftDown";
        } else if (deltaX < 0 && deltaY < 0 && direction !== "rightDown") {
            direction = "leftUp";
        } else if (deltaX > 0 && direction !== "left") {
            direction = "right";
        } else if (deltaX < 0 && direction !== "right") {
            direction = "left";
        }
    } else {
        if (deltaY > 0 && direction !== "up") {
            direction = "down";
        } else if (deltaY < 0 && direction !== "down") {
            direction = "up";
        }
    }

    touchStartX = touchEndX;
    touchStartY = touchEndY;
    
});

window.addEventListener("touchend", () => {
    touchStartX = 0;
    touchStartY = 0;
    
});


