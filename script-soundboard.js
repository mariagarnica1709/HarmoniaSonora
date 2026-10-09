const botoesMusica = document.querySelectorAll(".musica");
const audio = document.querySelector("#audio-musica");

const imagemDestaque = document.querySelector("#imagem-destaque");
const nomeMusica = document.querySelector("#nome-musica");
const artistaMusica = document.querySelector("#artista-musica");
const statusMusica = document.querySelector("#status-musica");
const mensagemErro = document.querySelector("#mensagem-erro");

audio.addEventListener("ended", () => {
    statusMusica.textContent = "Música finalizada.";
    atualizarBotaoAtivo(null);
});

audio.addEventListener("error", () => {
    mensagemErro.textContent =
        "Não foi possível carregar o áudio. Confira o arquivo.";
    statusMusica.textContent = "Erro ao carregar a música.";
    atualizarBotaoAtivo(null);
});

function atualizarBotaoAtivo(botaoAtual) {
    botoesMusica.forEach((botao) => {
        botao.classList.remove("selecionada");

        const icone = botao.querySelector(".icone-som");

        if (icone) {
            icone.textContent = "▶";
        }
    });

    if (botaoAtual) {
        botaoAtual.classList.add("selecionada");

        const icone = botaoAtual.querySelector(".icone-som");

        if (icone) {
            icone.textContent = "♫";
        }
    }
}

botoesMusica.forEach((botao) => {
    botao.addEventListener("click", async () => {

        audio.pause();
        audio.currentTime = 0;
        mensagemErro.textContent = "";

        const titulo = botao.dataset.titulo;
        const artista = botao.dataset.artista;
        const caminhoAudio = botao.dataset.audio;
        const caminhoImagem = botao.dataset.imagem;

        nomeMusica.textContent = titulo;
        artistaMusica.textContent = artista;


        imagemDestaque.src = caminhoImagem;
        imagemDestaque.alt = "Capa da música " + titulo;

        statusMusica.textContent = "Preparando reprodução...";
        atualizarBotaoAtivo(botao);

        audio.src = caminhoAudio;
        audio.load();

        try {
            await audio.play();

            statusMusica.textContent = "Tocando agora ♫";

        } catch (erro) {
            statusMusica.textContent =
                "Não foi possível reproduzir esta música.";

            mensagemErro.textContent =
                "Verifique se o arquivo de áudio existe e está no formato correto.";

            atualizarBotaoAtivo(null);
        }
    });
});

imagemDestaque.addEventListener("error", () => {
    imagemDestaque.alt = "Imagem da música indisponível";
});