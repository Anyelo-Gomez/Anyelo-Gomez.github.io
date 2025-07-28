
var lista = [
   1,  2,  3,  4,  5,  6,  7,
   8,  9, 10, 11, 12, 13, 14,
  15, 16, 17
];

var listaVacia = [];

let tamanoPanel = 24;
for(let i=1;i<= tamanoPanel;i++){

    if(listaVacia.length <= (tamanoPanel-2)){
        
        let a = lista.sort(()=> Math.random()-0.5)[0]
        listaVacia.push(a);
        listaVacia.push(a);

    }
    else{
        break;
    }  

}

console.log(listaVacia.sort(()=>Math.random() - 0.5));
console.log(listaVacia.length);
// console.log(lista.sort(()=> Math.random()-0.5)[0]);

