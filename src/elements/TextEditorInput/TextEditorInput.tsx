import { useMemo } from 'react';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import { Controller, Control, FieldErrors } from 'react-hook-form';
import { Error, Label, TextEditorInputWrapper } from './TextEditorInput.styled';

interface TextEditorInputProps {
  label?: string;
  name: string;
  control: Control<any>;
  required?: boolean;
  defaultValue?: string;
  errors?: FieldErrors;
  readOnly?: boolean;
  restoreValue?: {
    value: string;
    restore: boolean;
  };
}

const ReactQuill = dynamic(import('react-quill'), {
  ssr: false,
});

const TextEditorInput = ({
  label,
  name,
  control,
  required,
  errors,
  defaultValue,
  readOnly,
  restoreValue,
}: TextEditorInputProps) => {
  const fieldError = errors && errors[name];

  const error = useMemo((): string | null => {
    if (!fieldError) {
      return null;
    }

    if (fieldError.type === 'required') {
      return 'Required';
    }

    return fieldError.message;
  }, [fieldError]);

  const modules = {
    toolbar: readOnly ? false : [['bold', 'italic']],
  };

  return (
    <TextEditorInputWrapper isError={Boolean(fieldError)} isReadOnly={Boolean(readOnly)}>
      {label && (
        <Label htmlFor={name} isError={Boolean(fieldError)} required={required}>
          {label}
        </Label>
      )}
      <Controller
        control={control}
        defaultValue={defaultValue || ''}
        name={name}
        render={({ field: { onChange } }) => (
          <ReactQuill
            defaultValue={defaultValue || ''}
            formats={['bold', 'italic']}
            modules={modules}
            onChange={(description) => onChange(description)}
            readOnly={readOnly}
            theme="snow"
            {...(restoreValue && restoreValue.restore && { value: restoreValue.value })}
          />
        )}
        rules={{ required }}
      />
      <Error>{error}</Error>
    </TextEditorInputWrapper>
  );
};

export default TextEditorInput;
