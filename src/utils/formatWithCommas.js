function formatWithCommas(value) {
  let result = 0;

  switch (typeof value) {
    case 'string':
      result = Number(value.replaceAll(',', ''));
      break;
    case 'number':
      result = value;
      break;
    default:
      return value;
  }

  if (isNaN(result)) return value;

  return result.toLocaleString('ko-KR');
}

export default formatWithCommas;
