<?php
require('fpdf.php');
require('fpdi.php');

error_reporting(E_ALL);
ini_set('display_errors', 1);

if (!isset($_POST["pdf"]) || !isset($_POST["firma"])) {
    echo json_encode(["error" => "No se recibió PDF o firma"]);
    exit;
}

$pdfOriginal = $_POST["pdf"];
$firmaBase64 = $_POST["firma"];

// Decodificar la imagen de la firma
$firmaImagen = base64_decode(preg_replace('#^data:image/\w+;base64,#i', '', $firmaBase64));

// Guardar la firma como archivo temporal
$firmaPath = "firmas/firma_temp.png";
file_put_contents($firmaPath, $firmaImagen);

// Crear nuevo PDF con FPDI
$pdf = new FPDI();
$pdf->setSourceFile($pdfOriginal);
$template = $pdf->importPage(1);
$pdf->AddPage();
$pdf->useTemplate($template, 0, 0, 210);

// Insertar la firma en el PDF (coordenadas X, Y y tamaño ajustable)
$pdf->Image($firmaPath, 100, 250, 50, 20);

// Guardar el nuevo PDF firmado
$nuevoPdfPath = "firmados/contrato_firmado.pdf";
$pdf->Output($nuevoPdfPath, "F");

// Devolver la nueva ruta del PDF firmado
echo json_encode(["success" => true, "nuevo_pdf" => $nuevoPdfPath]);
?>
