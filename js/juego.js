if(!validarDatos()){
    
    location='index.html';
}

var juego;
var contentAtras;
var contentJuego;

var listaPos = [];
var listaCompleta = [];
var id = 0;
var listaMov  = [];

var timeJuego;
var time = 1;
var Interval;
var IntervalCard;
var IntervalFinal;
var btnVolver;

var contentVolverJugar;
var jugadasAcertadas =[];

var listJuegoHtml = [];
var listAtrasHtml = [];





var sizeJuego = parseInt(tamanioJuego)*parseInt(tamanioJuego);

var numSorpresa = Math.floor(Math.random() * (sizeJuego - 1) + 1);
console.log(numSorpresa);

// funccion paara establecer dificultad
function dificultad(){

    if(sizeJuego === 36){
        timeJuego.value = 120;  
    }
    else if(sizeJuego === 25){
        timeJuego.value = 90;
    }
    else{ 
        timeJuego.value = 60;
    }
}



//funcion para crear lista de cartas
function createList(){

    
    for(let index =1; index<=17; index++){
        listaPos.push(index);
        
    }

    if(sizeJuego == 16){
        contentAtras.style.gridTemplateColumns=`repeat(${Math.sqrt(sizeJuego)}, 1fr)`;

        juego.style.gridTemplateColumns=`repeat(${Math.sqrt(sizeJuego)}, 1fr)`;
    
    }

    //gerando lista aleatoria
    for(let i = listaPos.length -1; i>0; i--){
        let a = Math.floor(Math.random() * (i-1));

        [listaPos[i], listaPos[a]] = [listaPos[a], listaPos[i]]
    }

    for(let index=0; index<= sizeJuego; index++){

        if(listaCompleta.length <= sizeJuego-2){

            listaCompleta.push(listaPos[index]);
            listaCompleta.push(listaPos[index]);

        }
        else{
            break;
        }
    }

    
}


//creando elemento de la parte de alante de la carta
function ItemElement(image){

    let divContentItem = document.createElement('div');
    divContentItem.classList.add('contentItem');

    divItem = document.createElement('div');
    divItem.classList.add('item');
    
    let img = document.createElement('img');
    img.src = image;
    img.id = id;

    divItem.appendChild(img);
    divContentItem.appendChild(divItem);
    juego.appendChild(divContentItem);

    listJuegoHtml.push(divItem.parentElement);
}


//creando elemento de la parte de atras de la carta

function ItemAtrasElement(){

    let divContentItem = document.createElement('div');
    divContentItem.classList.add('contentItemAtras');

    divItem = document.createElement('div');
    divItem.classList.add('itemAtras');
    
    let img = document.createElement('img');
    img.src = 'img/dragonball/dragon ball.jpg'
    img.id = `-${id}`;

    divItem.appendChild(img);
    divContentItem.appendChild(divItem);
    contentAtras.appendChild(divContentItem);

    listAtrasHtml.push(divItem.parentElement);


}


//funcion para general todos los elemento de cartas
function genItem(){
    
    for(let item of listaCompleta.sort(()=> (Math.random() - 0.5))){
        
        id += 1;
        pathImg = `img/dragonball/${item}.jpg`
        ItemElement(pathImg);
        ItemAtrasElement();
    } 
    
    contentVolverJugar.style.height = `${juego.offsetHeight}px`;
    contentJuego.style.height = `${juego.offsetHeight}px`;


}


//evento del juego
function eventJuego(){
    
    let Item = document.getElementsByClassName('itemAtras');
    
    for(let item of Item){

        item.addEventListener('click', selectItem);
        
    }    
}


//funcion para verificar la carta que fue pulsa
function selectItem(event){

    
    
    item = event.target.parentElement;
    item.style.zIndex='1'

    let idItem = `${item.querySelector('img').id}`;

    let itemPulsado = document.getElementById(idItem.replace('-', ''));
    itemPulsado.parentElement.style.zIndex='2';

   
    listaMov.push(itemPulsado);
    
    validadJuego();
}


