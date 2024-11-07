const parseImg = path => {
  const [type] = path.split('_');
  const folder = type === 'ic' ? 'icons' : 'images';
  try {
    return require(`assets/${folder}/${path}`);
  } catch (error) {
    console.error('Image not found:', error);
    return null;
  }
};

export default parseImg;
