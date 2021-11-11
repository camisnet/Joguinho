 window.onload = function(){
   inicioJogo();

   function config(){
     let claro = {
     canva:"#F8F8FF",
     body:"#E6E6FA",
     botao:"#000"
   }
      localStorage.setItem("claro", JSON.stringify(claro));

  let escuro = {
     canva:"#CCC",
     body:"#B0E0E6	",
     botao:"#fff"
   }
      localStorage.setItem("escuro", JSON.stringify(escuro));
  }
config();

  document.querySelector("#direita").addEventListener("click", function(){
    direita();
    setTimeout(parar, 1000);
  });

   document.querySelector("#esquerda").addEventListener("click", function(){
    esquerda();
    setTimeout(parar, 1000);
  });

   document.querySelector("#subir").addEventListener("click", function(){
    subir();
    setTimeout(parar, 1000);
  });

   document.querySelector("#descer").addEventListener("click", function(){
    descer();
    setTimeout(parar, 1000);
  });

  document.querySelector("#claro").addEventListener("click", function(){

    let tema =JSON.parse(localStorage.getItem("claro"));
    document.querySelector("canvas").style.background = tema.canva;
    document.querySelector("body").style.background = tema.body;

    const botao = document.querySelectorAll(".direcao");

  Array.prototype.filter.call(botao, function(botao) {
    botao.style.color = tema.botao;
  });

  });

    document.querySelector("#escuro").addEventListener("click", function(){

    let tema =JSON.parse(localStorage.getItem("escuro"));
    document.querySelector("canvas").style.background = tema.canva;
    document.querySelector("body").style.background = tema.body;

    const botao = document.querySelectorAll(".direcao");

  Array.prototype.filter.call(botao, function(botao) {
    botao.style.color = tema.botao;
  });

});



 }
 var personagemObj;

 var obstaculo = [];

 var pontos;


 function inicioJogo(){
   AreaJogo.start();
   personagemObj = new componente("#00CED1", 10, 100, 30,30);
   pontos = new componente("#1874CD", 60, 50, 'Stencil Std, fantasy','30px','texto');
   //obstaculo = new componente("#A020F0",150,80,120,10);
 }
 
 let AreaJogo  = {
  canvas: document.createElement("canvas"),
  start: function() {
    this.canvas.height = 300,
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.frame = 0;
    this.intervalo = setInterval(atualizaAreaJogo, 20);
  },
  limpar: function(){
    this.context.clearRect(0,0, this.canvas.width, this.canvas.height);
  }, 
  parar: function(){
    clearInterval(this.interval);
  }
}

function contarIntervalo(n){
  if((AreaJogo.frame / n) % 1 == 0){
    return true;
}else{
  return false;
  }
}

function componente(cor, x, y, largura, altura, tipo){
  this.tipo = tipo,
  this.altura = altura,
  this.largura = largura,
  this.x = x,
  this.y = y,
  this.velocidadeX = 0,
  this.velocidadeY = 0,
  this.texto = 0,
  this.atualiza = function(){
  contexto = AreaJogo.context;

  if(this.tipo == "texto"){
    contexto.font = this.altura + " " + this.largura;
    contexto.fillStyle = cor;
    contexto.fillText(this.texto, this.x, this.y);
  }else{
    contexto.fillStyle = cor,
    contexto.fillRect(this.x, this.y, this.altura, this.largura);
  }
  
},
this.novaPosicao = function(){
  this.x += this.velocidadeX;
  this.y += this.velocidadeY;
  },
  this.bater = function(obj){
    //posição do person.
    let esquerda = this.x;
    let direita = this.x + this.largura;
    let superior = this.y;
    let inferior = this.y + this.altura;
    //posição do obstaculo
    let objEsquerda = obj.x;
    let objDireita = obj.x + obj.altura;
    let objSuperior = obj.y;
    let objInferior = obj.y + obj.largura;

    let batida = true;

    if(
      ( inferior < objSuperior) || (superior > objInferior) || (direita < objEsquerda) || (esquerda > objDireita)
      ) 
      {
        batida = false;
      }
      return batida;
  }


}

function atualizaAreaJogo(){
  let x, y;

  for(i = 0; i < obstaculo.length; i++){
    if(personagemObj.bater(obstaculo[i])){
    AreaJogo.parar();
    return;
    }
  }

  AreaJogo.limpar();
  AreaJogo.frame += 1;

  if(AreaJogo.frame == 1 || contarIntervalo(150)){
    x = AreaJogo.canvas.width;
    minAltura = 20;
    maxAltura = 200;
    altura = Math.floor(Math.random()*(maxAltura-minAltura+1)+minAltura);
    minVazio = 50;
    maxVazio = 200;
    vazio = Math.floor(Math.random()*(maxVazio-minVazio+1)+minVazio);
    obstaculo.push(new componente("#A020F0",x,0,altura,10));
    obstaculo.push(new componente("#A020F0",x,altura + vazio,x - altura - vazio,10));
  }

  for (i = 0; i < obstaculo.length; i++){
    obstaculo[i].x += -1;
    obstaculo[i].atualiza();
  }
  pontos.texto = "Pontos: " + AreaJogo.frame;
  pontos.atualiza();
  personagemObj.novaPosicao();
  personagemObj.atualiza();

  }

function subir() {
  personagemObj.velocidadeY -= 1;
}

function descer() {
  personagemObj.velocidadeY += 1; 
}

function direita() {
  personagemObj.velocidadeX += 1; 
}

function esquerda() {
  personagemObj.velocidadeX -= 1; 
}

function parar(){
  personagemObj.velocidadeX = 0;
  personagemObj.velocidadeY = 0;
}
