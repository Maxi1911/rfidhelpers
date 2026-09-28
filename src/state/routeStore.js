export const getRouteId = () => {
  return localStorage.getItem('routeId') || 1;
};

export const setRouteId = (val) => {
  localStorage.setItem('routeId', val);
};
