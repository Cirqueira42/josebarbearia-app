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

```
// Mensagem para WhatsApp
const mensagem =
  "Olá, meu nome é " + nome +
  ". Acabei de agendar:\n" +
  "Serviço: " + servico + "\n" +
  "Data: " + data + "\n" +
  "Hora: " + hora;

const numero = "5516997369740";
const url = "https://wa.me/" + numero + "?text=" + encodeURIComponent(mensagem);

alert("Agendamento realizado!");

// Abre WhatsApp
window.location.href = url;
```

})
.catch(error => {
alert("Erro: " + error);
});

}
