import useSnackbar from './useSnackbar';
import { useCommitImageUploadMutation } from './api/commitImageUpload/commitImageUpload.generated';
import { useSignImageUploadCredentialsMutation } from './api/signImageUploadCredentials/signImageUploadCredentials.generated';
import { ImagePurposeEnum } from '../interfaces/api.types.generated.d';
import logError from '../utils/logError';

const useUploadFiles = () => {
  const showSnackbar = useSnackbar();
  const [getS3Credentials] = useSignImageUploadCredentialsMutation();
  const [commitImageUpload] = useCommitImageUploadMutation();

  const uploadFile = async (file: Blob, imagePurpose: ImagePurposeEnum) => {
    try {
      const { data } = await getS3Credentials({
        variables: {
          imagePurpose,
        },
      });

      const s3credentials = data?.signImageUploadCredentials;

      if (!s3credentials) {
        throw new Error('Invalid s3 credentials');
      }

      const formData = new FormData();
      const parsedFields = JSON.parse(s3credentials.fields);

      formData.append('Content-Type', file.type);

      Object.entries(parsedFields).forEach(([k, v]) => {
        formData.append(k, v as string);
      });

      formData.append('file', file);

      await fetch(s3credentials.url, {
        method: 'POST',
        body: formData,
      });

      await commitImageUpload({
        variables: {
          imageId: s3credentials.imageId,
        },
      });

      return {
        id: s3credentials.imageId,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        url: (file as any)?.preview,
      };
    } catch (error) {
      logError(error);
      showSnackbar({
        message: 'Oops, Something went wrong. Please try to upload your file once again.',
        type: 'error',
      });
      return {
        imageId: undefined,
        preview: undefined,
      };
    }
  };

  return { uploadFile };
};

export default useUploadFiles;
