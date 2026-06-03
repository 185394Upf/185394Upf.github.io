// É obrigatório o uso de um script externo para as seguintes funcionalidades:
// • Modo Noturno (Dark Mode): Implementar um botão que alterne as cores de
// fundo e de texto da página.
// • Validação de Formulário: Verificação simples dos campos no formulário de
// contato.
// • Acessibilidade: Botão que permita aumentar/diminuir o tamanho da fonte das
// páginas para facilitar a leitura.

// Fnção para tocar o som de erro ao clicar no botão de fechar
function errorSFX () {
    let button = document.querySelectorAll('.botao-exit');
    let audioPath = window.location.pathname.includes('/pages/') 
        ? '../assets/multimedia/audio/error.wav' 
        : 'assets/multimedia/audio/error.wav';
    let audio = new Audio(audioPath);
    button.forEach((btn) => {
        btn.onclick = () => {
            audio.currentTime = 0;
            audio.play();
        };
    });
}

// Função para tocar o som de reciclagem ao clicar no botão de download
function recycleSFX () {
    let button = document.querySelectorAll('.botao-download');
    let audioPath = window.location.pathname.includes('/pages/') 
        ? '../assets/multimedia/audio/recycle.wav' 
        : 'assets/multimedia/audio/recycle.wav';
    let audio = new Audio(audioPath);
    button.forEach((btn) => {
        btn.onclick = () => {
            audio.currentTime = 0;
            audio.play();
        };
    });
}

// Define o caminho do áudio de envio com base na localização do arquivo dentro das pastas
let audioPath = window.location.pathname.includes('/pages/')
    ? '../assets/multimedia/audio/send.wav' 
    : 'assets/multimedia/audio/send.wav';
let audioSend = new Audio(audioPath);

// Função para adicionar mensagens ao chat simulado + feedback sonoro do envio, tanto por clique, quanto por tecla "Enter"
function adicionarMensagem() {
    let input = document.getElementById('digitar-chat');
    let caixa = document.getElementById('caixa-chat');

    if (input.value.trim() !== "") {
        caixa.innerHTML += "<p><b>[Visitante2107]:</b> " + input.value + "</p>";
        input.value = "";
        caixa.scrollTop = caixa.scrollHeight;

        audioSend.currentTime = 0;
        audioSend.play();
    }
}

// Permite enviar a mensagem ao pressionar a tecla "Enter" dentro da textarea
let campoDigitarChat = document.getElementById('digitar-chat');

if (campoDigitarChat) {
    campoDigitarChat.addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault(); 
            adicionarMensagem(); 
        }
    });
}

// Permite enviar a mensagem ao clicar no botão de envio ao lado da textarea
let botaoEnviar = document.getElementById('enviar-chat');
if (botaoEnviar) {
    botaoEnviar.addEventListener('click', adicionarMensagem);
}

// Botão de troca de tema (modo claro/escuro) com persistência usando localStorage
let modoEscuro = localStorage.getItem('modoEscuro');
const trocarTema = document.getElementsByClassName('trocar-tema')[0];

const ativarModoEscuro = () => {
    document.body.classList.add('modoEscuro');
    localStorage.setItem('modoEscuro', 'active');
};

const desativarModoEscuro = () => {
    document.body.classList.remove('modoEscuro');
    localStorage.setItem('modoEscuro', null);
};

if (modoEscuro === 'active') ativarModoEscuro();

trocarTema.addEventListener('click', function() {
    modoEscuro = localStorage.getItem('modoEscuro');
    modoEscuro !== 'active' ? ativarModoEscuro() : desativarModoEscuro();
});

// Funcionalidade de aumento e diminuição de fonte
let tamanhoFonteAtual = parseInt(localStorage.getItem('tamanhoFonte')) || 100;
const incrementoFonte = 10;
const fonteMinima = 70;
const fonteMaxima = 140;
const elementoHtml = document.documentElement;

function aplicarTamanhoFonte(tamanho) {
    elementoHtml.style.fontSize = tamanho + '%';
    localStorage.setItem('tamanhoFonte', tamanho);
}

aplicarTamanhoFonte(tamanhoFonteAtual);
const botaoAumentar = document.getElementById('aumentarFonte');
const botaoDiminuir = document.getElementById('diminuirFonte');

if (botaoAumentar && botaoDiminuir) {

    botaoAumentar.addEventListener('click', function() {
        if (tamanhoFonteAtual < fonteMaxima) {
            tamanhoFonteAtual += incrementoFonte;
            aplicarTamanhoFonte(tamanhoFonteAtual);
        }
    });

    botaoDiminuir.addEventListener('click', function() {
        if (tamanhoFonteAtual > fonteMinima) {
            tamanhoFonteAtual -= incrementoFonte;
            aplicarTamanhoFonte(tamanhoFonteAtual);
        }
    });
}