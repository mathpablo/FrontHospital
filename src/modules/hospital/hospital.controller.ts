export interface Hospital {
  id?: number;
  nome: string;
}

export class HospitalController {
  titulo = 'Cadastro de Hospitais';
  hospitais: Hospital[] = [];
  novoHospital: Hospital = { nome: '' };

  static $inject = ['$http'];

  constructor(private $http: angular.IHttpService) {
    this.listarHospitais();
  }

  listarHospitais(): void {
    this.$http.get<Hospital[]>('http://localhost:8080/hospitais/listar-hospitais')
      .then(response => {
        this.hospitais = response.data;
      })
      .catch(error => {
        console.error('Erro ao buscar hospitais:', error);
      });
  }

  cadastrarHospital(): void {
    this.$http.post('http://localhost:8080/hospitais/create', this.novoHospital)
      .then(() => {
        this.novoHospital = { nome: '' };
        this.listarHospitais();
      })
      .catch(error => {
        console.error('Erro ao cadastrar hospital:', error);
      });
  }
}
