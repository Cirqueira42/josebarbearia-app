function salvarAgendamento(nome, servico, data, hora, duracao) {

db.collection("agendamentos").add({
nome: nome,
servico: servico,
data: data,
hora: hora,
duracao: duracao,
criadoEm: new Date()
})
.then(() => {
alert("Agendamento realizado!");
window.location.href = "index.html";
})
.catch(error => {
alert("Erro: " + error);
});

}