//funcion para verifica si hay acierto o no 
function validadJuego(){

    if(listaMov.length === 2){

       

        if(listaMov[0].id === listaMov[1].id){
            
            listaMov = [];
        }
        else{

            if(listaMov[0].src === listaMov[1].src){

                jugadasAcertadas.push(document.getElementById(listaMov[0].id).parentElement.parentElement);
                jugadasAcertadas.push(document.getElementById(listaMov[1].id).parentElement.parentElement);
                

                document.getElementById(`-${listaMov[0].id}`).style.zIndex=1;
                document.getElementById(`-${listaMov[1].id}`).style.zIndex=1;
                document.getElementById(`${listaMov[0].id}`).style.zIndex=2;
                document.getElementById(`${listaMov[1].id}`).style.zIndex=2;


                let puntos = document.getElementById('puntos');
                puntos.value = parseInt(puntos.value) + 5;
                
                if(jugadasAcertadas.length >= (sizeJuego -1)){
                    juegoTerminado('!GANASTE!');
                }

                if(listaMov[1].id == numSorpresa || listaMov[0].id == numSorpresa){
                    obtenerSorpresa();
                }

                 
                listaMov = [];
                console.log(jugadasAcertadas.length);
            }
            else{
                
                IntervalCard = setInterval(cambiarZIndexCard, 100);    
            }  
        }
    }   
}


// fiuncion que da una sorpresa por partida
function obtenerSorpresa(){

    let numRandom = Math.floor(Math.random()*3);
    

    if(numRandom === 0){
        alert('se restar 10 segundo del tiempo');
        timeJuego.value = parseInt(timeJuego.value) - 10;
    }
    else if(numRandom === 1){
        alert('se sumara 10 segundo del tiempo');

        timeJuego.value = parseInt(timeJuego.value) + 10;
    }
    else if (numRandom === 2){
        sessionStorage.setItem('time', timeJuego.value);
        alert('se reestablecera el juego');
        location.reload();
        

    }
  
}


//funcion para mostrar y deja de mostrar la carta pulsada
function cambiarZIndexCard(){

    let timeCard = 1;

    timeCard -=1;


    if(timeCard === 0){

        clearInterval(IntervalCard);

        document.getElementById(listaMov[0].id).parentElement.style.zIndex='1';
        
        document.getElementById(listaMov[1].id).parentElement.style.zIndex='1';

        document.getElementById(`-${listaMov[0].id}`).parentElement.style.zIndex='2';

        document.getElementById(`-${listaMov[1].id}`).parentElement.style.zIndex='2';

        timeCard = 1;
        listaMov = [];
    }

}

//funcion para mostrar todos las cartas al inicio del juego
function mostrarTodo(){
    time -= 1;


    if(time <= 0){
        clearInterval(Interval);
        
        for(let item of document.getElementsByClassName('itemAtras')) item.style.zIndex='2';
        for(let item of document.getElementsByClassName('item')) item.style.zIndex='1';
        IntervalFinal = setInterval(tiempoTerminado, 1000);
        
    }

}

//funcion que verifica si el tiempo del juego se termino
function tiempoTerminado(){

    timeJuego.value -=1;

    if(timeJuego.value == 0)  {

        clearInterval(IntervalFinal);
        juegoTerminado('GAME OVER');
    }

}


//funcion que termina el juego 
function juegoTerminado(mensaje){
    
    
    let contentTerminado =  document.querySelector('.contentVolverJugar');
    contentTerminado.style.display='block'
    contentTerminado.style.zIndex='3';
    contentTerminado.querySelector('h3').innerText = mensaje
    
    btnVolver.addEventListener('click', ()=>{
        sessionStorage.removeItem('time');
        location.reload();
    })

    let Item = document.getElementsByClassName('itemAtras');

    for(let item of Item){
        item.removeEventListener('click', selectItem);
        
    }
}    

//funcion que carga el dom al cargar el archivo
function domCargado(){

    juego = document.getElementById('juego');
    contentAtras = document.getElementById('contentAtras');
    btnVolver = document.getElementById('btnVolverJugar');
    contentJuego = document.querySelector('.contentJuego');
    contentVolverJugar = document.querySelector('.contentVolverJugar');    
    timeJuego = document.getElementById('timeJuego');
     

    document.getElementById('nick').value = nickInput;
    console.log(document.getElementById('avatarImg').src = avatar);


    let timeRestante = sessionStorage.getItem('time');

    
    if(timeRestante){
        timeJuego.value = timeRestante;
    }
    else{
        dificultad();
    }

    
    createList();
    genItem();
    Interval =  setInterval(mostrarTodo, 1000);
    
    eventJuego();
    
    
}


//llamada al dom
domCargado();