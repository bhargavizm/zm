import { toPng } from "html-to-image";

export const generateImageFromRef = async (ref, options = {}) => {
  if (!ref?.current) throw new Error("Ref is missing");

  const exportWidth = 1024;
  const exportHeight = Math.round(
    (ref.current.offsetHeight / ref.current.offsetWidth) * exportWidth
  );

  const dataUrl = await toPng(ref.current, {
    cacheBust: true,
    backgroundColor: "white",
    width: exportWidth,
    height: exportHeight,
    style: {
      transform: `scale(${exportWidth / ref.current.offsetWidth})`,
      transformOrigin: "top left",
      width: `${ref.current.offsetWidth}px`,
      height: `${ref.current.offsetHeight}px`,
    },
    ...options,
  });

  return dataUrl;
};



export const downloadImage = (dataUrl, serviceName) => {
  const link = document.createElement("a");
  link.download = `${serviceName.replace(/\s+/g, "_")}_qr-code.png`;
  link.href = dataUrl;
  link.click();
};

