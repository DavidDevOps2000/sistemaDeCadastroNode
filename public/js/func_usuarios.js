

    $(document).ready(function(){
        //Salva o cadastro do usuário
        $("#formCadastro").submit(function(event){
            if($("#senha").val() != $("#csenha").val()){
                swal({
                    title: "Atenção!",
                    text: "Senhas incompatíveis, verifique!",
                    type:"error",
                });
                return false;
            }else{
                $.ajax({
                    type: "POST",
                    url: "usuario/cadastrar",
                    data: $("#formCadastro").serialize(),
                    success: function(data){
                        if($.trim(data) == 1){

                            $("#formCadastro").trigger("reset");
                            swal({title: "OK!", text: "Dados salvos com sucesso.", type: "success"});
                        }else{
                            swal({title: "ATENÇÃO!", text: "Erro ao inserir, verifique!", type: "error",});
                        }

                    },
                    beforeSend: function(){
                        swal({title: "AGUARDE!", text: "Carregando...", imageUrl: "assets/img/gifs/preloader.gif",});
                    },
                    error: function(){
                        alert:("Unexpected error.");
                
                    }
                });
                return false;
            }
        });
        setInterval(function(){
            var $table = $('#tableusu');
            $table.bootstrapTable('refresh');
        }, 5000)
    });
        //função que faz aparereces 2 botoes o de busca e o de desativar
    function opcoes(value, row, index){
        if(row.estatus =='DESATIVADO'){
        var opcoes = '<button class="btn btn-xs btn-warning text-center" type="button"  onClick="reativa_usuario('+"'"+ value +"'"+');"><span class="glyphicon glyphicon-open"></span></button>';

        }else{

        var opcoes = '<button class = "btn btn-xs btn-primary text-center" type="button" onclick="busca_usuario('+ "'" + value + "'" +');"><span class = "glyphicon glyphicon-pencil"></span></button>\n\
        <button class = "btn btn-xs btn-danger text-center" type="button" onclick="desativa_usuario('+ "'" + value + "'" +');"><span class = "glyphicon glyphicon-trash"></span></button>';
        }
        return opcoes;
    }

    //função de busca de usuario que aparece um modal.
    function busca_usuario(usuario){
        $('#alteracao').modal('show');
        $.ajax({
            type: "POST",
            url: 'usuario/consalterar',
            dataType: 'json',
            data: {'usuario': usuario},
            success: function (data){
                $('#musuario').val(data[0].usuario);
                $('#msenha').val(data[0].senha);
                swal.close();
            },
            beforeSend: function(){
                swal({
                    title: "Aguarde!",
                    text: "Carregando...",
                    imageUrl: "assets/img/gifs/preloader.gif",
                    showConfirmButton: false
                });
            },
            error: function(){
                alert('Unexpected error.');
                swal.close();
            }
        });
    }

    //Botão alterar dentro do modal recebe essa função
    function alterar(){
        if($("#msenha").val() != $("#mcsenha").val()){
            swal({
                title: "Atenção!",
                text: "senhas incompatíveis, verifique!",
                type: "error"
            });
            return false;
        }else{     
            $.ajax({
                type: "POST",
                url: 'usuario/alterar',
                data: {'senha':$('#msenha').val(),
                        'usuario':$('#musuario').val(),
                        'tipo':$('#mcmb-tipo').val()},
                success: function(data){
                    if(data == 1){
                        swal({
                            title: "OK",
                            text: "Senha ALTERADA!",
                            type: "success",
                            showCancelButton: false,
                            confirmButtonColor: "#54DD74",
                            confirmButtonText: "OK!",
                            closeOnConfirm: true,
                            closeOnCancel: false
                        },
                        function(isConfirm){
                            if(isConfirm){
                                $('#tableusu').bootstrapTable('refresh');
                                
                            }
                        });
                        $('#alteracao').modal('hide');
                        
                        
                    }else{
                        swal({
                            title: "OK",
                            text: "Erro na ALTERAÇÃO, verifique!",
                            type: "error",
                            showCancelButton: false,
                            confirmButtonColor: "#54DD74",
                            confirmButtonText: "OK!",
                            closeOnConfirm: false,
                            closeOnCancel: false
                        });
                    }
                },
                beforeSend: function(){
                    swal({
                        title: "Aguarde!",
                        text: "Carregando...",
                        imageUrl: "assets/img/gifs/preloader.gif",
                        showConfirmButton: false
                    });
                },
                error: function(){
                    alert('Unexpected error.')
                }
            });
        }
    }


    // tipo = document.getElementById('tipoCampo').text;
    // alert(tipo);

    //Desativar o usuario!
