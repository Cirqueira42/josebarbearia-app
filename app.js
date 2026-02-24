function salvarAgendamento(nome, data, hora) {

  db.collection("agendamentos").add({
    nome: nome,
    data: data,
    hora: hora,
    criadoEm: new Date()
  })
  .then(() => {
    alert("Agendamento realizado com sucesso!");
    window.location.href = "index.html";
  })
  .catch(error => {
    alert("Erro ao agendar: " + error);
  });

}
