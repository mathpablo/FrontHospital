import * as angular from 'angular';
import { IHttpService, IWindowService } from 'angular';

interface QuantidadeLeitoLivreDto {
  specialty: string;
  quantidade: number;
}

export class LeitoController {
  static $inject = ['$http', '$window'];

  quantidades: QuantidadeLeitoLivreDto[] = [];

  leitoId: number | null = null;
  novoStatus: string = '';
  idParaExcluir: number | null = null;

  constructor(private $http: IHttpService, private $window: IWindowService) {
    this.listarQuantidades();
  }

  listarQuantidades(): void {
    this.$http.get('http://localhost:8080/leitos/quantidades-livres')
      .then((response) => {
        this.quantidades = response.data as QuantidadeLeitoLivreDto[];
      })
      .catch((error) => {
        console.error('Erro ao buscar quantidades de leitos livres:', error);
      });
  }

atualizarStatus(): void {
  if (this.leitoId != null && this.novoStatus) {
this.$http.put(`http://localhost:8080/leitos/leito/${this.leitoId}/status?status=${this.novoStatus}`, null)
      .then(() => {
        alert('Status atualizado com sucesso!');
        this.listarQuantidades(); 
      })
      .catch(error => {
        console.error('Erro ao atualizar status:', error);
        alert('Erro ao atualizar status: ' + JSON.stringify(error.data));
      });
  } else {
    alert('Preencha o ID do leito e o novo status.');
  }
}


  excluirLeito(): void {
  if (this.idParaExcluir != null) {
    this.$http.delete(`http://localhost:8080/leitos/${this.idParaExcluir}`)
      .then(() => {
        alert('Leito excluído com sucesso!');
        this.listarQuantidades();
      })
      .catch(error => {
        console.error('Erro ao excluir leito:', error);
      });
  } else {
    alert('Informe o ID do leito a excluir.');
  }
}


  voltar(): void {
    this.$window.location.href = '../../homepage.html'; 
  }
}
