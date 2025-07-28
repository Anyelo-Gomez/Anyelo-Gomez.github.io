var formUser;
var nickInput;
var email;
var error;
var tamanioJuego;
var avatars;
var contentAvatar;
var itemAvatar;


//funcion para validad y mandar los datos del formulario
function form(event){


    if(nickInput.value.length < 3){
        error.innerText = 'Error! Nick incorrecto'
        event.preventDefault();
        return false;
    }
    else if(email.value.length < 3){
        error.innerText = 'Error! Email incorrecto'
        event.preventDefault();
        return false;
    }
    else if(tamanioJuego.value == 0){
        error.innerText = 'Error! No elegiste una option'
        event.preventDefault();
        return false;

    }

    
    error.innerText = '';
    sessionStorage.removeItem('time');
    tamanioJuego = tamanioJuego.value;
    guardarDatos(nickInput.value, email.value, tamanioJuego);

}

//funcion para cambiar el avatar
function cambiarAvatar(){

    let item = contentAvatar.querySelector('img');
    item.src = itemAvatar;
    dataAvatar(item.src)
}



//funcion para cargo el dom al cargar el archivo
function domCargado(){
    
    formUser = document.getElementById('formUser');
    nickInput = document.getElementById('nick');
    email = document.getElementById('email');
    error = document.getElementById('error');
    tamanioJuego = document.getElementById('optionTamanio');
    contentAvatar = document.querySelector('.itemAvatar');
    avatars = document.querySelectorAll('.itemAvatars');
    let item = contentAvatar.querySelector('img');

    //funcio  para obtener el avatar
    avatars.forEach(item=>{
        item.addEventListener('drag', ()=>{
            itemAvatar = item.querySelector('img').src;
            
        })
    })

    contentAvatar.addEventListener('dragover', (event)=>{
        event.preventDefault();
    })

    contentAvatar.addEventListener('drop', cambiarAvatar);
    
    formUser.addEventListener('submit', form);

    // verificar si hay error en el sessionStorage
    if(sessionStorage.getItem('error') != null){
        error.innerText = sessionStorage.getItem('error');
        sessionStorage.removeItem('error');
    }
    

}

domCargado();