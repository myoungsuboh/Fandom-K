const classes = (prevClass, newClass) => {
  if (!newClass) return prevClass;
  else if (typeof newClass === 'string') return [prevClass, newClass].join(' ');
  else return [prevClass, ...newClass].join(' ');
};

export default classes;
