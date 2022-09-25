import contentfulClient from './client';
import { IInstructionsSectionFields } from '../interfaces/contentful.types.generated';
import removeEntryCollectionCircularReferences from './utils/removeEntryCollectionCircularReferences';

const getInstructions = async (fieldFor: string) => {
  const instructions = await contentfulClient.getEntries<IInstructionsSectionFields>({
    content_type: 'instructionsSection',
    'fields.for': fieldFor,
    include: 4,
    resolveLinks: true,
  });

  const instruction = removeEntryCollectionCircularReferences(instructions).items[0];

  if (!instruction) {
    throw new TypeError('Instructions contentful entry is missing.');
  }
  return instruction;
};

export default getInstructions;
