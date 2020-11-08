$(document).ready( ()=>{ $('#formLogin').submit((event)=>{
    //Evento do formulario, ao pressionar o botao submit
    // vai ativar o ajax e json.
   
$.ajax({
        type:"POST",
        url: 'Login/Logar',//Controller login no metodo logar_ajax
        data: $('#formLogin').serialize(),//Os IDs dos Form vão para a validação na controller
        
        success:(data)=>{//Caso toda a controller funcione corretamente

            if ($.trim(data) == '1') { //Valido o retorno da controller
         
               
                window.location.href = 'home';

            }else{

                swal({ //Caso retorne algo exibe uma mensagem ao usuario
                    title: "Atenção!",
                    text:"Acesso negado, Usuário ou senha inválido!",
                    type:"error",
                    });
                        $("#formLogin").trigger('reset');//Limpa os objetos de tela
                }

        },beforeSend:()=>{ //Tela de carregamento

                swal({
                    title:"Aguarde!",
                    text:"Carregando...",
                    imageUrl: "assets/img/gifs/loading.gif",
                    showConfirmButton: false
                    });
        },
            
        error: ()=>{
                
                swal({ //Caso retorne algo exibe uma mensagem ao usuario
                    title: "Falha no Login",
                    text:"Falha na Conexão, tente mais tarde",
                    type:"error",
                    });
        }
        });
        return false;//Aqui vai desativar a função após execução
    });
});



function esqueceuSenhaLogin(){
    swal({ //Caso retorne algo exibe uma mensagem ao usuario
        title:"Atenção!",
        text:"Para requisitar uma nova senha, é necessário ir até a portaria fazer uma solicitação ",
        type:"info",
        });
}