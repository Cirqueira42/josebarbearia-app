// ===== FIREBASE =====
const db = firebase.firestore();

// ===== CONFIGURAÇÃO =====
const horaInicio = 9;
const horaFim = 18;
let horarioSelecionado = null;

// ===== AO CARREGAR A PÁGINA =====
document.addEventListener("DOMContentLoaded", function(){

```
const dataInput = document.getElementById("data");

if(dataInput){
    // Define hoje automaticamente
    const hoje = new Date();
    const dataFormatada = hoje.toISOString().split("T")[0];
    dataInput.value = dataFormatada;

    gerarHorarios();

    // Quando trocar a data
    dataInput.addEventListener("change", gerarHorarios);
}
```

});

// ===== GERAR HORÁRIOS =====
function gerarHorarios(){

```
const container = document.getElementById("horarios");
if(!container) return;

container.innerHTML = "";
horarioSelecionado = null;

const dataSelecionada = document.getElementById("data").value;
const agora = new Date();

for(let h = horaInicio; h <= horaFim; h++){

    let horaTexto = (h < 10 ? "0"+h : h) + ":00";

    const div = document.createElement("div");
    div.className = "horario";
    div.innerText = horaTexto;

    const dataHora = new Date(dataSelecionada + "T" + horaTexto);

    // Bloqueia horários passados
    if(dataHora < agora){
        div.classList.add("ocupado");
    }

    // Clique no horário
    div.onclick = function(){

        if(div.classList.contains("ocupado")) return;

        document.querySelectorAll(".horario").forEach(el=>{
            el.style.background = "#222";
        });

        div.style.background = "#00c853";
        horarioSelecionado = horaTexto;
    };

    container.appendChild(div);
}
```

}

// ===== SALVAR AGENDAMENTO =====
function salvarAgendamento(){

```
if(!horarioSelecionado){
    alert("Selecione um horário");
    return;
}

const nome = document.getElementById("nome").value;
const telefone = document.getElementById("telefone").value;
const data = document.getElementById("data").value;

if(nome === "" || telefone === ""){
    alert("Preencha os dados");
    return;
}

// Salva no Firebase
db.collection("agendamentos").add({
    nome: nome,
    telefone: telefone,
    data: data,
    hora: horarioSelecionado,
    criado: new Date()
})
.then(()=>{

    // ===== WHATSAPP =====
    const numeroBarbeiro = "5575999412596"; // seu número

    const mensagem =
    "Novo agendamento%0A" +
    "Nome: " + nome + "%0A" +
    "Telefone: " + telefone + "%0A" +
    "Data: " + data + "%0A" +
    "Hora: " + horarioSelecionado;

    const url = "https://wa.me/" + numeroBarbeiro + "?text=" + mensagem;

    alert("Agendamento realizado!");
    window.open(url, "_blank");

    location.reload();

})
.catch((erro)=>{
    alert("Erro ao salvar: " + erro);
});
```

}

// ===== ADM =====
function bloquearDia(){
const data = document.getElementById("dataAdmin").value;
if(!data) return;

```
db.collection("bloqueios").doc(data).set({
    bloqueado: true
});

alert("Dia bloqueado");
```

}

function liberarDia(){
const data = document.getElementById("dataAdmin").value;
if(!data) return;

```
db.collection("bloqueios").doc(data).delete();

alert("Dia liberado");
```

}
