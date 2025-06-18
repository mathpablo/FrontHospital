document.getElementById('pacienteForm')!.addEventListener('submit', function(event) {
  event.preventDefault();

  const nome = (document.getElementById('nome') as HTMLInputElement).value;
  const dataNascimento = (document.getElementById('dataNascimento') as HTMLInputElement).value;

  fetch('http://localhost:8080/pacientes/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: nome,
      dataNascimento: dataNascimento
    })
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Erro ao salvar paciente.');
    }
    return response.json();
  })
  .then(data => {
    console.log('Paciente salvo com sucesso:', data);
    alert('Paciente cadastrado com sucesso!');
    carregarPacientes(); 
  })
  .catch(error => {
    console.error('Erro:', error);
  });
});

interface Paciente {
  id: number;
  name: string;
  dataNascimento: string;
}

function carregarPacientes() {
  fetch('http://localhost:8080/pacientes/listar-pacientes')
    .then(response => response.json())
    .then((data: Paciente[]) => {
      const lista = document.getElementById('listarPacientes');
      if (lista) {
        lista.innerHTML = '';

        data.forEach((paciente: Paciente) => {
          const li = document.createElement('li');
          li.textContent = `ID: ${paciente.id} | Nome: ${paciente.name} | Nascimento: ${paciente.dataNascimento}`;
          lista.appendChild(li);
        });
      }
    })
    .catch(error => {
      console.error('Erro ao carregar pacientes:', error);
    });
}

window.onload = carregarPacientes;
