interface HistoricoResponse {
  content: Array<{
    hospitalName: string;
    patientName: string;
    dischargeDate: string;
    admissionDate: string;
    specialty: string;
  }>;
}
  
export class InternmentController {
  static $inject = ['$http'];
  vm: any;

  constructor(private $http: angular.IHttpService) {
    this.vm = this;
    this.vm.tela = '';
  }

selecionar(tela: string) {
    this.vm.tela = tela;
    if (tela === 'ativos') this.carregarAtivos();
    if (tela === 'especialidade') this.listarEspecialidade();
  }

internar() {
    const data = { patientId: this.vm.patientId, specialty: this.vm.specialty };
    this.$http.post('http://localhost:8080/internacoes/internar', data)
      .then(() => alert("Internado!"));
  }

darAlta() {
  this.$http.put(`http://localhost:8080/internacoes/alta/${this.vm.internmentLogId}`, {})
    .then(() => alert("Alta dada!"));
}

carregarAtivos() {
    this.$http.get('http://localhost:8080/internacoes/ativos')
      .then(res => this.vm.internacoesAtivas = res.data);
  }

buscarHistorico() {
  this.$http.get<HistoricoResponse>(`http://localhost:8080/internacoes/historico/paciente/${this.vm.pacienteHistoricoId}`)
    .then(res => {
      this.vm.historicoPaciente = res.data.content;
    })
    .catch(err => {
      console.error(err);
      this.vm.historicoPaciente = [];
    });
}

 listarEspecialidade() {
    this.$http.get('http://localhost:8080/internacoes/ativos/por-especialidade')
      .then(res => this.vm.porEspecialidade = res.data);
  }

buscarHistoricoLeito() {
    this.$http.get(`http://localhost:8080/internacoes/historico/leito/${this.vm.codigoLeito}`)
      .then(res => this.vm.historicoLeito = res.data);
  }
}

export {};
