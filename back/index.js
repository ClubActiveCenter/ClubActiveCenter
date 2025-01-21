

// sumar solo los numeros pares
const sumarPares = (arrayNum) =>{

    const pares = arrayNum.filter((num) => num % 2 == 0);
    
    let total = 0
    
    for(let i = 0 ; i < pares.length ; i++){
     total += pares[i]
    
    }
}
console.log(sumarPares([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]))
