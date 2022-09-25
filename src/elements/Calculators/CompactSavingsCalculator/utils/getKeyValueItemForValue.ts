import { IKeyValueItem } from '../../../../interfaces/contentful.types.generated';

const getKeyValueItemForValue = (
  carAge?: string,
  discountedOffPrice?: Array<IKeyValueItem>,
): number => {
  const discountedItem = discountedOffPrice?.find(({ fields: { value } }) => value === carAge);

  return discountedItem ? parseFloat(discountedItem.fields.value) : 0;
};

export default getKeyValueItemForValue;
