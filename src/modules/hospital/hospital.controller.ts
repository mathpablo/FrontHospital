export interface Hospital {
  id?: number;
name: string;
}

export class HospitalController {
  titulo = 'Cadastro de Hospitais';
  hospitais: Hospital[] = [];
  novoHospital: Hospital = { name: '' };

  static $inject = ['$http'];

  constructor(private $http: angular.IHttpService) {    
    this.listarHospitais();
  }

  listarHospitais(): void {
    this.$http.get<Hospital[]>('http://localhost:8080/hospitais/listar-hospitais')
      .then((response) => {
        this.hospitais = response.data;
        
      })
      .catch(error => {
        console.error('Erro ao buscar hospitais:', error);
      });
  }

  adicionarHospital(): void {
    console.log(this.novoHospital)
    this.$http.post('http://localhost:8080/hospitais/create', this.novoHospital)
      .then(() => {
        this.novoHospital = { name: '' };
        this.listarHospitais();
      })
      .catch(error => {
        console.error('Erro ao cadastrar hospital:', error);
      });
  }


  deletarHospital(id: number): void {
    if (confirm('Tem certeza que deseja excluir este hospital?')) {
      this.$http.delete(`http://localhost:8080/hospitais/delete/${id}`)
        .then(response => {
          alert('Hospital excluido com sucesso');
          this.listarHospitais();
        })
        .catch(error => {
          console.error('Erro ao deletar hospital:', error);
        });
    }
  }

}

