let array = [];
let arrayAnt = [];
let stringRes = ''; // [(,cos,(,0,),/,sin,(,90,),)]

function agregar(val){ // HECHO
    document.getElementById('pantalla').value += val; 
    array[array.length] = val;
}

function limpiar(){ // HECHO
    document.getElementById('pantalla').value = '';
    array = [];
}

function quitar(){ // HACER //agregar 9, agregar 9, quitar, quitar
    document.getElementById('pantalla').value = '';
    for (let a=0;  a<array.length-1; a++){ //array[0] = 9 = arrayAnt = array
        arrayAnt[a] = array[a];
    }
    array = arrayAnt;
    for (let b=0; b<array.length; b++){ //publicas 9
        document.getElementById('pantalla').value += ''+array[b]; 
    }
    arrayAnt=[];
}

function completar(arrEnt, num){ // HECHO
    while(array[num] != null){
        arrEnt[arrEnt.length] = array[num];
        num++;
    }
    array = arrEnt;
}

function arrayNuevo(arrayEntrada){ // HECHO 
    let arrAuxiliar = [];
    arrAuxiliar[0] = arrayEntrada[0]; // arrAuxiliar
    let num = 1;
    while (num < array.length){   //1<12
        if ( (arrayEntrada[num] == '0' || arrayEntrada[num] == '1' || arrayEntrada[num] == '2' ||
        arrayEntrada[num] == '3' || arrayEntrada[num] == '4' || arrayEntrada[num] == '5' ||
        arrayEntrada[num] == '6' || arrayEntrada[num] == '7' || arrayEntrada[num] == '8' ||
        arrayEntrada[num] == '9' || arrayEntrada[num] == '.')  && (arrAuxiliar[arrAuxiliar.length-1] != 'cos' &&
        arrAuxiliar[arrAuxiliar.length-1] != 'sin' && arrAuxiliar[arrAuxiliar.length-1] != 'tan' && arrAuxiliar[arrAuxiliar.length-1] != 'log' &&
        arrAuxiliar[arrAuxiliar.length-1] != 'ln' && arrAuxiliar[arrAuxiliar.length-1] != '*' && arrAuxiliar[arrAuxiliar.length-1] != '/' && 
        arrAuxiliar[arrAuxiliar.length-1] != '^' && arrAuxiliar[arrAuxiliar.length-1] != 'e'  && arrAuxiliar[arrAuxiliar.length-1] != '-' && 
        arrAuxiliar[arrAuxiliar.length-1] != '+' && arrAuxiliar[arrAuxiliar.length-1] != '√' && arrAuxiliar[arrAuxiliar.length-1] != '%' && arrAuxiliar[arrAuxiliar.length-1] != 'π'
        && arrAuxiliar[arrAuxiliar.length-1] != '(' && arrAuxiliar[arrAuxiliar.length-1] != ')' && arrAuxiliar[arrAuxiliar.length-1] != '∛') ){ // si es num y el anterior tb 
            arrAuxiliar[arrAuxiliar.length-1] = ''+arrAuxiliar[arrAuxiliar.length-1]+arrayEntrada[num]; // [5.]
            num ++; // 
        }
        else if(arrayEntrada[num] == 'π'){
            arrAuxiliar[arrAuxiliar.length] = 3.1415926535897932384626433832795028841971693993751058209749445923;
            num++;
        }
        else{ //
            arrAuxiliar[arrAuxiliar.length] = arrayEntrada[num]; 
            num++; 
        }
    }
    array = arrAuxiliar;
}

let indiceA;
let indiceC;
function posParentesis(arrayEntrada){ // HECHO 
    indiceA = -1;
    indiceC = -1;
    for (let a=0; a<arrayEntrada.length; a++){
        if(arrayEntrada[a] == '('){ 
            indiceA = a; 
            let enc = false; 
            for(let b=a; b<arrayEntrada.length && enc == false; b++){ 
                if(arrayEntrada[b] == ')'){ 
                    indiceC = b; 
                    enc = true;
                }
            }
        }
    }
}

