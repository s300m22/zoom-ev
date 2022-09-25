import { FileRejection } from 'react-dropzone';

const formatUploadErrors = (fileRejections: Array<FileRejection>) => {
  const errorsList = new Set<string>();
  fileRejections.map(({ errors }) =>
    errors.forEach(({ code }) => {
      switch (code) {
        case 'file-too-large':
          return errorsList.add('The file is too large. The maximum file size is 8 MB.');
        case 'file-too-small':
          return errorsList.add('The file is too small.');
        case 'too-many-files':
          return errorsList.add('Too many files.');
        case 'file-invalid-type':
          return errorsList.add(
            'The file is in the wrong format. Accepted file formats: JPG, GIF, HEIC, HEIF or PNG.',
          );
        default:
          return errorsList.add('Unknown error. Please try again.');
      }
    }),
  );
  return Array.from(errorsList);
};

export default formatUploadErrors;
