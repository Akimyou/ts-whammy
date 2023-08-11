export interface ImageSrcToWebpDataUrlOptions {
  width?: number;
  height?: number;
  backgroundColor?: string;
}

export const imageSrcToWebpDataUrl = (
  src: string,
  options?: ImageSrcToWebpDataUrlOptions
) => {
  return new Promise<string>((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      canvas.width = options?.width || img.width;
      canvas.height = options?.height || img.height;
      ctx.fillStyle = options?.backgroundColor || '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx?.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
      const webp = canvas.toDataURL("image/webp");
      resolve(webp);
    };
    img.onerror = (error) => {
      reject(error);
    };
  });
};