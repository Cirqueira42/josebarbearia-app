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
      nome,
      servico,
      data,
      hora,
      criadoEm: new Date()
    })
    .then(() => {
      alert("Agendamento confirmado!");
      window.location.href = "index.html";
    })
    .catch(err => {
      alert("Erro: " + err);
    });

  });
}
