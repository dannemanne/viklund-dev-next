import { TargetPainter } from "snoken";

let image: HTMLImageElement | undefined;
export const targetPainterEarnAlliance: TargetPainter = (
  ctx,
  { boardSize, target },
) => {
  const [boardW, boardH] = boardSize;
  const [targetX, targetY] = target;

  const { width, height } = ctx.canvas;
  const segWidth = width / boardW;
  const segHeight = height / boardH;

  if (!image) {
    image = new Image();
    image.src = "/images/earn_alliance.svg";
  }

  ctx.fillStyle = "#0F0A2F";
  ctx.beginPath();
  ctx.roundRect(
    targetX * segWidth + segWidth * 0.1,
    targetY * segHeight + segWidth * 0.1,
    segWidth * 0.8,
    segHeight * 0.8,
    4
  );
  ctx.fill();

  ctx.drawImage(image, 
    targetX * segWidth + segWidth * 0.2,
    targetY * segHeight + segWidth * 0.2,
    segWidth * 0.8,
    segHeight * 0.8
  );
};

export const maskMiddleText = (text?: string | null, length = 4) => {
  try {
    if (!text) return ''
    return `${text.substring(0, length)}...${text.substring(text.length - length)}`;
  } catch {
    return '';
  }
};
