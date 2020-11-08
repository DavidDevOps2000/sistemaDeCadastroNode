function opcoes(nomeVisitante, row){ //row nesse caso é onde vc vai pegar o campo do bando de dados e vai jogar o valor da primeira linha na tela
    if(row.status_visi == 'NÃO')
    {
    var opcoes= "<button class='btn btn-xs btn-success' type='button' onClick='ativarVisi("+'"'+ nomeVisitante +'"'+");'><span class='glyphicon glyphicon-ok-sign' style='width:58px'>Ativar</span></button>";
        return opcoes;
    }else{
    var opcoes= "<button class='btn btn-xs btn-warning' type='button' onClick='desativarVisi("+'"'+ nomeVisitante +'"'+");'><span class='glyphicon glyphicon-remove-sign'>Desativar</span></button>";
        return opcoes;
        }
}



    //Função para REATIVAR o $nomeVisitante
    function desativarVisi(nomeVisiDesativar){ 
        swal({
            title:"Atenção",
            text: "Desativar a entrada desse visitante ?",
            type: "info",
            cancelButtonColor: '#d33',
            showCancelButton: true,
            confirmButtonColor: "info",
            confirmButtonText: "Sim",
            cancelButtonText: "Não",
            closeOnConfirm: false,
            closeOnCancel: true
          },    
            (isConfirm)=>{
                if(isConfirm){
                    $.ajax({
                            url: "visitantes/desativarVisi",
                            type: "POST",
                            data: {'nomeVisitante':nomeVisiDesativar}
                                ,success: (data)=>{
                                    if(data == 1){
                                        swal({ 
                                            title: "OK",
                                            text: "Visitante DESATIVADO!",
                                            type: "success",
                                            showCancelButton: false,
                                            confirmButtonColor: "54DD74",
                                            confirmButtonText: "OK!",
                                            cancelButtonText: "",
                                            closeOnConfirm:true,
                                            closeOnCancel: false
                                            },
                                                (isConfirm)=>{
                                                      if(isConfirm){ document.location.reload(true);}//Atualizar documento caso pressionem Ok
                                                    }
                                                );
                                    }else{
                                        swal({
                                        title: "OK!",
                                        text: "Erro na DESATIVAÇÃO, verifique!",
                                        type: "error",
                                        showCancelButton: false,
                                        confirmButtonColor: "54DD74",
                                        confirmButtonText: "OK!",
                                        cancelButtonText: "",
                                        closeOnConfirm:false,
                                        closeOnCancel: false });
                                        }
                },beforeSend:()=>{
                    swal({
                        title: "Aguarde!",
                        text: "Gravando dados...",
                        imageUrl: "assets/img/gifs/loading.gif",
                        showConfirmButton: false });
                },
                error: (data_error)=>{
                    sweetAlert("Atenção", "Erro ao gravar os dados!", "error");
                }
            });
}
});
}


function ativarVisi(nomeVisiAtivar){ 
swal({
title:"Atenção",
text: "Quer Autorizar a entrada desse visitante ?",
type: "warning",
showCancelButton: true,
confirmButtonColor: "DD6B55",
confirmButtonText: "Sim",
cancelButtonText: "Não",
closeOnConfirm: false,
closeOnCancel: true
},    
(isConfirm)=>{
if(isConfirm){
    $.ajax({
            url: "visitantes/ativarVisi",
            type: "POST",
            data: {'nomeVisitante':nomeVisiAtivar}
                ,success:(data)=>{
                    if(data == 1){
                        swal({ 
                            title: "OK",
                            text: "Visitante ATIVO!",
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "54DD74",
                            confirmButtonText: "OK!",
                            cancelButtonText: "",
                            closeOnConfirm:true,
                            closeOnCancel: false }
                            ,
                            (isConfirm)=>{
                                if(isConfirm){ document.location.reload(true);}//Atualizar documento caso pressionem Ok
                                }
                            );
                    }else{
                        swal({
                        title: "OK!",
                        text: "Erro na DESATIVAÇÃO, verifique!",
                        type: "error",
                        showCancelButton: false,
                        confirmButtonColor: "54DD74",
                        confirmButtonText: "OK!",
                        cancelButtonText: "",
                        closeOnConfirm:false,
                        closeOnCancel: false });
                        }
},beforeSend:()=>{
    swal({
        title: "Aguarde!",
        text: "Gravando dados...",
        imageUrl: "assets/img/gifs/loading.gif",
        showConfirmButton: false });
},
error:(data_error)=>{swal({
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
});
}