function desativa_usuario(usuario){

            swal({
                  title:"Atenção",
                  type: "Gostaria de DESATIVAR esse Usuário?",
                  type: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "DD6B55",
                  confirmButtonText: "Sim",
                  cancelButtonText: "Não",
                  closeOnConfirm: false,
                  closeOnCancel: true
                  },
                  function(isConfirm){
                  if(isConfirm){
                     $.ajax({
                        url: base_url + "usuario/desativar",
                        type: "POST",
                        data: {'usuario':usuario},
                        success: function(data){
                            // nome = data[0].usuario;
                            // alert(nome);
                            
                            if(data == 2){
                                swal({
                                    title: "Atenção",
                                    text: "Vc não pode desativar a si mesmo",
                                    type: "error",
                                    showCancelButton: false,
                                    confirmButtonColor: "54DD74",
                                    confirmButtonText: "OK!",
                                    cacelButtonText: "",
                                    closeOnConfirm:true,
                                    closeOnCancel: false
                                });
                            }else if(data == 1){
                                swal({
                                    title: "OK",
                                    text: "Usuário DESATIVADO!",
                                    type: "success",
                                    showCancelButton: false,
                                    confirmButtonColor: "54DD74",
                                    confirmButtonText: "OK!",
                                    cacelButtonText: "",
                                    closeOnConfirm:true,
                                    closeOnCancel: false
                                },
                            function(isConfirm){
                                if(isConfirm){
                                    $('#tableusu').bootstrapTable('refresh');
                                }
                            });
                            }else{
                                swal({
                                    title: "OK!",
                                    text: "Erro na DESATIVAÇÃO, verifique!",
                                    type: "error",
                                    showCancelButton: false,
                                    confirmButtonColor: "54DD74",
                                    confirmButtonText: "OK!",
                                    cacelButtonText: "",
                                    closeOnConfirm:false,
                                    closeOnCancel: false
                                });
                            }
                        },
                        beforeSend: function(){
                            swal({
                                title: "Aguarde!",
                                text: "Gravando dados...",
                                imageUrl: "assets/img/alertas/loading.gif",
                                showConfirmButton: false
                            });
                        },
                        error: function(data_error){
                            sweetAlert("Atenção", "Erro ao gravar os dados!", "error");
                        }
                    });
                }
            });
        }
    

        function Verifica(){
            $.ajax({
                type: "POST",
                url: 'usuario/verusu',
                data: {'usuario':$('#usuario').val()},
                success: function(data){
                    if (data == 1){
                        swal({
                            title: "OK",
                            text: "Usuário ja cadastrado na base de dados, verifique!",
                            type: "error",
                            showCancelButton: false,
                            confirmButtonColor: "#54DD74",
                            confirmButtonText: "OK!",
                            closeOnConfirm: true,
                            closeOnCancel: false
                        });
                        $('#btnlimpar').click();
                        $('#usuario'.focus());
                    }else{
                        swal.close();
                    }
                },
                beforeSend: function(){
                    swal({
                        title: "Aguarde!",
                        text: "Carregando...",
                        imageUrl: "assets/img/gifs/preloader.gif",
                        showConfirmButton: false
                    });
                },
                error: function() {
                    alert('Error');
                }
            });
        }
//Função para REATIVAR o usuario
function reativa_usuario(usuario){
    swal({
        title:"Atenção",
        type:"Gostaria de REATIVAR esse Usuário?",
        type:"warning",
        showCancelButton:true,
        confirmButtonColor:"#DD6B55",
        confirmButtonText:"Sim",
        cancelButtonText:"Não",
        closeOnConfirm:false,
        closeOnCancel:true},

        function(isConfirm){
            if(isConfirm){
                $.ajax({
                    url:base_url + "usuario/reativar",
                    type:"POST",
                    data:{'usuario':usuario},

                    success:function(data){
                        if(data == 1){
                            swal({
                                title:"OK",
                                text:"Usuário REATIVADO",
                                type:"success",
                                showCancelButton:false,
                                confirmButtonColor:"#54DD74",
                                confirmButtonText:"OK!",
                                cancelButtonText:"",
                                closeOnConfirm:true,
                                closeOnCancel:false
                            },
                            function(isConfirm){
                                if(isConfirm){
                                    $('#tableusu').bootstrapTable('refresh');
                                }
                            });
                        }else{
                            swal({
                                title:"OK",
                                text:"Erro na REATIVAÇÃO, Verifique!",
                                type:"error",
                                showCancelButton:false,
                                confirmButtonColor:"#54DD74",
                                confirmButtonText:"OK!",
                                cancelButtonText:"",
                                closeOnCancel:false,
                                closeOnCancel:false
                            });
                        }
                    },
                    beforeSend: function(){
                        swal({
                            title:"Aguarde!",
                            text:"Gravando dados...",
                            imageUrl:"assets/img/alertas/loading.gif",
                            showConfirmButton:false
                        });
                    },
                    error:function(data_error){
                        sweetAlert("Atenção", "Erro ao gravar os dados!","error");
                    }
                });
            
        }
    });
}

