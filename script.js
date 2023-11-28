const canvas = document.querySelector('canvas');
const contexto = canvas.getContext("2d");

const audio1 = new Audio('./assets/audio1.mp3')
const audio2 = new Audio('./assets/audio2.mp3')
let contComida= 0
let speed =0
//tamanho dos quadrados
const size = 20;

//criado array com as posições
const cobra = [
    {x: 240, y: 240},
    {x: 260, y: 240}
];

//funções para numeros e cores aleatoria
const numeroAleatorio = (min, max)=>{
    return Math.round(Math.random() *(max-min)+min) // gera numero aleatorio arredondado
}
const randomPosition =()=>{
    const numero = numeroAleatorio(0, canvas.width-size)
    return Math.round(numero/20)*20 // pega o numero divide por 20 e arredonda e depois multiplica por 20 para dar um multiplo de 20
}

const corAleatoria =()=>{
    const red = numeroAleatorio(0, 255) // faz a cor red ser ter um numero aleatorio de 0 a 255
    const green = numeroAleatorio(0, 255)// faz a cor green ser ter um numero aleatorio de 0 a 255
    const blue = numeroAleatorio(0, 255)// faz a cor blue ser ter um numero aleatorio de 0 a 255

    return `rgb(${red}, ${green}, ${blue})`
}
//criando a variavel comida
const comida ={
    x:randomPosition(),
    y:randomPosition(),
    color: corAleatoria()
}



//variavel da direção que ira se mover
let direction
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
    
    contexto.fillStyle = "#ddd"; //definindo a cor
    
    //percorre todo o array para pegar todas as posições
    cobra.forEach((position, index) => {
        //colocando a cabeça com outra cor
        if(index == cobra.length -1){
            contexto.fillStyle = "#222222";
        }
        contexto.fillRect(position.x, position.y, size, size)
    })
    };

//função para a cobra se mover
const moverCobra = () =>{
    if(!direction) return;

    const head = cobra[cobra.length -1];

    if(direction == "right"){
        cobra.push({x: head.x + size, y: head.y}) //coloca um novo valor no array com a posição que aparecerá o retangulo 
    }
    if(direction == "left"){
        cobra.push({x: head.x - size, y: head.y}) //coloca um novo valor no array com a posição que aparecerá o retangulo 
    }
    if(direction == "down"){
        cobra.push({x: head.x, y: head.y+size}) //coloca um novo valor no array com a posição que aparecerá o retangulo 
    }
    if(direction == "up"){
        cobra.push({x: head.x, y: head.y-size}) //coloca um novo valor no array com a posição que aparecerá o retangulo
    }

    cobra.shift();  //remove o primeiro elemento do array
}
const grid = () =>{
    contexto.lineWidth = .5 //definir a largura da linha
    contexto.strokeStyle = "#191919"

    //for para colocar todas as linhas de 25 em 25 posições até acabar o documento
    for(let i = 20; i<canvas.width; i+=20){
        contexto.beginPath() //para que ele não enterligue o final de um com o começo do outro
        contexto.lineTo(i, 0) //mostraroinde começa
        contexto.lineTo(i, 600) //mostrar onde termina
        contexto.stroke()

        contexto.beginPath() //para que ele não enterligue o final de um com o começo do outro
        contexto.lineTo(0, i) //mostrar onde começa
        contexto.lineTo(600, i) //mostrar onde termina
        contexto.stroke()
    }
}

const comer =()=>{
    const head = cobra[cobra.length -1];
    if(head.x == comida.x && head.y == comida.y){
        cobra.push(head)
        //coloca o audio de comer, podendo ser qualquer um dos 2
        let audioAleatorio = Math.round(Math.random() *(2-1)+1)
        if(audioAleatorio == 1){
            audio1.play()
        }else{
            audio2.play()
        }
        
        let x = randomPosition()
        let y = randomPosition()

        //verificação para a fruta não spawnar na mesma posição que a cobra
        while(cobra.find((position)=> position.x == x && position.y == y)){
             x = randomPosition()
             y = randomPosition()
        }

        comida.x = x
        comida.y= y
        comida.color = corAleatoria()
        contComida++;
        
    }
}

//faz um loop para ela ir na direção clicada
const gameLoop = () =>{
    clearInterval(loopId) //limpando loop para não ficar rodando quando a função se repetir
    contexto.clearRect(0, 0, 600, 600); //limpa os retangulos da tela para que coloque os valores atualizados
    moverCobra()
    grid()
    
    desenharCobra()
    aparecerComida()
    comer()
    if(contComida<9){
      speed = 300-contComida*20 //seta a velocidade para encrementar só ate um limite para não ficar muito rapido
    }
  
    
    loopId = setTimeout(()=>{
        gameLoop()
    },speed)//aumenta a velocidade da cobra conforme pega as "frutas"
    
}

gameLoop()//chama a primeira vez o loop

//faz o evento de apertar uma tecla
document.addEventListener("keydown", ({key}) =>{ 

        if(key == "ArrowRight" && direction != "left"){
            direction ="right" //incrementa a direção com a tecla usada
        }
        if(key == "ArrowDown"&& direction != "up"){
            direction = "down"
        }
        if(key == "ArrowLeft"&& direction != "right"){
            direction = "left"
        }
        if(key == "ArrowUp"&& direction != "down"){
            direction = "up"
        }

    
})