function arraySinParentesis(arrayEntrada){ //[(,cos,90,)]
    let arrayAuxParentesis = [];
    posParentesis(array); // indiceA y indiceB definidos
    while (indiceA != -1 && indiceC != -1){
        let a = indiceA;
        let c = indiceC;
        if (c == (a+2)){ // solo hay un numero en medio // nos queda el array sin esos dos parentesis
            for (let z=0; z<indiceA; z++){
                arrayAuxParentesis[arrayAuxParentesis.length] = array[z]; // copiamos todo hasta el ( estudiado
            }
            arrayAuxParentesis[arrayAuxParentesis.length] = array[a+1]; // metemos el numero
            c++; // posicion siguiente al parentesis de cierre
            for(let y=c; y<array.length; y++){
                    arrayAuxParentesis[arrayAuxParentesis.length] = array[y]; // copio el resto
            }
            array = arrayAuxParentesis; // array sin esos dos parentesis
            arrayAuxParentesis = [];
            posParentesis(array); // mas parentesis?
        } 
        else{ // si hay calculo en medio de los parentesis
            let contPrio = 0; //1
            let contSegPrio = 0;
            let contOp = 0;
            for( let h=indiceA; h<indiceC; h++){ // cuantos super prioritario
                if (array[h] == 'cos' || array[h] == 'sin' || array[h] == 'tan'
                || arrayEntrada[h] == 'log' || arrayEntrada[h] == 'ln' || array[h] == 'e'
                || array[h] == 'acos' || array[h] == '√'|| array[h] == '∛' || array[h] == '%'){
                    contPrio++;
                }
                else if (array[h] == '*' || array[h] == '/' || array[h] == '^'){
                    contSegPrio++;
                }
                else if (array[h] == '+' || array[h] == '-'){
                    contOp++;
                }
            }
            if(contPrio!=0){ // hay superprioritario
                let g = indiceA; // inicio al principio del parentesis
                while(contPrio != 0){ // mientras quedas superprioritarios
                    if (array[g] == 'cos'){ // si la pos es un cos
                        let post = array[g+1]*3.1415926535897932384626433832795/180;
                        let res = parseFloat(Math.cos(post)); // calculo el cos del numero siguiente
                        res = res.toFixed(10);
                        if( res == '0.0000000000'){
                            res = 0;
                        }
                        else if( res == '1.0000000000'){
                            res = 1;
                        }
                        for (let z=0; z<g; z++){ // copiamos todo hasta el cos sin incluirlo
                            arrayAuxParentesis[arrayAuxParentesis.length] = array[z]; 
                        }
                        arrayAuxParentesis[arrayAuxParentesis.length] = res; // metemos el calculo del cos
                        for(let y=(g+2); y<array.length; y++){ // copiamos desde pos del cos + 2
                            arrayAuxParentesis[arrayAuxParentesis.length] = array[y]; // copio el resto
                        }
                        array = arrayAuxParentesis; // array con el calculo hecho
                        arrayAuxParentesis = [];
                        posParentesis(array); // nuevo indice para g;
                        contPrio--; //reduzco el contador de uno
                        g = indiceA;
                    }
                    else if ( array[g] == 'sin'){ // si la pos es un cos
                        let post = array[g+1]*3.1415926535897932384626433832795/180;
                        let res = parseFloat(Math.sin(post)); // calculo el cos del numero siguiente
                        res = res.toFixed(10);
                        if( res == '0.0000000000'){
                            res = 0;
                        }
                        else if( res == '1.0000000000'){
                            res = 1;
                        }
                        for (let z=0; z<g; z++){ // copiamos todo hasta el cos sin incluirlo
                            arrayAuxParentesis[arrayAuxParentesis.length] = array[z]; 
                        }
                        arrayAuxParentesis[arrayAuxParentesis.length] = res; // metemos el calculo del cos
                        for(let y=(g+2); y<array.length; y++){ // copiamos desde pos del cos + 2
                            arrayAuxParentesis[arrayAuxParentesis.length] = array[y]; // copio el resto
                        }
                        array = arrayAuxParentesis; // array con el calculo hecho
                        arrayAuxParentesis = [];
                        posParentesis(array); // nuevo indice para g;
                        contPrio--; //reduzco el contador de uno
                        g = indiceA;
                    }
                    else if ( array[g] == 'tan'){ // si la pos es un cos
                        let post= array[g+1];
                        let res = parseFloat(Math.tan(post)); // calculo el cos del numero siguiente
                        for (let z=0; z<g; z++){ // copiamos todo hasta el cos sin incluirlo
                            arrayAuxParentesis[arrayAuxParentesis.length] = array[z]; 
                        }
                        arrayAuxParentesis[arrayAuxParentesis.length] = res; // metemos el calculo del cos
                        for(let y=(g+2); y<array.length; y++){ // copiamos desde pos del cos + 2
                            arrayAuxParentesis[arrayAuxParentesis.length] = array[y]; // copio el resto
                        }
                        array = arrayAuxParentesis; // array con el calculo hecho
                        arrayAuxParentesis = [];
                        posParentesis(array); // nuevo indice para g;
                        contPrio--; //reduzco el contador de uno
                        g = indiceA;
                    }
                    else if ( array[g] == 'log'){ // si la pos es un cos
                        let post = array[g+1];
                        let res = parseFloat(Math.log10(post)); // calculo el cos del numero siguiente
                        for (let z=0; z<g; z++){ // copiamos todo hasta el cos sin incluirlo
                            arrayAuxParentesis[arrayAuxParentesis.length] = array[z]; 
                        }
                        arrayAuxParentesis[arrayAuxParentesis.length] = res; // metemos el calculo del cos
                        for(let y=(g+2); y<array.length; y++){ // copiamos desde pos del cos + 2
                            arrayAuxParentesis[arrayAuxParentesis.length] = array[y]; // copio el resto
                        }
                        array = arrayAuxParentesis; // array con el calculo hecho
                        arrayAuxParentesis = [];
                        posParentesis(array); // nuevo indice para g;
                        contPrio--; //reduzco el contador de uno
                        g = indiceA;
                    }
                    else if ( array[g] == 'ln'){ // si la pos es un cos
                        let post = array[g+1];
                        let res = parseFloat(Math.log(post)); // calculo el cos del numero siguiente
                        for (let z=0; z<g; z++){ // copiamos todo hasta el cos sin incluirlo
                            arrayAuxParentesis[arrayAuxParentesis.length] = array[z]; 
                        }
                        arrayAuxParentesis[arrayAuxParentesis.length] = res; // metemos el calculo del cos
                        for(let y=(g+2); y<array.length; y++){ // copiamos desde pos del cos + 2
                            arrayAuxParentesis[arrayAuxParentesis.length] = array[y]; // copio el resto
                        }
                        array = arrayAuxParentesis; // array con el calculo hecho
                        arrayAuxParentesis = [];
                        posParentesis(array); // nuevo indice para g;
                        contPrio--; //reduzco el contador de uno
                        g = indiceA;
                    }
                    else if ( array[g] == 'e'){ // si la pos es un cos
                        let post = array[g+1];
                        let res = parseFloat(Math.exp(post)); // calculo el cos del numero siguiente
                        for (let z=0; z<g; z++){ // copiamos todo hasta el cos sin incluirlo
                            arrayAuxParentesis[arrayAuxParentesis.length] = array[z]; 
                        }
                        arrayAuxParentesis[arrayAuxParentesis.length] = res; // metemos el calculo del cos
                        for(let y=(g+2); y<array.length; y++){ // copiamos desde pos del cos + 2
                            arrayAuxParentesis[arrayAuxParentesis.length] = array[y]; // copio el resto
                        }
                        array = arrayAuxParentesis; // array con el calculo hecho
                        arrayAuxParentesis = [];
                        posParentesis(array); // nuevo indice para g;
                        contPrio--; //reduzco el contador de uno
                        g = indiceA;
                    }
                    else if ( array[g] == '√'){ // si la pos es un cos
                        let post = array[g+1];
                        let res = parseFloat(Math.sqrt(post)); // calculo el cos del numero siguiente
                        for (let z=0; z<g; z++){ // copiamos todo hasta el cos sin incluirlo
                            arrayAuxParentesis[arrayAuxParentesis.length] = array[z]; 
                        }
                        arrayAuxParentesis[arrayAuxParentesis.length] = res; // metemos el calculo del cos
                        for(let y=(g+2); y<array.length; y++){ // copiamos desde pos del cos + 2
                            arrayAuxParentesis[arrayAuxParentesis.length] = array[y]; // copio el resto
                        }
                        array = arrayAuxParentesis; // array con el calculo hecho
                        arrayAuxParentesis = [];
                        posParentesis(array); // nuevo indice para g;
                        contPrio--; //reduzco el contador de uno
                        g = indiceA;
                    }
                    else if ( array[g] == '∛'){ // si la pos es un cos
                        let post = array[g+1];
                        let res = parseFloat(Math.cbrt(post)); // calculo el cos del numero siguiente
                        for (let z=0; z<g; z++){ // copiamos todo hasta el cos sin incluirlo
                            arrayAuxParentesis[arrayAuxParentesis.length] = array[z]; 
                        }
                        arrayAuxParentesis[arrayAuxParentesis.length] = res; // metemos el calculo del cos
                        for(let y=(g+2); y<array.length; y++){ // copiamos desde pos del cos + 2
                            arrayAuxParentesis[arrayAuxParentesis.length] = array[y]; // copio el resto
                        }
                        array = arrayAuxParentesis; // array con el calculo hecho
                        arrayAuxParentesis = [];
                        posParentesis(array); // nuevo indice para g;
                        contPrio--; //reduzco el contador de uno
                        g = indiceA;
                    }
                    else if ( array[g+1] == '%'){ // si la pos es un cos
                        let post  = parseFloat(array[g]);
                        let res = parseFloat(post/100); // calculo el cos del numero siguiente
                        for (let z=0; z<g; z++){ // copiamos todo hasta el cos sin incluirlo
                            arrayAuxParentesis[arrayAuxParentesis.length] = array[z]; 
                        }
                        arrayAuxParentesis[arrayAuxParentesis.length] = res; // metemos el calculo del cos
                        for(let y=(g+2); y<array.length; y++){ // copiamos desde pos del cos + 2
                            arrayAuxParentesis[arrayAuxParentesis.length] = array[y]; // copio el resto
                        }
                        array = arrayAuxParentesis; // array con el calculo hecho
                        arrayAuxParentesis = [];
                        posParentesis(array); // nuevo indice para g;
                        contPrio--; //reduzco el contador de uno
                        g = indiceA;
                    }
                    else{
                        g++;
                    }

                }
            }
            if (contSegPrio != 0){ // si quedan prioritarios
                let g = indiceA; // inicio al principio del parentesis
                while(contSegPrio != 0){ // mientras quedan prioritarios
                    if (array[g] == '*'){ // si la pos es un cos
                        let pre = array[g-1];
                        let post  = array[g+1];
                        let res = parseFloat(pre)*parseFloat(post); // calculo la multiplicacion
                        for (let z=0; z<(g-1); z++){ // copiamos todo hasta pre sin incluirlo
                            arrayAuxParentesis[arrayAuxParentesis.length] = array[z]; 
                        }
                        arrayAuxParentesis[arrayAuxParentesis.length] = res; // metemos el calculo
                        for(let y=(g+2); y<array.length; y++){ // copiamos desde post
                            arrayAuxParentesis[arrayAuxParentesis.length] = array[y]; // copio el resto
                        }
                        array = arrayAuxParentesis; // array con el calculo hecho
                        arrayAuxParentesis = [];
                        posParentesis(array); // nuevo indice para g;
                        contSegPrio--; //reduzco el contador de uno
                        g = indiceA;
                    }
                    if ( array[g] == '/'){ // si la pos es un cos
                        let pre = array[g-1];
                        let post = array[g+1];
                        let res = parseFloat(pre)/parseFloat(post); // calculo la multiplicacion
                        for (let z=0; z<(g-1); z++){ // copiamos todo hasta pre sin incluirlo
                            arrayAuxParentesis[arrayAuxParentesis.length] = array[z]; 
                        }
                        arrayAuxParentesis[arrayAuxParentesis.length] = res; // metemos el calculo
                        for(let y=(g+2); y<array.length; y++){ // copiamos desde post
                            arrayAuxParentesis[arrayAuxParentesis.length] = array[y]; // copio el resto
                        }
                        array = arrayAuxParentesis; // array con el calculo hecho
                        arrayAuxParentesis = [];
                        posParentesis(array); // nuevo indice para g;
                        contSegPrio--; //reduzco el contador de uno
                        g = indiceA;
                    }
                    if ( array[g] == '^'){ // si la pos es un cos
                        let pre = array[g-1];
                        let post= array[g+1];
                        let preNum = parseFloat(pre); //pre num anterior al multiplicar
                        let postNum = parseFloat(post); // post num siguiente a multiplicar
                        let res = Math.pow(preNum,postNum); // calculo la multiplicacion
                        for (let z=0; z<(g-1); z++){ // copiamos todo hasta pre sin incluirlo
                            arrayAuxParentesis[arrayAuxParentesis.length] = array[z]; 
                        }
                        arrayAuxParentesis[arrayAuxParentesis.length] = res; // metemos el calculo
                        for(let y=(g+2); y<array.length; y++){ // copiamos desde post
                            arrayAuxParentesis[arrayAuxParentesis.length] = array[y]; // copio el resto
                        }
                        array = arrayAuxParentesis; // array con el calculo hecho
                        arrayAuxParentesis = [];
                        posParentesis(array); // nuevo indice para g;
                        contSegPrio--; //reduzco el contador de uno
                        g = indiceA;
                    }
                    else{
                        g++;
                    }
                }
            }
            if (contOp != 0){ // si quedan operadores (HECHO)
                let g = indiceA; // inicio al principio del parentesis
                while(contOp != 0){ // mientras quedan prioritarios
                    if (array[g] == '-'){ // si la pos es un cos
                        let pre = parseFloat(array[g-1]);
                        let post = parseFloat(array[g+1]);
                        let res = pre-post; // calculo la multiplicacion
                        for (let z=0; z<(g-1); z++){ // copiamos todo hasta pre sin incluirlo
                            arrayAuxParentesis[arrayAuxParentesis.length] = array[z]; 
                        }
                        arrayAuxParentesis[arrayAuxParentesis.length] = res; // metemos el calculo
                        for(let y=(g+2); y<array.length; y++){ // copiamos desde post
                            arrayAuxParentesis[arrayAuxParentesis.length] = array[y]; // copio el resto
                        }
                        array = arrayAuxParentesis; // array con el calculo hecho
                        arrayAuxParentesis=[];
                        posParentesis(array); // nuevo indice para g;
                        contOp--; //reduzco el contador de uno
                        g = indiceA;
                    }
                    else if ( array[g] == '+'){ // si la pos es un cos
                        let pre = array[g-1];
                        let post = array[g+1];
                        let preNum = parseFloat(pre); //pre num anterior al multiplicar
                        let postNum = parseFloat(post); // post num siguiente a multiplicar
                        let res = preNum+postNum; // calculo la multiplicacion
                        for (let z=0; z<(g-1); z++){ // copiamos todo hasta pre sin incluirlo
                            arrayAuxParentesis[arrayAuxParentesis.length] = array[z]; 
                        }
                        arrayAuxParentesis[arrayAuxParentesis.length] = res; // metemos el calculo
                        for(let y=(g+2); y<array.length; y++){ // copiamos desde post
                            arrayAuxParentesis[arrayAuxParentesis.length] = array[y]; // copio el resto
                        }
                        array = arrayAuxParentesis; // array con el calculo hecho
                        arrayAuxParentesis=[];
                        posParentesis(array); // nuevo indice para g;
                        contOp--; //reduzco el contador de uno
                        g = indiceA;
                    }
                    else{
                        g++;
                    }
                }
            }
        }
    }
}

