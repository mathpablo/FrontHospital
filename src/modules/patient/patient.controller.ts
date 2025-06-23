export interface Paciente {
  id?: number;
  name: string;
  dataNascimento: string;
}

export class PatientController {
  titulo = 'Cadastro de Pacientes';
  pacientes: Paciente[] = [];
  novoPaciente: Paciente = { name: '', dataNascimento: '' };

  static $inject = ['$http'];

  constructor(private $http: angular.IHttpService) {
    this.listarPacientes();
  }

  listarPacientes(): void {
    this.$http.get<Paciente[]>('http://localhost:8080/pacientes/listar-pacientes')
      .then(response => {
        this.pacientes = response.data;
      })
      .catch(error => {
        console.error('Erro ao listar pacientes:', error);
      });
  }

adicionarPaciente(): void {
  console.log('Paciente antes de enviar:', this.novoPaciente);

  const dataCorrigida = this.novoPaciente.dataNascimento.replace(/\//g, '-');

  const pacienteParaEnviar = {
    name: this.novoPaciente.name,
    dataNascimento: dataCorrigida
  };

  this.$http.post('http://localhost:8080/pacientes/create', pacienteParaEnviar)
    .then(() => {
      alert('Paciente cadastrado com sucesso!');
      this.novoPaciente = { name: '', dataNascimento: '' };
      this.listarPacientes();
    })
    .catch(error => {
      console.error('Erro ao cadastrar paciente:', error);
    });
}




}
