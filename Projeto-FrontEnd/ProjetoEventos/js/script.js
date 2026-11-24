document.addEventListener("DOMContentLoaded", function () {
    const etapas = Array.from(document.querySelectorAll(".etapa"));
    const passos = Array.from(document.querySelectorAll(".passo"));
    const btnAnterior = document.getElementById("anterior");
    const btnProximo = document.getElementById("proximo");
    const contador = document.getElementById("contador");
    let atual = 0;

    function mostrar(indice) {
        atual = Math.max(0, Math.min(indice, etapas.length - 1));

        etapas.forEach(function (etapa, i) {
            etapa.hidden = i !== atual;
        });

        passos.forEach(function (passo, i) {
            if (i === atual) {
                passo.setAttribute("aria-current", "step");
            } else {
                passo.removeAttribute("aria-current");
            }
            passo.classList.toggle("feito", i < atual);
        });

        contador.textContent = "Etapa " + (atual + 1) + " de " + etapas.length;
        btnAnterior.disabled = atual === 0;
        btnProximo.disabled = atual === etapas.length - 1;
    }

    btnAnterior.addEventListener("click", function () { mostrar(atual - 1); });
    btnProximo.addEventListener("click", function () { mostrar(atual + 1); });

    passos.forEach(function (passo) {
        passo.addEventListener("click", function () {
            mostrar(Number(passo.dataset.indice));
        });
    });

    document.addEventListener("keydown", function (e) {
        if (e.key === "ArrowRight") mostrar(atual + 1);
        if (e.key === "ArrowLeft") mostrar(atual - 1);
    });

    mostrar(0);
});
