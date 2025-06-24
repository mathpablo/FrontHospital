import { IHttpService, IWindowService } from 'angular';

interface AlaCreateDto {
  hospitalId: number;
  specialty: string;
  quantidadeQuartos: number;
  quantidadeLeitosPorQuartos: number;
}

export class AlaController {
  static $inject = ['$http', '$window'];

  hospitalId: number | null = null;
  specialty: string = '';
  quantidadeQuartos: number | null = null;
  quantidadeLeitosPorQuartos: number | null = null;
  idParaExcluir: number | null = null;

  constructor(private $http: IHttpService, private $window: IWindowService) {}

  criarAla(): void {
    if (this.hospitalId != null && this.specialty && this.quantidadeQuartos != null && this.quantidadeLeitosPorQuartos != null) {
      const novaAla: AlaCreateDto = {
        hospitalId: this.hospitalId,
        specialty: this.specialty,
        quantidadeQuartos: this.quantidadeQuartos,
        quantidadeLeitosPorQuartos: this.quantidadeLeitosPorQuartos
      };

      this.$http.post('http://localhost:8080/alas/create', novaAla)
        .then(() => {
          alert('Ala criada com sucesso!');
        })
        .catch(error => {
          console.error('Erro ao criar ala:', error);
        });
    } else {
      alert('Preencha todos os campos para criar uma ala.');
    }
  }

  excluirAla(): void {
    if (this.idParaExcluir != null) {
      this.$http.delete(`http://localhost:8080/alas/ala/${this.idParaExcluir}`)
        .then(() => {
          alert('Ala excluída com sucesso!');
        })
        .catch(error => {
          console.error('Erro ao excluir ala:', error);
        });
    } else {
      alert('Informe o ID da Ala para excluir.');
    }
  }

  voltar(): void {
    this.$window.location.href = '../../homepage.html';
  }
}
