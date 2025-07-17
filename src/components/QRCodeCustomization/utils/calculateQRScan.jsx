
// utils/calculateQRScan.js logoPosition 

import { qrOffsets } from "../designTabs/qrShapes/QROffsets";

export const calculateQRScan = ({ fullSize, moduleSize, canvasSize, selectedQRShape,logoPosition  }) => {
  const qrWidth = fullSize * moduleSize;
  const shapeOffset = qrOffsets[selectedQRShape] || { x: 0, y: 0, scale: 0.2 };
  const maxWidth = canvasSize * (shapeOffset.scale || 1);
  const fitScale = maxWidth / qrWidth;
  const qrScale = Math.min(fitScale, shapeOffset.scale || 1);

  const finalQRWidth = fullSize * moduleSize * qrScale;
  const finalQRHeight = fullSize * moduleSize * qrScale;

  const qrX = (canvasSize - finalQRWidth) / 2 + shapeOffset.x;
  const qrY = (canvasSize - finalQRHeight) / 2 + shapeOffset.y;

  const qrCenterX = qrX + finalQRWidth / 2 + logoPosition.x;
  const qrCenterY = qrY + finalQRHeight / 2 + logoPosition.y;

  return {
    qrScale,
    qrX,
    qrY,
    qrWidth: finalQRWidth,
    qrHeight: finalQRHeight,
    qrCenterX,
    qrCenterY,
  };
};
