let matrizCodificadora = [[1, -1, -1, 1], [2, -3, -5, 4], [-2, -1, -2, 2], [3, -3, -1, 2]];
let matrizDecodificadora = [[6, -1, 0, -1], [22, -4, 1, -4], [14, -3, 1, -2], [31, -6, 2, -5]];

function matrizDesdeArreglo( arreglo, columnas ){
    let matriz = new Array();

    for(let i = 0; i < columnas; i++){
        matriz[i] = new Array();
    }

    for(let i = 0; i < arreglo.length; i++){
        matriz[ i % columnas ][ Math.floor( i / columnas ) ] = arreglo[i];
    }

    if( arreglo.length % columnas != 0 ){
        for( let i = arreglo.length % columnas; i < columnas; i++){
            matriz[i][ Math.floor( ( arreglo.length - 1 ) / columnas ) ] = 0;
        }
    }

    return matriz;
}

function matrizDesdeTexto( texto, columnas ){
    let arreglo = new Array();
    for( let i = 0; i < texto.length; i++ ){
        arreglo[i] = texto.charCodeAt(i);
    }
    
    return matrizDesdeArreglo( arreglo, columnas );
}

function textoDesdeMatriz( matriz ) {
    let texto = new String();
    for (var j = 0; j < matriz[0].length; j++){
        for (var i = 0; i < matriz.length; i++){
            texto += ( matriz[i][j] > 0 ) ? String.fromCharCode( matriz[i][j] ) : "";
        }
    }

    return texto;
}

function matrizDesdeNumeros( texto, columnas ) {
    let i = 0;
    let numeros = texto.split(" ");

    while (i < numeros.length) {

        if (numeros[i].replace(/s+/g, "") == ""){
            numeros.splice(i, 1);
        }
        else i++;
    }

    let arreglo = new Array();
    for (let i = 0; i < numeros.length; i++){
        arreglo[i] = parseInt( numeros[i] );
    }

    return matrizDesdeArreglo(arreglo, columnas);
}//Fin de funcion

function numerosDesdeMatriz( matriz ) {
    let texto = "";
    for (let j = 0; j < matriz[0].length; j++){
        for (let i = 0; i < matriz.length; i++){
            texto += matriz[i][j].toString() + " ";
        }
    }

    return texto;
}//Fin de funcion

function multiplicarMatrices( matriz1, matriz2 ) {
    let matriz = new Array();
    for (let i = 0; i < matriz1.length; i++){
        matriz[i] = new Array();
    }

    for (let i = 0; i < matriz1.length; i++){
        for (let j = 0; j < matriz2[0].length; j++) {
            matriz[i][j] = 0;
            for (let k = 0; k < matriz1[0].length; k++){
                matriz[i][j] += matriz1[i][k] * matriz2[k][j];
            }
        }
    }

    return matriz;
}//Fin de funcion

function numeroAChar( texto ) {
    let resultado = new String();

    for (let i = 0; i < texto.length; i++){
        resultado += String.fromCharCode( texto.charCodeAt(i) + (texto.charCodeAt(i) == 32 ? 33 : 21) );
    }

    return resultado;
}//Fin de funcion

function charANumero( texto ) {
    let resultado = new String();
    for (let i = 0; i < texto.length; i++){
        resultado += String.fromCharCode( texto.charCodeAt(i) - (texto.charCodeAt(i) == 65 ? 33 : 21 ) );
    }

    return resultado;
}//Fin de funcion

function encriptarTexto() {
    let textoPlano = document.getElementById("textoPlano").value;
    let matrizPlana = matrizDesdeTexto( textoPlano, 4 );
    let matrizCodificada = multiplicarMatrices( matrizCodificadora, matrizPlana );
    let textoCodificado = numerosDesdeMatriz( matrizCodificada );

    if (document.getElementById("mapearNumeros").checked){
        textoCodificado = numeroAChar( textoCodificado );
    }

    document.getElementById("textoCodificado").value = textoCodificado;
}//Fin de funcion

function desencriptarTexto() {
    let textoCodificado = document.getElementById("textoCodificado").value;

    if (document.getElementById("mapearNumeros").checked){
        textoCodificado = charANumero( textoCodificado );
    }

    let matrizCodificada = matrizDesdeNumeros( textoCodificado, 4 );
    let matrizPlana = multiplicarMatrices( matrizDecodificadora, matrizCodificada )
    document.getElementById("textoDecodificado").value = textoDesdeMatriz( matrizPlana );
}//Fin de funcion

window.onload = function () {
    document.getElementById("encriptar").onclick = encriptarTexto;
    document.getElementById("desencriptar").onclick = desencriptarTexto;
};//Fin de funcion