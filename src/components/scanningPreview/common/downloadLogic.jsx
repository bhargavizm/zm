// common/downloadLogic.js
export const downloadFiles = async (files = []) => {
  if (!files || files.length === 0) return;

  for (const file of files) {
    try {
      let blob;

      if (file.url.startsWith("http")) {
        // fetch remote image/video
        const response = await fetch(file.url, { mode: "cors" });
        blob = await response.blob();
      } else {
        // local File object
        blob = file instanceof File ? file : await fetch(file.url).then(r => r.blob());
      }

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = file.name || "file";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // release memory
      URL.revokeObjectURL(link.href);
    } catch (err) {
      console.error("Download failed", err);
    }
  }
};
