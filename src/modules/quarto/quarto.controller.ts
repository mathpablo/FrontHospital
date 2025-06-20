import * as angular from 'angular';

export class QuartoController {
  static $inject = ['$http'];

  quartosDisponiveis: any[];

  constructor(private $http: angular.IHttpService) {
    this.quartosDisponiveis = [];
    this.buscarQuartosDisponiveis();
  }

  buscarQuartosDisponiveis(): void {
    this.$http.get('http://localhost:8080/rooms/disponiveis')
      .then((response) => {
        // this.quartosDisponiveis = response.data;
      })
      .catch((error) => {
        console.error('Erro ao buscar quartos:', error);
      });
  }

  excluirQuarto(id: number): void {
    this.$http.delete(`http://localhost:8080/rooms/${id}`)
      .then(() => {
        console.log('Quarto excluído');
        this.buscarQuartosDisponiveis();
      })
      .catch((error) => {
        console.error('Erro ao excluir quarto:', error);
      });
  }
}
