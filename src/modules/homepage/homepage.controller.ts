
export class HomePageController {
  message: string;

  constructor() {
    this.message = "Bem vindo ao Hospital Vida e Saúde";
  }

  navigate(destino: string): void {
    console.log(`Navegando para: ${destino}`);

    switch (destino.toLowerCase()) {
      case 'ala':
        window.location.href = '/src/modules/ala/ala.html';
        break;
      case 'internações':
        window.location.href = '/src/modules/internmentLog/internment.html';
        break;
      case 'leito':
        window.location.href = '/src/modules/leito/leito.html';
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
