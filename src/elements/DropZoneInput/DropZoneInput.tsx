/* eslint-disable global-require */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-nested-ternary */
import React, { useRef, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Resizer from 'react-image-file-resizer';
import Camera from 'react-html5-camera-photo';
import { FieldErrors, UseFormClearErrors, UseFormSetValue } from 'react-hook-form';
import Button from '../Button';
import { useOnClickOutside, useSnackbar, useUploadFiles } from '../../hooks';
import { formatUploadErrors, logError } from '../../utils';
import { ImagePurposeEnum, ImageType } from '../../interfaces/api.types.generated';
import {
  UploadImageWrapper,
  UploadDropZoneWrapper,
  UploadDropZoneLabel,
  ImagePreview,
  DeleteIconWrapper,
  TakePhotoButtonWrapper,
  CameraWrapper,
  CameraClose,
  DropZoneInputWrapper,
  Error,
  ErrorWrapper,
} from './DropZoneInput.styled';
import { DeleteWhiteIcon, PlusSignIcon, UploadImageIcon } from '../../icons';

export interface DropZoneInputProps {
  label?: string;
  name: string;
  errors: FieldErrors;
  setFieldValue: UseFormSetValue<any>;
  clearErrors: UseFormClearErrors<any>;
  imagePurpose: ImagePurposeEnum;
  currentImage?: ImageType | null;
  showPlus?: boolean;
  showTakePhoto?: boolean;
  isDisabled?: boolean;
  isAvatar?: boolean;
  includePreview?: boolean;
}
interface AcceptedFile extends File {
  preview?: string;
}

const DropZoneInput = ({
  label = '',
  name,
  errors,
  setFieldValue,
  clearErrors,
  imagePurpose,
  currentImage,
  showPlus = false,
  showTakePhoto = true,
  isDisabled,
  isAvatar,
  includePreview = false,
}: DropZoneInputProps) => {
  const ACCEPTED_FILE_EXTENSIONS = ['jpeg', 'jpg', 'png', 'gif', 'heic', 'heif'];
  const showSnackbar = useSnackbar();
  const [isUploading, setIsUploading] = useState(false);
  const [file, setFile] = useState<AcceptedFile | undefined>(undefined);
  const [currentFile, setCurrentFile] = useState(currentImage);
  const [error, setError] = useState<Array<string>>([]);
  const [showCameraCapture, setShowCameraCapture] = useState(false);
  const [showCameraButtons, setShowCameraButtons] = useState(showTakePhoto);
  const { uploadFile } = useUploadFiles();
  const cameraRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFile(undefined);
    setCurrentFile(currentImage);
  }, [currentImage]);

  useOnClickOutside(cameraRef, () => setShowCameraCapture(false));

  const resizeImage = (image: File) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        image,
        isAvatar ? 240 : 676,
        isAvatar ? 240 : 676,
        image.type.includes('png') && isAvatar ? 'PNG' : 'JPEG',
        80,
        0,
        (uri) => {
          resolve(uri as File);
        },
        'file',
      );
    }) as Promise<File>;

  const handleFileUploadFlow = async (fileToUpload: AcceptedFile) => {
    try {
      setError([]);
      clearErrors(name);
      setIsUploading(true);
      const fileExtension = fileToUpload.name.split('.').pop()?.toLowerCase();
      let newFileToUpload = fileToUpload;

      if (fileExtension === 'heif' || fileExtension === 'heic') {
        const heic2any = require('heic2any'); // Required instead of import due to: https://github.com/alexcorvi/heic2any/issues/13
        const fileBlob = new Blob([newFileToUpload], { type: 'text/plain' });
        const fileOutput = await heic2any({
          blob: fileBlob,
          toType: isAvatar ? 'image/png' : 'image/jpeg',
          quality: 0.8,
        });
        newFileToUpload = new File([fileOutput], fileToUpload.name, {
          type: 'image/png',
        });
      }
      const resizedImage = await resizeImage(newFileToUpload);
      const uploadedFile = await uploadFile(resizedImage, imagePurpose);
      setIsUploading(false);
      if (includePreview) {
        setFieldValue(name, uploadedFile);
      } else {
        setFieldValue(name, uploadedFile.id);
      }
      setFile(Object.assign(resizedImage, { preview: URL.createObjectURL(resizedImage) }));
    } catch (err) {
      showSnackbar({ message: 'Oops, Something went wrong. Please try again.', type: 'error' });
      logError(err);
    } finally {
      setIsUploading(false);
    }
  };

  const handleTakePhoto = async (dataURI: string) => {
    const type = dataURI.substring(dataURI.indexOf(':') + 1, dataURI.indexOf(';'));
    const blob = await (await fetch(dataURI)).blob();
    const fileFromBlob = new File([blob], name, {
      type,
    });
    handleFileUploadFlow(fileFromBlob);
    setShowCameraCapture(false);
  };

  const handleDelete = () => {
    setFile(undefined);
    setFieldValue(name, null);
    setCurrentFile(null);
    clearErrors(name);
    setIsUploading(false);
  };

  const customFileTypeValidator = (fileToValidate: AcceptedFile) => {
    const fileExtension = fileToValidate.name.split('.').pop() as string;
    if (!ACCEPTED_FILE_EXTENSIONS.includes(fileExtension.toLowerCase())) {
      return {
        code: 'file-invalid-type',
        message:
          'The file is in the wrong format. Accepted file formats: JPG, GIF, HEIC, HEIF or PNG.',
      };
    }
    return null;
  };

  const { getRootProps, getInputProps } = useDropzone({
    noKeyboard: true,
    maxFiles: 1,
    maxSize: 8388608,
    onDropRejected: (fileRejections) => setError(formatUploadErrors(fileRejections)),
    onDropAccepted: async (droppedFiles) => {
      const droppedFile = droppedFiles[0]; // Right now we support only single file upload
      handleFileUploadFlow(droppedFile);
    },
    validator: customFileTypeValidator,
  });

  useEffect(() => {
    if (currentImage) {
      setFieldValue(name, currentImage);
    }
  }, [currentImage, name, setFieldValue]);

  return (
    <DropZoneInputWrapper
      isAvatar={Boolean(isAvatar)}
      isDisabled={Boolean(isDisabled)}
      isUploading={isUploading}
    >
      <UploadImageWrapper isDisabled={Boolean(isDisabled)}>
        {showCameraCapture && (
          <CameraWrapper ref={cameraRef}>
            <CameraClose onClick={() => setShowCameraCapture(false)} />
            <Camera
              onCameraError={() => setShowCameraButtons(false)}
              onTakePhotoAnimationDone={(dataUri) => handleTakePhoto(dataUri)}
            />
          </CameraWrapper>
        )}
        {label && <UploadDropZoneLabel>{label}</UploadDropZoneLabel>}
        <UploadDropZoneWrapper
          isAvatar={Boolean(isAvatar)}
          {...getRootProps({
            className: 'dropzone',
            name,
            multiple: false,
          })}
        >
          <input
            {...getInputProps({
              multiple: false,
              name,
            })}
          />
          {file ? (
            <>
              <DeleteIconWrapper
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
              >
                <DeleteWhiteIcon />
              </DeleteIconWrapper>
              <ImagePreview key={file.name} src={file.preview} />
            </>
          ) : currentFile ? (
            <>
              <DeleteIconWrapper
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete();
                }}
              >
                <DeleteWhiteIcon />
              </DeleteIconWrapper>
              <ImagePreview src={currentFile.url} />
            </>
          ) : showPlus ? (
            <PlusSignIcon />
          ) : isAvatar ? (
            <UploadImageIcon />
          ) : (
            <>
              Click to upload <br />
              photo
            </>
          )}
        </UploadDropZoneWrapper>
        {showCameraButtons && (
          <TakePhotoButtonWrapper>
            <Button
              customStyles={{ width: '100%' }}
              onClick={() => setShowCameraCapture(true)}
              type="button"
              variant="outlined"
            >
              Take a photo
            </Button>
          </TakePhotoButtonWrapper>
        )}
      </UploadImageWrapper>
      {errors[name] || error.length ? (
        <ErrorWrapper>
          {errors[name] && <Error>{errors[name].message}</Error>}
          {error.map((err) => (
            <Error key={err}>{err}</Error>
          ))}
        </ErrorWrapper>
      ) : null}
    </DropZoneInputWrapper>
  );
};
export default DropZoneInput;
