// utils/qrMatrixUtils.js
import QRCode from "qrcode-generator";

/**
 * Generates a matrix (2D array) for the given text QR content.
 */
export const generateQRMatrix = (text, typeNumber = 0, errorCorrectionLevel = "H") => {
  const qr = QRCode(typeNumber, errorCorrectionLevel);
  qr.addData(text);
  qr.make();
  const size = qr.getModuleCount();
  const matrix = [];
  for (let row = 0; row < size; row++) {
    const rowData = [];
    for (let col = 0; col < size; col++) {
      rowData.push(qr.isDark(row, col) ? 1 : 0);
    }
    matrix.push(rowData);
  }
  return matrix;
};

/**
 * Checks if a specific row,col belongs to one of the 3 QR eyes.
 */
export const isEye = (row, col, padding, qrSize) => {
  const eyeSize = 7;
  const positions = [
    [0, 0],
    [0, qrSize - eyeSize],
    [qrSize - eyeSize, 0],
  ];
  return positions.some(
    ([ey, ex]) =>
      row >= padding + ey &&
      row < padding + ey + eyeSize &&
      col >= padding + ex &&
      col < padding + ex + eyeSize
  );
};

/**
 * Checks if a row,col lies within the QR grid bounds (inside padding).
 */
export const isInQRBounds = (row, col, padding, qrSize) => {
  return (
    row >= padding &&
    col >= padding &&
    row < padding + qrSize &&
    col < padding + qrSize
  );
};
