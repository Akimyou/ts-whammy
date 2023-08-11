import React, { useEffect, useMemo, useState } from "react";
import tsWhammy from "../../../src/libs/index";
import { drawCanvas, recordCanvas, stopRecordCanvas } from './canvas';

export const Demo2Cp = () => {
  const [recording, setRecording] = useState<boolean>(false);
  const [recordImages, setRecordImages] = useState<string[]>([]);
  const [fpsRaw, setFpsRaw] = useState<string>("10");
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
      const fianal = await tsWhammy.fixImageDataList(recordImages, {
        width,
        height,
        backgroundColor: "#FFF",
      });
      const webm = await tsWhammy.fromImageArray(fianal, fps);
      setVideoSrc(URL.createObjectURL(webm as Blob));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    drawCanvas()
  }, []);

  return (
    <div>
      <canvas
        id="canvas"
        width={300}
        height={300}
        style={{ border: "1px solid black", cursor: "crosshair" }}
      ></canvas>
      <ul>
        <li>
          <button disabled={recording} onClick={() => {
            setRecording(true)
            recordCanvas(fps)
          }}>Start Record</button>
          <button disabled={!recording} onClick={() => {
            setRecordImages(stopRecordCanvas())
            setRecording(false)
          }} style={{ marginLeft: 8 }}>Stop Record</button>
          <span style={{ marginLeft: 8 }}>{recording ? 'Recording' : ''}</span>
          <span style={{ marginLeft: 8 }}>RecordImages: {recordImages.length}</span>
        </li>
      </ul>
      <ul>
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
        <li>
          <button disabled={!recordImages.length} onClick={makeVideo}>Make Video</button>
        </li>
      </ul>
      <p>
        {loading && <span style={{ marginRight: 8 }}>Loading...</span>}
        {videoSrc && <video controls autoPlay src={videoSrc}></video>}
      </p>
    </div>
  );
};
