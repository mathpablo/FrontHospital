interface HistoricoItem {
  hospitalName: string;
  patientName: string;
  dischargeDate: string | null;
  admissionDate: string;
  specialty: string;
}

interface HistoricoResponse {
  content: HistoricoItem[];
  totalPages: number;
  totalElements: number;
  number: number;
  size: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export class InternmentController {
  static $inject = ['$http'];

  vm: any;

  constructor(private $http: angular.IHttpService) {
    this.vm = this;
    this.vm.tela = '';

    this.vm.calcularDiasInternados = this.calcularDiasInternados.bind(this);
  }

  calcularDiasInternados(h: HistoricoItem): number {
    const entrada = new Date(h.admissionDate).getTime();
    const saida = h.dischargeDate ? new Date(h.dischargeDate).getTime() : Date.now();
    const diffMs = saida - entrada;
    return Math.floor(diffMs / (1000 * 60 * 60 * 24));
  }

  selecionar(tela: string) {
    this.vm.tela = tela;
    if (tela === 'ativos') this.carregarAtivos();
    if (tela === 'especialidade') this.listarEspecialidade();
  }

  internar() {
    const data = { patientId: this.vm.patientId, specialty: this.vm.specialty };
    this.$http.post('http://localhost:8080/internar/internar-paciente', data)
      .then(() => {
        alert("Internado!");
      })
      .catch(error => {
        if (error.status === 409) {
          alert("Paciente já internado.");
        } else {
          alert("Erro ao internar paciente: " + (error.data?.message || error.statusText));
        }
      });
  }

  darAlta() {
    this.$http.put(`http://localhost:8080/internar/alta/${this.vm.internmentLogId}`, {})
      .then(() => alert("Alta dada!"));
  }

  carregarAtivos() {
    this.$http.get('http://localhost:8080/internar/ativos')
      .then(res => this.vm.internacoesAtivas = res.data);
  }

  buscarHistorico(pagina: number = 0) {
    const id = this.vm.pacienteHistoricoId;
    const url = `http://localhost:8080/internar/historico/paciente/${id}?page=${pagina}&size=2`;

    this.$http.get<HistoricoResponse>(url)
      .then(res => {
        this.vm.historicoPaciente = res.data.content;
        this.vm.totalPages = res.data.totalPages;
        this.vm.paginaAtual = res.data.number;
      })
      .catch(err => {
        console.error(err);
        this.vm.historicoPaciente = [];
      });
  }

  listarEspecialidade() {
    this.$http.get('http://localhost:8080/internar/ativos/por-especialidade')
      .then(res => this.vm.porEspecialidade = res.data);
  }

  buscarHistoricoLeito() {
    this.$http.get(`http://localhost:8080/internar/historico/leito/${this.vm.codigoLeito}`)
      .then(res => this.vm.historicoLeito = res.data);
  }

}
