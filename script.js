const canvas = document.querySelector('canvas');
const contexto = canvas.getContext("2d");

const audio1 = new Audio('./assets/audio1.mp3')
const audio2 = new Audio('./assets/audio2.mp3')
var contComida= 0
let speed =0
var recorde = 0

var frutasComidas = document.getElementById('frutas')
//declarando as variaveis pegando  tela de inicio, o jogo, a tela de game over para que ele apareça quando clicar no botão
var jogo = document.getElementById('jogo')
var inicio = document.getElementById('inicio')
var gameOver = document.getElementById('gameOver')

var numero = document.getElementById('numero')
//tamanho dos quadrados
const size = 16;

//funcion para ele deixar a tela inicial escondida e aparecer a tela do jogo
function comecar(){
    if(jogo.style.display = 'none'){
        jogo.style.display = 'flex'
        inicio.style.display = 'none'
    }
}
//funcion para ele deixar a tela de gameOver escondida e aparecer a tela do jogo
function recomecar(){
    if(jogo.style.display = 'none'){
        jogo.style.display = 'flex'
        gameOver.style.display = 'none'
        
    }
    
    
}
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

const corAleatoria =()=>{
    const red = numeroAleatorio(0, 255) // faz a cor red  ter um numero aleatorio de 0 a 255
    const green = numeroAleatorio(0, 255)// faz a cor green ter um numero aleatorio de 0 a 255
    const blue = numeroAleatorio(0, 255)// faz a cor blue  ter um numero aleatorio de 0 a 255
    //if para verificar se a cor da fruta não é igual a cor do background, se for ele faz outra cor
    if(red == '189' && green =='101' && blue =='42'){
        const red = numeroAleatorio(0, 255) 
        const green = numeroAleatorio(0, 255)
        const blue = numeroAleatorio(0, 255)
    }
    return `rgb(${red}, ${green}, ${blue})`
}
//criando a variavel de onde aparecerá a comida e a cor dela
const comida ={
    x:randomPositionX(),
    y:randomPositionY(),
    color: corAleatoria()
}

//variavel da direção que ira se mover
let direction= "right"
//variavel para limpar o timeout
    let loopId

const aparecerComida = ()=>{

    const {x,y,color} = comida

    contexto.shadowColor = color
    contexto.shadowBlur = 10
    contexto.fillStyle = color
    contexto.fillRect(x, y, size, size)
    contexto.shadowBlur = 0 //para ele não colocar a sombra nos outros elementos
}

 //função de desenhar a cobra
const desenharCobra = () =>{
    
    contexto.fillStyle = "#D3A499"; //definindo a cor
    
    //percorre todo o array para pegar todas as posições
    cobra.forEach((position, index) => {
        //colocando a cabeça com outra cor
        if(index == cobra.length -1){
            contexto.fillStyle = "#E29C8C";
        }
        contexto.fillRect(position.x, position.y, size, size)
    })
    };

//função para a cobra se mover
const moverCobra = () =>{
    if(!direction) return;
    //criando uma variavel que pega qual o ultimo quadrado criado ou seja a cabeça
    const head = cobra[cobra.length -1];
    const taile = cobra[0];

    if(direction == "right"){
        cobra.push({x: head.x + size, y: head.y}) //coloca um novo valor no array com a posição que aparecerá o retangulo(direita)
      
    }
    if(direction == "left"){
        cobra.push({x: head.x - size, y: head.y}) //coloca um novo valor no array com a posição que aparecerá o retangulo(esquerda) 
    }
    if(direction == "down"){
        cobra.push({x: head.x, y: head.y+size}) //coloca um novo valor no array com a posição que aparecerá o retangulo (baixo)
    }
    if(direction == "up"){
        cobra.push({x: head.x, y: head.y-size}) //coloca um novo valor no array com a posição que aparecerá o retangulo(cima)
    }
    if(direction == "rightDown"){
        cobra.push({x:head.x+(size), y: head.y+(size)})
        
    }
    if(direction == "rightUp"){
        cobra.push({x:head.x+(size), y:head.y-(size)})
       
    }
    if(direction == "leftUp"){
        cobra.push({x:head.x-(size), y:head.y-(size)})
        
    }
    if(direction == "leftDown"){
        cobra.push({x:head.x-(size), y:head.y+(size)})
        
    }

    cobra.shift();  //remove o primeiro elemento do array
}


const comer =()=>{
    const head = cobra[cobra.length -1];

    if(head.x== comida.x && head.y == comida.y){
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
        comida.color = corAleatoria()
        contComida++;
        frutasComidas.innerHTML= `Points: ${contComida} `
        
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
    if(colisaoParede || colisaoCobra){
        if(recorde<contComida){
            recorde = contComida
        }
        
        contComida = 0
        frutasComidas.innerHTML= `Points: ${contComida}`
        numero.innerHTML = `${recorde}`
        jogo.style.display = 'none'
        gameOver.style.display = 'flex'
        direction = "right"
        cobra = [
            {x: 224, y: 144},
            {x: 240, y:144},
            {x:256, y:144}
            
        ];
        
        
        
    }
}

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
        speed = 300-contComida*20 //seta a velocidade para encrementar só ate um limite para não ficar muito rapido

        if(direction == "rightDown"){
            speed = speed*Math.sqrt(2.5)
        }
        if(direction == "rightUp"){
            
            speed = speed*Math.sqrt(2.5)
        }
        if(direction == "leftUp"){
            
            speed = speed*Math.sqrt(2.5)
        }
        if(direction == "leftDown"){
            
           speed = speed*Math.sqrt(2.5)
        }
      }
    
     
    
    loopId = setTimeout(()=>{
        console.log(speed)
        console.log(contComida)
        gameLoop()
    },speed)//aumenta a velocidade da cobra conforme pega as "frutas"
    
    

}

gameLoop()//chama a primeira vez o loop


let keysPressed = {}; // Objeto para rastrear quais teclas estão pressionadas

// Função para definir a direção com base nas teclas pressionadas
const definirDirecao = () => {
    if (keysPressed["d"] && keysPressed["w"]) {
        direction = "rightUp"; // Diagonal para cima e para a direita
    } else if (keysPressed["d"] && keysPressed["s"]) {
        direction = "rightDown"; // Diagonal para baixo e para a direita
    } else if (keysPressed["a"] && keysPressed["w"]) {
        direction = "leftUp"; // Diagonal para cima e para a esquerda
    } else if (keysPressed["a"] && keysPressed["s"]) {
        direction = "leftDown"; // Diagonal para baixo e para a esquerda
    } else if (keysPressed["w"] && direction!="down") {
        direction = "up"; // Somente para cima
    } else if (keysPressed["s"] && direction!="up") {
        direction = "down"; // Somente para baixo
    } else if (keysPressed["a"] && direction!="right") {
        direction = "left"; // Somente para a esquerda
    } else if (keysPressed["d"] && direction!="left") {
        direction = "right"; // Somente para a direita
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



