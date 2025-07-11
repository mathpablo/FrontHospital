import { IHttpService, IWindowService, IHttpResponse } from 'angular';

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
  alas: any[] = []; 
  alaEditando: any = null; // usado para edição

  constructor(private $http: IHttpService, private $window: IWindowService) {
    this.listarAlas(); 
  }

  criarAla(): void {
    if (
      this.hospitalId != null &&
      this.specialty &&
      this.quantidadeQuartos != null &&
      this.quantidadeLeitosPorQuartos != null
    ) {
      const novaAla: AlaCreateDto = {
        hospitalId: this.hospitalId,
        specialty: this.specialty,
        quantidadeQuartos: this.quantidadeQuartos,
        quantidadeLeitosPorQuartos: this.quantidadeLeitosPorQuartos
      };

      this.$http.post('http://localhost:8080/alas/create', novaAla)
        .then(() => {
          alert('Ala criada com sucesso!');
          this.limparFormulario();
          this.listarAlas(); 
        })
        .catch((error: any) => {
          console.error('Erro ao criar ala:', error);
        });
    } else {
      alert('Preencha todos os campos para criar uma ala.');
    }
  }

  excluirAlaDireto(id: number): void {
    if (confirm('Deseja realmente excluir esta Ala?')) {
      this.$http.delete(`http://localhost:8080/alas/ala/${id}`)
        .then(() => {
          alert('Ala excluída com sucesso!');
          this.listarAlas(); 
        })
        .catch((error: any) => {
          console.error('Erro ao excluir ala:', error);
          if (error.status === 400) {
            alert(error.data);
          } else if (error.status === 404) {
            alert('Ala não encontrada.');
          } else {
            alert('Erro inesperado ao excluir ala.');
          }
        });
    }
  }

  listarAlas(): void {
    this.$http.get('http://localhost:8080/alas/listar-alas')
      .then((response: IHttpResponse<any>) => {
        this.alas = response.data;
      })
      .catch((error: any) => {
        console.error('Erro ao listar alas:', error);
        alert('Erro ao carregar alas.');
      });
  }

  abrirEdicaoAla(ala: any): void {
    this.alaEditando = { ...ala };
  }

salvarEdicao(): void {
  if (!this.alaEditando || !this.alaEditando.id) {
    alert('Nenhuma ala selecionada para edição.');
    return;
  }

  const dadosAtualizados = {
    quantidadeQuartos: this.alaEditando.quantidadeQuartos,
    quantidadeLeitosPorQuartos: this.alaEditando.quantidadeLeitosPorQuartos
  };

this.$http.put(`http://localhost:8080/alas/editar/${this.alaEditando.id}`, dadosAtualizados)
    .then(() => {
      alert('Ala atualizada com sucesso!');
      this.alaEditando = null;
      this.listarAlas();
    })
    .catch(error => {
      console.error('Erro ao editar ala:', error);
      alert('Erro ao salvar edição da ala.');
    });
}


  cancelarEdicao(): void {
    this.alaEditando = null;
  }

  limparFormulario(): void {
    this.hospitalId = null;
    this.specialty = '';
    this.quantidadeQuartos = null;
    this.quantidadeLeitosPorQuartos = null;
  }

  voltar(): void {
    this.$window.location.href = '../../homepage.html';
  }
}
