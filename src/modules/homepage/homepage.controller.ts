
export class HomePageController {
  message: string;

  constructor() {
    this.message = "Bem vindo ao Hospital Vida e Saúde";
  }

  navigate(destino: string): void {
    console.log(`Navegando para: ${destino}`);

    switch (destino.toLowerCase()) {
      case 'alas':
        window.location.href = 'ala.html';
        break;
      case 'internações':
        window.location.href = 'internacoes.html';
        break;
      case 'leitos':
        window.location.href = 'leitos.html';
        break;
      case 'paciente':
       window.location.href = '/src/modules/patient/patient.html';
        break;
      case 'quartos':
        window.location.href = '/src/modules/quarto/quarto.html';
        break;
      case 'hospitais':
        window.location.href = '/src/modules/hospital/hospital.html';
        break;
      default:
        alert('Seção não encontrada: ' + destino);
    }
  }
}
