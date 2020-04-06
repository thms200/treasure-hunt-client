// [location]
export const caculateDelta = (screen) => {
  const aspectRatio = screen.width / screen.height;
  const latiDelta = 0.0922;
  const longiDelta = latiDelta * aspectRatio;
  return { latiDelta, longiDelta };
};
