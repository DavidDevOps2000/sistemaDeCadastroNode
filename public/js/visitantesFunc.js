$(document).ready(function () {
    $("#formCadasVisi").submit(function (event) {
        var nomeVisiValor = $('#valorNomeVisitante').val();
        nomeVisiValor = nomeVisiValor.trim();

        swal({
            title: "Atenção",
            text: "Tem certeza que quer cadastrar esse Visitante ?",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "DD6B55",
            confirmButtonText: "Sim",
            cancelButtonText: "Não",
            closeOnConfirm: false,
            closeOnCancel: true
        }, (isConfirm) => {
            if (isConfirm) {
                $.ajax({
                    type: "POST",
                    url: "visitantes/cadastrarVisitantes",  //Cadastrar Visitantes
                    data: {
                        'valorNomeVisi': nomeVisiValor,
                        'valorDuracaoDias': $('#valorDuracaoDias').val(),
                        'valorRg': $('#valorRgVisi').val()
                    }, success: (data) => {
                        if ($.trim(data) == 1) {
                            $("#formCadasVisi").trigger("reset");

                            swal({ title: "OK!", text: "Visitante Salvo com Sucesso", confirmButtonText: "Ok", type: "success" }
                                , (isConfirm) => {
                                    if (isConfirm) {
                                        document.location.reload(true);//Atualizar documento caso pressionem Ok
                                    }
                                });
                        } else if ($.trim(data) == 2) { /*var msg = data;  alert(msg);*/

                            swal({ title: "Visitante já existe", text: "Por Favor... Digite outro nome", type: "error" });

                        } else {
                            swal({ title: "ATENÇÃO!", text: "Erro ao inserir visitante, verifique!", type: "error" });
                        }

                    }, beforeSend: () => {
                        swal({ title: "Só um momento...", text: "Loading...", imageUrl: "assets/img/gifs/loading.gif", showConfirmButton: false });

                    }, error: () => {
                        swal({
                            title: "OK",
                            text: "Error no Banco de dados, Por Favor entre mais tarde",
                            type: "error",
                            showCancelButton: false,
                            confirmButtonColor: "#54DD74",
                            confirmButtonText: "OK!",
                            closeOnConfirm: false,
                            closeOnCancel: false
                        });
                    }//Só dá erro aqui, quando há um problema no banco de dados ou no model

                });
                return false;//Esse Returna deve ficar após os swal, pois senão, vao carregar ETERNAMENTE SEM DAR OS RESULTADOS
            }
        });

        return false;
    });
})


function btnEditOpcoes(nomeVisiConsultar) {
    var opcoesEdit = "<input class='btn btn-sm btn-info btn_arendondado btn_arendondado_edit' type='button' data-toggle='modal' onClick='consulAlterVisi(" + '"' + nomeVisiConsultar + '"' + ");' data-target='#ModalEditar' value='Editar Visitante'>\
                    <input class='btn btn-sm btn-danger btn_arendondado btn_arendondado_del' type='button' onClick='deletarVisi("+ '"' + nomeVisiConsultar + '"' + ");' value='Deletar'>";
    return opcoesEdit;
}


function mudarStatus() {
    vlrAutoriza = document.getElementById('vlrAutoriza').innerHTML;

    if (vlrAutoriza == 'NÃO') {

        document.getElementById("vlrAutoriza").innerHTML = 'SIM';
    } else {

        document.getElementById("vlrAutoriza").innerHTML = 'NÃO';
    }
}

var nomeSeu;//deixe essa var aqui para ser usada

function consulAlterVisi(nomeVisiConsultar) {

    $.ajax({
        type: "POST",
        url: 'visitantes/consultVisiToModel',
        dataType: 'json',
        data: { 'nomeVisitante': nomeVisiConsultar },
        success: (data) => {
            nomeSeu = data[0].nome_visi;//Salvando nome antigo aqui, para ser usado no insert na conficional Where

            $('#vlrNomeVisi').val(data[0].nome_visi);//Insertando os valores do JSN result da controller
            $('#vlrRgVisi').val(data[0].rg_visi);
            $('#vlrAutoriza').val(data[0].autorizado);
            document.getElementById("vlrDiaFim").innerHTML = data[0].data_fim_visi;
            swal.close();//Esse close,é para evitar que carregue, pois senão, vao carregar ETERNAMENTE SEM DAR OS RESULTADOS
        },
        beforeSend: () => {
            swal({ title: "Só um momento...", text: "Loading...", imageUrl: "assets/img/gifs/loading.gif", showConfirmButton: false });
        },
        error: () => {
            swal({
                title: "OK",
                text: "Error no Banco de dados, Por Favor entre mais tarde",
                type: "error",
                showCancelButton: false,
                confirmButtonColor: "#54DD74",
                confirmButtonText: "OK!",
                closeOnConfirm: false,
                closeOnCancel: false
            });
            swal.close();
        }
    });
}



