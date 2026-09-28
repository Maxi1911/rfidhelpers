export const getDcid = () => {
  return localStorage.getItem('dcid') || 100000;
};

export const setDcid = (val) => {
  localStorage.setItem('dcid', val);
};
