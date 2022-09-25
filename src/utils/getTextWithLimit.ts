interface GetTextWithLimitProps {
  text: string;
  limit?: number;
  toFirstDot?: boolean;
}

const getTextWithLimit = ({ text, limit, toFirstDot = false }: GetTextWithLimitProps): string => {
  let formattedText = text;

  if (!formattedText) return '';

  if (toFirstDot) {
    formattedText = text.substring(0, text.indexOf('.'));
  }

  if (!limit) {
    return formattedText;
  }

  let result = '';
  const words = formattedText.split(/ /);
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < words.length && result.length < limit; i++) {
    result += `${words[i]} `;
  }

  const trimmed = result.trim();

  if (trimmed[trimmed.length - 1] === '.') {
    return trimmed;
  }

  return `${trimmed} ...`;
};

export default getTextWithLimit;
