
export interface Patient {
  id?: number;
  name: string;
  dataNascimento: string;
}

export class PatientController {
  titulo = 'Cadastro de Pacientes';
  pacientes: Patient[] = [];
  novoPaciente: Patient = { name: '', dataNascimento: '' };

  static $inject = ['$http'];

  constructor(private $http: angular.IHttpService) {
    this.listarPacientes();
  }

  listarPacientes(): void {
    this.$http.get<Patient[]>('http://localhost:8080/pacientes/listar-pacientes')
      .then(response => {
        this.pacientes = response.data;
      })
      .catch(error => {
        console.error('Erro ao listar pacientes:', error);
      });
  }

adicionarPaciente(): void {
  console.log('Paciente antes de enviar:', this.novoPaciente);

  // Substitui todas as barras "/" por traços "-"
  const dataCorrigida = this.novoPaciente.dataNascimento.replace(/\//g, '-').trim();

  const pacienteParaEnviar: Patient = {
    name: this.novoPaciente.name?.trim() || '',
    dataNascimento: dataCorrigida
  };

  console.log('Enviando JSON:', pacienteParaEnviar);

  this.$http.post('http://localhost:8080/pacientes/create', pacienteParaEnviar)
    .then(() => {
      alert('Paciente cadastrado com sucesso!');
      this.novoPaciente = { name: '', dataNascimento: '' };
      this.listarPacientes();
    })
    .catch(error => {
      alert('Erro ao cadastrar paciente.');
      console.error('Erro ao adicionar paciente:', error);
    });
}


  deletarPaciente(id: number): void {
    this.$http.delete(`http://localhost:8080/pacientes/${id}`)
      .then(() => {
        alert('Paciente deletado com sucesso');
        this.listarPacientes();
      })
      .catch((error: any) => {
        if (error.status === 409) {
          alert('Paciente está internado e não pode ser deletado.');
        } else if (error.status === 404) {
          alert('Paciente não encontrado.');
        } else {
          alert('Erro ao deletar paciente.');
        }
        console.error('Erro ao deletar paciente:', error);
      });
  }
}
