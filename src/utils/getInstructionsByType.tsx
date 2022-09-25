import { RichTextRenderer } from '../elements';
import {
  IInstructionFields,
  IInstructionsSectionFields,
} from '../interfaces/contentful.types.generated';

const getInstructionsByType = (
  instructions: IInstructionsSectionFields['sections'],
  type: Array<IInstructionFields['type']>,
) =>
  instructions
    .filter((instruction) => type.includes(instruction.fields.type))
    .map((ins) => ({
      title: ins.fields.title,
      content: <RichTextRenderer>{ins.fields.description}</RichTextRenderer>,
    }));

export default getInstructionsByType;
