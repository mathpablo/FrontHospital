function navigate(section) {
    console.log(section);
    switch (section.toLowerCase()) {
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
            console.log(123);
            window.location.href = 'patient.html';
            break;
        case 'quartos':
            window.location.href = 'quartos.html';
            break;
        default:
            alert('Seção não encontrada: ' + section);
    }
}
