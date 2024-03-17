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
  ctx.drawImage(image, 
    targetX * segWidth + segWidth / 8,
    targetY * segHeight + segWidth / 8,
    segWidth,
    segHeight
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