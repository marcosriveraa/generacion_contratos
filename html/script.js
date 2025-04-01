$(document).ready(function () {
    $('#calendario').datepicker({
        format: 'dd/mm/yyyy',
        autoclose: true,
        todayHighlight: true,
        language: 'es'
    });
});

let btn = document.getElementById('generarcontrato');
let inputfcontrato = document.getElementById('calendario');
let inputdenominacion = document.getElementById('denominacion');
let inputdomicilio = document.getElementById('domicilio');
let inputidentificacion = document.getElementById('dni');
let inputnombre = document.getElementById('nombre');
let inputlugarnot = document.getElementById('lugarnot');
let inputnotario = document.getElementById('notario');
let inputnumprotocolo = document.getElementById('numprotocolo');
let formulario = document.getElementById('formulario');
let resultadoform = document.getElementById('formulariorespuesta');

const { jsPDF } = window.jspdf;
async function generarPDF(event) {
    event.preventDefault(); // Prevenir la recarga de página al enviar el formulario
    console.log("Generando PDF...");
    const doc = new jsPDF({
        margin: { top: 20, left: 15, bottom: 20, right: 15 }
    });

    let fcontrato = inputfcontrato.value;
    let denominacion = inputdenominacion.value;
    let domicilio = inputdomicilio.value;
    let identificacion = inputidentificacion.value;
    let nombre = inputnombre.value;
    let lugarnot = inputlugarnot.value;
    let notario = inputnotario.value;
    let numprotocolo = inputnumprotocolo.value;


    // Validaciones: verificar si algún campo está vacío
    if (!fcontrato || !denominacion || !domicilio || !identificacion || !nombre || !lugarnot || !notario || !numprotocolo) {
        mostrarAlerta("warning", "Por favor, rellene todos los campos."); // Muestra alerta de advertencia
        return; // Detener la ejecución de la función si algún campo está vacío
    }

    const logotipoatalaya = "atalaya.jpg";

    // Función para generar el encabezado automáticamente en cada página
    function agregarEncabezado() {
        doc.addImage(logotipoatalaya, 'JPG', 15, 10, 45, 20);
        doc.setLineWidth(0.5);
        doc.line(15, 35, doc.internal.pageSize.width - 15, 35);
    }

    // Agregar encabezado a la primera página
    agregarEncabezado();

    // Configurar el encabezado en cada nueva página
    doc.setHeaderFunction(() => {
        agregarEncabezado();
    });

    const titulo = "CONTRATO MARCO PARA LA PRESTACIÓN DE SERVICIOS DENTRO DEL PROYECTO MINERO RIOTINTO Nº";
    const marginLeft = 15; // margen izquierdo
    const marginRight = 15; // margen derecho
    const pageWidth = doc.internal.pageSize.width;
    const availableWidth = pageWidth - marginLeft - marginRight; // Ancho disponible en la página

    // Calcular el ancho del título y ajustarlo si es necesario
    let fontSize = 16; // Tamaño de fuente inicial
    let titleWidth = doc.getTextWidth(titulo);

    // Si el título es más ancho que el espacio disponible, ajustamos el tamaño de la fuente
    if (titleWidth > availableWidth) {
        fontSize = Math.floor(fontSize * (availableWidth / titleWidth)); // Ajustamos el tamaño de la fuente
    }

    doc.setFontSize(fontSize); // Establecer el tamaño de la fuente
    doc.setFont('helvetica', 'bold'); // Fuente en negrita para el título

    // Calcular el ancho del título y la posición X para centrarlo
    const anchotitulo = doc.getTextWidth(titulo);
    const tituloX = (pageWidth - anchotitulo) / 2;

    // Ajustar la posición Y del título para que esté debajo de la línea con un poco más de separación
    const tituloY = 45;

    // Escribir el título debajo de la línea
    doc.text(titulo, tituloX, tituloY); // Centrado del texto


    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    const fechaTexto = 'En minas De Riotinto, a ' + inputfcontrato.value;
    const fechaAncho = doc.getTextWidth(fechaTexto);
    const fechaX = pageWidth - 45 - fechaAncho; // Alinear a la derecha


    doc.text(fechaTexto, fechaX, 55);


    const textoDebajoFecha = "R E U N I D O S";


    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');


    const anchoTextoDebajoFecha = doc.getTextWidth(textoDebajoFecha);
    const textoDebajoFechaX = (pageWidth - anchoTextoDebajoFecha) / 2;


    const textoDebajoFechaY = 70;


    doc.text(textoDebajoFecha, textoDebajoFechaX, textoDebajoFechaY);

    const texto1 = "De una parte, ATALAYA RIOTINTO MINERA, S.L.U. (identificada en adelante como “ATALAYA”), domiciliada a los efectos de este contrato en La Dehesa S/N, 21660, Minas de Riotinto, Huelva.";


    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');


    const maxLineWidth = pageWidth - marginLeft - marginRight;
    const lineHeight = 6;


    const lines = doc.splitTextToSize(texto1, maxLineWidth);


    const texto1Y = 85;
    doc.text(lines, marginLeft, texto1Y);

    const texto2 = `Y de otra parte, ${denominacion} (en adelante, el “CONTRATISTA”), domiciliada en ${domicilio} con CIF: ${identificacion}, representada en este acto por ${nombre}, con facultades bastantes para suscribir este contrato conforme al notario de ${lugarnot} D. ${notario} en ${fcontrato} bajo el ${numprotocolo} de su protocolo.`;

    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');

    const lines2 = doc.splitTextToSize(texto2, maxLineWidth);

    const texto2Y = texto1Y + (lines.length * lineHeight) + 5;
    doc.text(lines2, marginLeft, texto2Y);

    const texto3 = "Ambos se reconocen mutuamente la capacidad necesaria y facultades de representación suficientes para celebrar este contrato y, en su virtud,";

    const lines3 = doc.splitTextToSize(texto3, maxLineWidth);

    const texto3Y = texto2Y + (lines2.length * lineHeight) + 3;

    doc.text(lines3, marginLeft, texto3Y);

    const textoDebajoFecha2 = "E X P O N E N ";


    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    const anchoTextoDebajoFecha2 = doc.getTextWidth(textoDebajoFecha2);
    const textoDebajoFecha2X = (pageWidth - anchoTextoDebajoFecha2) / 2;


    const textoDebajoFecha2Y = texto3Y + (lines3.length * lineHeight) + 5;


    doc.text(textoDebajoFecha2, textoDebajoFecha2X, textoDebajoFecha2Y);


    const textoDebajoExponen = "I.- ATALAYA es desde el año 2007 la empresa titular de los terrenos, concesiones e instalaciones mineras del Proyecto Minero de Riotinto (“PRT” en adelante) sito en los términos Municipales de Minas de Riotinto, Nerva y El Campillo (Huelva).";


    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');

    const linesDebajoExponen = doc.splitTextToSize(textoDebajoExponen, maxLineWidth);

    const textoDebajoExponenY = textoDebajoFecha2Y + (lines3.length * lineHeight) + 5;

    doc.text(linesDebajoExponen, marginLeft, textoDebajoExponenY);

    const textoDebajoUltimo = "Las Partes, con expresa renuncia a cualquier otro fuero que pudiera corresponderles, someten cuantas discrepancias puedan surgir en la interpretación y desarrollo de este contrato a la jurisdicción de los Juzgados y Tribunales de Huelva.";

    const linesDebajoUltimo = doc.splitTextToSize(textoDebajoUltimo, maxLineWidth);

    const textoDebajoUltimoY = textoDebajoExponenY + (linesDebajoExponen.length * lineHeight) + 5;

    doc.text(linesDebajoUltimo, marginLeft, textoDebajoUltimoY);

    const textoDebajoUltimo2 = "Y en prueba de conformidad con cuanto antecede, las Partes, en la representación que ostentan, firman el presente documento, en el lugar y fecha al comienzo indicados.";

    const linesDebajoUltimo2 = doc.splitTextToSize(textoDebajoUltimo2, maxLineWidth);

    const textoDebajoUltimo2Y = textoDebajoUltimoY + (linesDebajoUltimo.length * lineHeight) + 5;

    doc.text(linesDebajoUltimo2, marginLeft, textoDebajoUltimo2Y);


    const textoDebajoUltimo3 = "REVISADO DPTO. DE COMPRAS";

    const linesDebajoUltimo3 = doc.splitTextToSize(textoDebajoUltimo3, maxLineWidth);

    const textoDebajoUltimo3Y = textoDebajoUltimo2Y + (linesDebajoUltimo2.length * lineHeight) + 5;

    doc.text(linesDebajoUltimo3, marginLeft, textoDebajoUltimo3Y);

    const textoDebajoUltimo4 = `ATALAYA RIOTINTO MINERA, S.L.U. 	${denominacion}`;

    const linesDebajoUltimo4 = doc.splitTextToSize(textoDebajoUltimo4, maxLineWidth);

    const textoDebajoUltimo4Y = textoDebajoUltimo3Y + (linesDebajoUltimo3.length * lineHeight) + 5;


    doc.text(linesDebajoUltimo4, marginLeft, textoDebajoUltimo4Y);

    const textoDebajoUltimo5 = `P.P. Atalaya     P.P.D. ${nombre}`;

    const linesDebajoUltimo5 = doc.splitTextToSize(textoDebajoUltimo5, maxLineWidth);

    const textoDebajoUltimo5Y = textoDebajoUltimo4Y + (linesDebajoUltimo4.length * lineHeight) + 5;

    doc.setFont('helvetica', 'bold');

    doc.text(linesDebajoUltimo5, marginLeft, textoDebajoUltimo5Y);

    const apartadoFirmaY = textoDebajoUltimo5Y + (linesDebajoUltimo5.length * lineHeight) + 15; // Ajusta el margen de separación
    // Título para el apartado de firma
    doc.setFont('helvetica', 'normal');
    doc.text('Firma:', marginLeft, apartadoFirmaY);


    const lineaFirmaY = apartadoFirmaY + 10;
    doc.line(marginLeft, lineaFirmaY, marginLeft + 80, lineaFirmaY);

    doc.text('Firma del autorizador', marginLeft + 110, lineaFirmaY + 5);
    doc.addPage(); // Añadir una nueva página
    agregarEncabezado(); // Agregar encabezado a la nueva página
    doc.addPage(); // Añadir una nueva página
    agregarEncabezado(); // Agregar encabezado a la nueva página
    doc.addPage(); // Añadir una nueva página
    agregarEncabezado(); // Agregar encabezado a la nueva página
    const pdfBlob = doc.output("blob");

console.log("pdfBlob:", pdfBlob);


// Crear un objeto FormData para enviar el archivo al servidor
const formData = new FormData();
formData.append("archivo", pdfBlob, "contrato.pdf");  // Usamos un nombre genérico "contrato.pdf"

// Incluir otros datos si es necesario
formData.append("denominacion", inputdenominacion.value);

// Enviar el FormData al servidor usando fetch
console.log("Enviando archivo al servidor...");

try {
    const response = await fetch('guardar_pendientes_firma.php', {
        method: 'POST',
        body: formData
    });

    console.log("Respuesta del servidor recibida.");
    const data = await response.json(); // <--- Aquí definimos data
    try {
        if (data.error) {
            mostrarAlerta("warning", data.error);
        } else {
            mostrarAlerta("success", data.mensaje);
            window.location.href = data.redirect;
        }
    } catch (jsonError) {
        console.error("Error al parsear la respuesta JSON:", jsonError);
        mostrarAlerta("warning", "Error en la respuesta del servidor.");
    }

} catch (error) {
    mostrarAlerta("warning", "Hubo un problema al subir el archivo.");
}
}




    // Función para mostrar alertas específicas (éxito o advertencia)
    function mostrarAlerta(tipo, mensaje) {
        const alertaSuccess = document.querySelector('.alert-success');
        const alertaWarning = document.querySelector('.alert-warning');

        if (tipo === "success") {
            alertaSuccess.querySelector('.alert-text').textContent = mensaje;
            alertaSuccess.style.display = 'block';
            ocultarAlerta(alertaSuccess);
        } else if (tipo === "warning") {
            alertaWarning.querySelector('.alert-text').textContent = mensaje;
            alertaWarning.style.display = 'block';
            ocultarAlerta(alertaWarning);
        }
    }

    // Función para ocultar la alerta después de unos segundos
    function ocultarAlerta(alerta) {
        setTimeout(() => {
            alerta.style.transition = 'opacity 1s';
            alerta.style.opacity = '0';

            setTimeout(() => {
                alerta.style.display = 'none';
                alerta.style.opacity = '1'; // Reset de opacidad para el futuro
            }, 1000);
        }, 3000);
    }


    formulario.addEventListener('submit', generarPDF);


