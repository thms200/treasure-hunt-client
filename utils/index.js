export const caculateLocation = (latitude, longitude, screen) => {
  const aspectRatio = screen.width / screen.height;
  const latitudeDelta = 0.0922;
  const longitudeDelta = latitudeDelta * aspectRatio;
  return { latitude, longitude, latitudeDelta, longitudeDelta };
};
