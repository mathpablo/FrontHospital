export class HomePageController {
  message: string;

  constructor() {
    this.message = "Bem vindo ao Hospital Vida e Saúde";
  }

  navigate(destino: string) {
    console.log(`Navegando para: ${destino}`);
  }
}
