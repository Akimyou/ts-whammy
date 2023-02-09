import React, { useMemo, useState } from "react";
import tsWhammy from "../../src/libs/index";

// Test docs update
const imageSrcToWebpDataUrl = (
  src: string,
  options?: {
    width?: number;
    height?: number;
  }
) => {
  return new Promise<string>((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = options?.width || img.width;
      canvas.height = options?.height || img.height;
      ctx?.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
      const webp = canvas.toDataURL("image/webp");
      resolve(webp);
    };
    img.onerror = (error) => {
      reject(error);
    };
  });
};

const fileToDataUrl = (file: File) => {
  return new Promise<string>((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      resolve(fileReader.result as string);
    };
    fileReader.onerror = (error) => {
      reject(error);
    };
    fileReader.readAsDataURL(file);
  });
};

export const Demo1 = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [fpsRaw, setFpsRaw] = useState<string>("1");
  const fps = useMemo(() => {
    return parseInt(fpsRaw) ?? 0;
  }, [fpsRaw]);
  const [widthRaw, setWidthRaw] = useState<string>("300");
  const width = useMemo(() => {
    return parseInt(widthRaw) ?? 0;
  }, [widthRaw]);
  const [heightRaw, setHeightRaw] = useState<string>("300");
  const height = useMemo(() => {
    return parseInt(heightRaw) ?? 0;
  }, [heightRaw]);

  const [videoSrc, setVideoSrc] = useState<string | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const makeVideo = async () => {
    try {
      setLoading(true);
      setVideoSrc(undefined);
      const result: string[] = [];
      for (const item of files) {
        const dataUrl = await fileToDataUrl(item);
        const webpUrl = await imageSrcToWebpDataUrl(dataUrl, {
          width,
          height,
        });
        result.push(webpUrl);
      }
      const webm = await tsWhammy.fromImageArray(result, fps);
      setVideoSrc(URL.createObjectURL(webm as Blob));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ul>
        <li>
        Images:{" "}
          <input
            style={{ width: '50%' }}
            onChange={(event) => {
              setFiles(Array.from(event.target.files || []))
            }}
            type="file"
            multiple
            accept=".jpeg,.jpg,.png"
          ></input>
        </li>
        <li>
          FPS:{" "}
          <input
            value={fpsRaw}
            onChange={(event) => {
              setFpsRaw(event.target.value);
            }}
            onBlur={() => {
              if (fps <= 0) {
                setFpsRaw("0");
                return;
              }
              if (fps >= 60) {
                setFpsRaw("60");
                return;
              }
              setFpsRaw(`${fps}`);
            }}
            type={"number"}
          ></input>
        </li>
        <li>
          Width:{" "}
          <input
            value={widthRaw}
            onChange={(event) => {
              setWidthRaw(event.target.value);
            }}
            onBlur={() => {
              if (width <= 0) {
                setWidthRaw("0");
                return;
              }
              setWidthRaw(`${width}`);
            }}
            type={"number"}
          ></input>
        </li>
        <li>
          Height:{" "}
          <input
            value={heightRaw}
            onChange={(event) => {
              setHeightRaw(event.target.value);
            }}
            onBlur={() => {
              if (height <= 0) {
                setHeightRaw("0");
                return;
              }
              setHeightRaw(`${height}`);
            }}
            type={"number"}
          ></input>
        </li>
        <li><button disabled={!files.length} onClick={makeVideo}>Make Video</button></li>
      </ul>
      <p>
        {loading && <span style={{ marginRight: 8 }}>Loading...</span>}
        {videoSrc && <video controls autoPlay src={videoSrc}></video>}
      </p>
    </div>
  );
};

export default Demo1
