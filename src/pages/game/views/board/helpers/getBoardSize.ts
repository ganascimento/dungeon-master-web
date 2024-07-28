export const GetBoardSize = () => {
  const maxWidth = 1200;
  const maxHeight = 780;
  const reasonWidth = 1200 / 780;
  const reasonHeight = 780 / 1200;
  const defaulfSize = 30;

  let { innerWidth, innerHeight } = window;
  innerWidth -= 400;

  if (innerWidth > maxWidth && innerHeight > maxHeight)
    return [maxWidth, maxHeight, defaulfSize];
  if (innerWidth < maxWidth) {
    for (let i = defaulfSize; i < maxWidth; i += defaulfSize) {
      if (maxWidth - i < innerWidth) {
        innerWidth = maxWidth - i;
        break;
      }
    }
  }
  if (innerHeight < maxHeight) {
    for (let i = defaulfSize; i < maxHeight; i += defaulfSize) {
      if (maxHeight - i < innerHeight) {
        innerHeight = maxHeight - i;
        break;
      }
    }
  }

  if (innerWidth < maxWidth) innerHeight = innerWidth * reasonHeight;
  if (innerHeight < maxHeight) innerWidth = innerHeight * reasonWidth;
  const size = innerWidth / 40;

  return [innerWidth, innerHeight, size];
};
