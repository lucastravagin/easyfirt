function calculaPercentual(sexoP, STP, idadeP) {
  if (sexoP == "Feminino") {
    var densidadeCorporal = 1.097 - (0.0004697 * STP) + (0.00000056 * (STP * STP)) - (0.00012828 * idadeP)
  } else {
    var densidadeCorporal = 1.112 - (0.00043499 * STP) + (0.00000055 * (STP * STP)) - (0.0002882 * idadeP)
  }
  let percentual = ((4.95 / densidadeCorporal) - 4.5) * 100
  return percentual
}

function mascaraData(val) {

  var pass = val.value;
  var expr = /[0123456789]/;
  console.log(pass)

  for (var i = 0; i < pass.length; i++) {
    // charAt -> retorna o caractere posicionado no índice especificado
    var lchar = val.value.charAt(i);
    var nchar = val.value.charAt(i + 1);

    if (i == 0) {
      // search -> retorna um valor inteiro, indicando a posição do inicio da primeira
      // ocorrência de expReg dentro de instStr. Se nenhuma ocorrencia for encontrada o método retornara -1
      // instStr.search(expReg);
      if ((lchar.search(expr) != 0) || (lchar > 3)) {
        val.value = "";
      }

    } else if (i == 1) {

      if (lchar.search(expr) != 0) {
        // substring(indice1,indice2)
        // indice1, indice2 -> será usado para delimitar a string
        var tst1 = val.value.substring(0, (i));
        val.value = tst1;
        continue;
      }

      if ((nchar != '/') && (nchar != '')) {
        var tst1 = val.value.substring(0, (i) + 1);

        if (nchar.search(expr) != 0)
          var tst2 = val.value.substring(i + 2, pass.length);
        else
          var tst2 = val.value.substring(i + 1, pass.length);

        val.value = tst1 + '/' + tst2;
      }

    } else if (i == 4) {

      if (lchar.search(expr) != 0) {
        var tst1 = val.value.substring(0, (i));
        val.value = tst1;
        continue;
      }

      if ((nchar != '/') && (nchar != '')) {
        var tst1 = val.value.substring(0, (i) + 1);

        if (nchar.search(expr) != 0)
          var tst2 = val.value.substring(i + 2, pass.length);
        else
          var tst2 = val.value.substring(i + 1, pass.length);

        val.value = tst1 + '/' + tst2;
      }
    }

    if (i >= 6) {
      if (lchar.search(expr) != 0) {
        var tst1 = val.value.substring(0, (i));
        val.value = tst1;
      }
    }
  }

  if (pass.length > 10)
    val.value = val.value.substring(0, 10);
  return true;
}

$(document).ready(function () {
  $('.virgula').mask('0,00', { reverse: true });
  $('.virgula').on('keyup', function () {
    if ($(this).val().length > 3) {
      mascara = '####00,00';
    } else {
      mascara = '####0,0';
    }

    $('.virgula').mask(mascara, { reverse: true });
  })
})

function calculaIdade([dia_aniversario, mes_aniversario, ano_aniversario]) {

  var d = new Date
  var ano_atual = d.getFullYear()
  var mes_atual = d.getMonth() + 1
  var dia_atual = d.getDate()

  var ano_aniversario = +ano_aniversario
  var mes_aniversario = +mes_aniversario
  var dia_aniversario = +dia_aniversario

  var quantos_anos = ano_atual - ano_aniversario;

  if (mes_atual < mes_aniversario || mes_atual == mes_aniversario && dia_atual < dia_aniversario) {
    quantos_anos--;
  }

  return quantos_anos < 0 ? 0 : quantos_anos;
}
