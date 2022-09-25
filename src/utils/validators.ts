import differenceInYears from 'date-fns/differenceInYears';
import convertToTimestamp from './convertToTimestamp';
import formatPrice from './formatPrice';
import getAge from './getAge';

export const numberValidator = (inputName: string) => ({
  value: /^[0-9]*$/,
  message: `${inputName} might only contains numbers.`,
});

export const emailValidator = () => ({
  value:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  message: 'Invalid email address.',
});

export const verificationCodeValidator = () => ({
  value: 6,
  message: '6 characters minimum.',
});

export const passwordValidator = () => ({
  value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!"#$£%&'()*+,-./:;<=>?@[\]^_`{|}~]).{8,}$/,
  message:
    'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, one special character. (#?!@$%^&*-£.)',
});

export const expiryDateValidator = () => ({
  value: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
  message: 'Please use the following format MM/YY.',
});

export const minimalCarAge = (inputValue: string) => {
  const diff = differenceInYears(Date.now(), new Date(inputValue));
  return diff < 8 || 'Maximum car age is 8.';
};

export const minimalAgeValidator = (inputValue: string | Date, minAge: number) => {
  const userAge = getAge(
    inputValue instanceof Date ? Date.parse(inputValue.toString()) : convertToTimestamp(inputValue),
  );
  return (
    userAge >= minAge ||
    `Sorry, you need to be ${minAge} years old to be eligible for car sharing services.`
  );
};

export const plateNumberValidator = () => ({
  value:
    /^([A-Z]{2}[0-9]{2}\s?[A-Z]{3}$)|(^[A-Z][0-9]{1,3}[A-Z]{3}$)|(^[A-Z]{3}[0-9]{1,3}[A-Z]$)|(^[0-9]{1,4}[A-Z]{1,2}$)|(^[0-9]{1,3}[A-Z]{1,3}$)|(^[A-Z]{1,2}[0-9]{1,4}$)|(^[A-Z]{1,3}[0-9]{1,3}$)|(^[A-Z]{1,3}[0-9]{1,4}$)|(^[0-9]{3}[DX]{1}[0-9]{3})$/,
  message: 'Please provide correct plate number.',
});

export const priceAberrationValidator = (
  inputValue: number,
  suggestedPrice: number,
  aberration: number, // Percent
) => {
  const inputValueData = inputValue * 100;
  const suggestedPriceData = suggestedPrice * 100;
  const suggestedPriceAberration = suggestedPriceData * (aberration / 100);
  const suggestedMaximumPriceWithAberration = suggestedPriceData + suggestedPriceAberration;
  const suggestedMinimumPriceWithAberration = suggestedPriceData - suggestedPriceAberration;

  if (inputValueData < 0) {
    return 'The rate can not go below zero.';
  }

  if (inputValueData > suggestedMaximumPriceWithAberration) {
    return `Maximum price you could set is ${formatPrice(
      suggestedMaximumPriceWithAberration / 100,
      2,
    )}`;
  }
  if (inputValueData < suggestedMinimumPriceWithAberration) {
    return `Minimum price you could set is ${formatPrice(
      suggestedMinimumPriceWithAberration / 100,
      2,
    )}`;
  }
  return true;
};
