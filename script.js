const API_KEY = "df4385c2-33de-e423-4134-ca1f7b3ea8b7";
const URL_API = "https://api.deepl.com/v2/translate";

function traducirTexto(textoOrigen, idiomaOrigen, idiomaDestino) {
    const data = {
        text: textoOrigen,
        target_lang: idiomaDestino,
        source_lang: idiomaOrigen,
        api_key: API_KEY,
    };

    return $.ajax({
        url: URL_API,
        method: "POST",
        data: data,
    });
}

function mostrarTraduccion(traduccion) {
    $("#texto-traducido").text(traduccion);
}

function obtenerIdiomas() {
    return $.ajax({
        url: "https://api.deepl.com/v2/languages",
        method: "GET",
    });
}

function cargarIdiomas(idiomas) {
    for (const idioma of idiomas) {
        $("#idioma-origen").append(`<option value="${idioma.code}">${idioma.name}</option>`);
        $("#idioma-destino").append(`<option value="${idioma.code}">${idioma.name}</option>`);
    }
}

$(document).ready(function() {
    obtenerIdiomas().then(cargarIdiomas);

    $("#btn-traducir").click(function() {
        const textoOrigen = $("#texto-origen").val();
        const idiomaOrigen = $("#idioma-origen").val();
        const idiomaDestino = $("#idioma-destino").val();

        traducirTexto(textoOrigen, idiomaOrigen, idiomaDestino).then(mostrarTraduccion);
    });
});
