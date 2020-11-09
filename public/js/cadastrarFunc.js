function editFunc(nomeFunc){
    var opcoesEdit = 
    "<input class='btn btn-sm btn-info' type='button' data-toggle='modal' onClick='consulAlterFunc(" + '"' + nomeFunc + '"' + ") data-target='#ModalEditar' value='Editar' title='Editar Funcionário'>\
    <input class='btn btn-sm btn-danger' type='button' onClick='deletarFunc("+ '"' + nomeFunc + '"' + ");' value='Del' title='Deletar Funcionario'>";
    return opcoesEdit;
}