var mostrarData;
function diasRestantes(numeroDia, row) {//Esse Row é uma propriedadade da table onde vc pega o valor da linha e a utiliza

    ano = row.data_fim_visi[0] + '' + row.data_fim_visi[1];//Peguei os 2 primeiros digitos do Ano dentro da linha do campo 'data_fim_visi'
    mes = row.data_fim_visi[5] + '' + row.data_fim_visi[6];//Peguei os 2 primeiros digitos do Mes dentro da linha do campo 'data_fim_visi'
    dia = row.data_fim_visi[8] + '' + row.data_fim_visi[9];//Peguei os 2 primeiros digitos do Ano dentro da linha do campo 'data_fim_visi'
    diaConvert = dia + '/' + mes + '/' + ano;

    mostrarData = diaConvert; return diaConvert;
}

function alterVisita() {

    var vlrMaisDias = $('#vlrMaisDias').val();
    var vlrStatus = document.getElementById('vlrAutoriza').innerHTML;

    if (vlrStatus == 'NÃO') {//Convertendo em true ou false para bd
        vlrStatus = false;
    } else {
        vlrStatus = true;
    }


    vlrNomeVisi = $('#vlrNomeVisi').val();
    vlrNomeVisi = vlrNomeVisi.trim();

    $.ajax({
        type: "POST",
        url: 'visitantes/alterVisi',
        data: {
            'nomeVisi': nomeSeu,
            'nomeNovoVisi': $('#vlrNomeVisi').val(),
            'maisDias': vlrMaisDias,
            'novoStatus': vlrStatus,
            'vlrRg': $('#vlrRgVisi').val()
        }, success: (data) => {
            if (data == 1) {
                swal({
                    title: "OK",
                    text: "Dados alterados",
                    type: "success",
                    showCancelButton: false,
                    confirmButtonColor: "#54DD74",
                    confirmButtonText: "OK!",
                    closeOnConfirm: true,
                    closeOnCancel: false
                }
                    , (isConfirm) => {
                        if (isConfirm) { document.location.reload(true); /*Atualizar documento caso pressionem Ok*/ }
                    }
                );
            } else {
                swal({
                    title: "OK",
                    text: "Não houve alteração no visitante, verifique os dados",
                    type: "error",
                    showCancelButton: false,
                    confirmButtonColor: "#54DD74",
                    confirmButtonText: "OK!",
                    closeOnConfirm: false,
                    closeOnCancel: false
                });
            }
        }, beforeSend: () => {
            swal({ title: "Aguarde!", text: "Carregando...", imageUrl: "assets/img/gifs/loading.gif", showConfirmButton: false });

        }, error: () => {
            swal({
                title: "OK",
                text: "Error no Banco de dados, Por Favor entre mais tarde",
                type: "error",
                showCancelButton: false,
                confirmButtonColor: "#54DD74",
                confirmButtonText: "OK!",
                closeOnConfirm: false,
                closeOnCancel: false
            });
        }
    });
}

function deletarVisi(nomeVisiConsultar) {

    swal({
        title: "Atenção",
        text: "Tem certeza que quer deletar esse Visitante ?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "DD6B55",
        confirmButtonText: "Sim",
        cancelButtonText: "Não",
        closeOnConfirm: false,
        closeOnCancel: true
            },(isConfirm)=>{
                    if (isConfirm){
                        $.ajax({type: "POST",
                                url: "visitantes/delVisi",  //Cadastrar Visitantes
                                data: {'nomeVisitanteDel':nomeVisiConsultar
                                        },success: (data) => {
                                                        if($.trim(data) == 1){ 
                                                                swal({ title: "OK!", text: "Visitante Deletado com Sucesso", confirmButtonText: "Ok", type: "success" }
                                                                        ,(isConfirm)=>{
                                                                                if(isConfirm){ document.location.reload(true);/*Atualizar documento caso pressionem Ok*/ }
                                                                                });
                                                        }else{swal({ title: "ATENÇÃO!", text: "Erro ao deletar visitante, verifique!", type: "error" }); }

                                        },beforeSend:()=>{ swal({ title: "Só um momento...", text: "Loading...", imageUrl: "assets/img/gifs/loading.gif", showConfirmButton: false });
                                        },error: () => {
                                            swal({title: "OK",text: "Error no Banco de dados, Por Favor entre mais tarde",type: "error",showCancelButton: false,confirmButtonColor: "#54DD74",confirmButtonText: "OK!",closeOnConfirm: false,closeOnCancel: false});
                                        }//Só dá erro aqui, quando há um problema no banco de dados ou no model
            });
            return false;//Esse Returna deve ficar após os swal, pois senão, vao carregar ETERNAMENTE SEM DAR OS RESULTADOS
        }
    });
    return false;
}

   //Criando um objeto
jQuery(function($){
    $("#valorRgVisi").mask("99.999.999-9");
    $("#vlrRgVisi").mask("99.999.999-9");
});
