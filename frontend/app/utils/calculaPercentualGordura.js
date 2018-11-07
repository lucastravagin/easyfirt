function calculaPercentual(sexoP, STP, idadeP) {
    if(sexoP == "Feminino") {
        densidadeCorporal =  1.097 - (0.0004697 * STP) + ( 0.00000056 * (STP * STP) ) - ( 0.00012828 * idadeP )
    }else{
        densidadeCorporal =  1.112 - (0.00043499 * STP) + ( 0.00000055 * (STP * STP) ) - ( 0.0002882 * idadeP )
    }
    percentual = ( (4.95 / densidadeCorporal) - 4.5 ) * 100
    return percentual
}


