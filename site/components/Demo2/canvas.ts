interface Position {
  x: number;
  y: number;
}

export const drawCanvas = () => {
  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext("2d")!;

  let isDrawing = false;
  let lastPos: Position = { x: 0, y: 0 };

  canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    lastPos = getMousePosition(canvas, e);
  });

  canvas.addEventListener("mousemove", (e) => {
    if (!isDrawing) return;

    const currentPos = getMousePosition(canvas, e);

    ctx.beginPath();
    ctx.moveTo(lastPos.x, lastPos.y);
    ctx.lineTo(currentPos.x, currentPos.y);
    ctx.stroke();

    lastPos = currentPos;
  });

  canvas.addEventListener("mouseup", () => {
    isDrawing = false;
  });

  canvas.addEventListener("mouseout", () => {
    isDrawing = false;
  });

  function getMousePosition(
    canvas: HTMLCanvasElement,
    event: MouseEvent
  ): Position {
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }
};

let recordCanvasResult: string[] = [];
let recordCanvasTimer: any = null;
export const recordCanvas = (fps: number) => {
  recordCanvasResult = [];

  const canvas = document.getElementById('canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext("2d")!;

  const captureFrame = () => {
    console.log('Recording')
    const dataUrl = canvas.toDataURL("image/webp");
    recordCanvasResult.push(dataUrl);

    recordCanvasTimer = setTimeout(captureFrame, 1000/fps);
  };

  captureFrame();
};

export const stopRecordCanvas = () => {
  console.log('Recorded', recordCanvasResult);
  clearInterval(recordCanvasTimer);
  return recordCanvasResult;
};
