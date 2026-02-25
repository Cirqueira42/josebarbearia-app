const db = firebase.firestore();

const horaInicio = 9;
const horaFim = 18;
let horarioSelecionado = null;

document.addEventListener("DOMContentLoaded", ()=>{
const dataInput = document.getElementById("data");
if(dataInput){
const hoje = new Date().toISOString().split("T")[0];
dataInput.value = hoje;
gerarHorarios();
dataInput.addEventListener("change", gerarHorarios);
}
});

function gerarHorarios(){
const container = document.getElementById("horarios");
container.innerHTML = "";

```
const data = document.getElementById("data").value;
const agora = new Date();

for(let h = horaInicio; h <= horaFim; h++){
    const hora = (h < 10 ? "0"+h : h) + ":00";

    const div = document.createElement("div");
    div.className = "horario";
    div.innerText = hora;

    const dataHora = new Date(data+"T"+hora);

    if(dataHora < agora){
        div.classList.add("ocupado");
    }

    div.onclick = ()=>{
        document.querySelectorAll(".horario").forEach(el=>el.style.background="#222");
        div.style.background="#00c853";
        horarioSelecionado = hora;
    }

    container.appendChild(div);
}
```

}

function salvarAgendamento(){
if(!horarioSelecionado){
alert("Selecione um horário");
return;
}

```
const nome = document.getElementById("nome").value;
const telefone = document.getElementById("telefone").value;
const data = document.getElementById("data").value;

db.collection("agendamentos").add({
    nome,
    telefone,
    data,
    hora: horarioSelecionado
});

alert("Agendamento realizado!");
location.reload();
```

}

function bloquearDia(){
const data = document.getElementById("dataAdmin").value;
db.collection("bloqueios").doc(data).set({bloqueado:true});
alert("Dia bloqueado");
}

function liberarDia(){
const data = document.getElementById("dataAdmin").value;
db.collection("bloqueios").doc(data).delete();
alert("Dia liberado");
}