function calcular(string){
    let arrAux = [];
    arrayNuevo(array); 
    arraySinParentesis(array);
    let resultado;

    let contPrio = 0; 
    let contSegPrio = 0;
    for(let x=0; x<array.length; x++){
        if( array[x] == 'cos' || array[x] == 'sin' || array[x] == 'tan' || array[x] == 'log' ||
        array[x] == 'ln' || array[x] == 'e' || array[x] == '√' || array[x] == '%' || array[x] == '∛' ){
            contPrio++; // contPrio = 1;
        }
        if(array[x] == '^' || array[x] == '/' || array[x] == '*'){
            contSegPrio++; // contSegPrio = 0;
        }
    }

    let i = 0;
    while(array.length > 1 && contPrio != 0){ // mientras queden super prioritarios
        if (array[i] == 'cos'){
            let res = Math.cos(array[i+1]*3.14159265358979323846264338327950288419716939937510582097494459230781640628620899862/180);
            res = res.toFixed(10);
            if( res == '0.0000000000'){
                res = 0;
            }
            else if( res == '1.0000000000'){
                res = 1;
            }
            i=i+2; // i -> null
            arrAux[arrAux.length] = res; // 
            completar(arrAux,i); //nada
            arrAux=[]; //arrAux
            i=0;
            contPrio--; // = 0
        }
        else if (array[i] == 'sin'){
            let res = Math.sin(array[i+1]*3.14159265358979323846264338327950288419716939937510582097494459230781640628620899862/180);
            res = res.toFixed(5);
            if( res == '0.0000000000'){
                res = 0;
            }
            else if( res == '1.0000000000'){
                res = 1;
            }
            i=i+2;
            arrAux[arrAux.length] = res;
            completar(arrAux,i);
            arrAux=[];
            i=0;
            contPrio--;
        }
        else if (array[i] == 'tan'){
            let res = Math.tan(array[i+1]*3.14159265358979323846264338327950288419716939937510582097494459230781640628620899862/180);
            res = res.toFixed(10);
            if( res == '0.0000000000'){
                res = 0;
            }
            else if( res == '1.0000000000'){
                res = 1;
            }
            i=i+2;
            arrAux[arrAux.length] = res;
            completar(arrAux,i);
            arrAux=[];
            i=0;
            contPrio--;
        }
        else if (array[i] == 'log'){
            let res = parseFloat(Math.log10(array[i+1]));
            i=i+2;
            arrAux[arrAux.length] = res;
            completar(arrAux,i);
            arrAux=[];
            i=0;
            contPrio--;
        }
        else if (array[i] == 'ln'){
            let res = parseFloat(Math.log(array[i+1]));
            i=i+2;
            arrAux[arrAux.length] = res;
            completar(arrAux,i);
            arrAux=[];
            i=0;
            contPrio--;
        }
        else if (array[i] == 'e'){
            let resNum = parseFloat(array[i+1]);
            let res = parseFloat(Math.exp(resNum));
            i=i+2;
            arrAux[arrAux.length] = res;
            completar(arrAux,i);
            arrAux=[];
            i=0;
            contPrio--;
        }
        else if (array[i] == '√'){
            let res = parseFloat(Math.sqrt(array[i+1]));
            i=i+2;
            arrAux[arrAux.length] = res;
            completar(arrAux,i);
            arrAux=[];
            i=0;
            contPrio--;
        }
        else if (array[i+1] == '%'){
            let pre = array[i];
            let res = parseFloat(pre/100);
            i=i+2;
            arrAux[arrAux.length] = res;
            completar(arrAux,i);
            arrAux=[];
            i=0;
            contPrio--;
        }
        else if (array[i] == '∛'){
            let res = parseFloat(Math.cbrt(array[i+1]));
            i=i+2;
            arrAux[arrAux.length] = res;
            completar(arrAux,i);
            arrAux=[];
            i=0;
            contPrio--;
        }
        else{ // si un numero normal lo meto y avanzo
            arrAux[arrAux.length] = array[i]; // [55,*,6,+]
            i++;
        }
    }

    while(array.length > 1 && contSegPrio != 0){ // mientras queden prioritarios
        if(array[i+1] == '/'){
            let pre = parseFloat(array[i]);
            let post = parseFloat(array[i+2]);
            let res = pre/post;
            i=i+3;
            arrAux[arrAux.length] = res;
            completar(arrAux,i);
            arrAux=[];
            i=0;
            contSegPrio--;
        }
        else if(array[i+1] == '*'){
            let pre = parseFloat(array[i]); //55
            let post = parseFloat(array[i+2]); //6
            let res = pre*post; //55*6
            i=i+3; //i -> +
            arrAux[arrAux.length] = res; 
            completar(arrAux,i);
            arrAux=[];
            i=0;
            contSegPrio--; //[330,+,1.1]
        }
        else if(array[i+1] == '^'){
            let pre = parseFloat(array[i]);
            let post = parseFloat(array[i+2]);
            let res = Math.pow(pre,post);
            i=i+3;
            arrAux[arrAux.length] = res;
            completar(arrAux,i);
            arrAux=[];
            i=0;
            contSegPrio--;
        }
        else{
            arrAux[arrAux.length] = array[i];
            i++;
        }
    }

    let arrAux2 = [];
    let k = 0;
    while(array.length > 1){
        if(array[k+1] == '+'){
            let pre  = parseFloat(array[k]);
            let post = parseFloat(array[k+2]);
            k=k+3;
            let res =  pre+post;
            arrAux2[arrAux2.length] = res;
            completar(arrAux2,k);
            arrAux2=[];
            k=0;
            }
        else if(array[k+1] == '-'){
            let pre = parseFloat(array[k]);
            let post = parseFloat(array[k+2]);
            k=k+3;
            let res =  pre-post;
            arrAux2[arrAux2.length] = res;
            completar(arrAux2,k);
            arrAux2=[];
            k=0;
            }
    }

    resultado = array[0];
    stringRes = '' + resultado;
    document.getElementById('pantalla').value = stringRes;
}

