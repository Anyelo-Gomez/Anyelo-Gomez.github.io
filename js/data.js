    
var nickInput;
var tamanioJuego;
var avatar;

//guardar los datos que introduce el usuario al sessionStorage
function guardarDatos(nick, email, tamano){

    sessionStorage.setItem('nick', (nick));
    sessionStorage.setItem('email', (email)); 
    sessionStorage.setItem('tamano', (tamano));
    
}


function dataAvatar(avatar){
    sessionStorage.setItem('avatar', avatar);
}


//leer datos desde el session storage

function leerDatos(){
    nickInput = sessionStorage.getItem('nick');
    tamanioJuego = sessionStorage.getItem('tamano');
    avatar = sessionStorage.getItem('avatar');
}

//verifica que el usuario introdusca los datos
leerDatos();
function validarDatos(){
    if(!nickInput){
        sessionStorage.setItem('error', 'introduce tus credenciales');
        return false;
        
    }

    else return true;
    
    
}