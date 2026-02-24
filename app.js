function salvarAgendamento(nome, servico, data, hora) {

  const ref = db.collection("agendamentos")
                .where("data", "==", data)
                .where("hora", "==", hora);

  ref.get().then(snapshot => {

    if (!snapshot.empty) {
      alert("Esse horário já está ocupado!");
      return;
    }

    db.collection("agendamentos").add({
      nome: nome,
      servico: servico,
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

  });

}
