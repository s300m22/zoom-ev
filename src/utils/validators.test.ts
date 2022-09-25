import { passwordValidator } from './validators';

test('validates password with special characters', () => {
  const regex = passwordValidator().value;
  const pass1 = 'Secret123!';
  const pass2 = 'Secret123-';
  const pass3 = 'Secret123£';
  const pass4 = 'Secret123.';
  const pass5 = 'Secret123$';

  expect(pass1).toMatch(regex);
  expect(pass2).toMatch(regex);
  expect(pass3).toMatch(regex);
  expect(pass4).toMatch(regex);
  expect(pass5).toMatch(regex);

  const noPass1 = 'Secret123';
  const noPass2 = 'Secretasdf!';
  const noPass3 = 'Secret';
  const noPass4 = '123342543!';
  const noPass5 = 'S1234234F!';

  expect(regex.test(noPass1)).toBe(false);
  expect(regex.test(noPass2)).toBe(false);
  expect(regex.test(noPass3)).toBe(false);
  expect(regex.test(noPass4)).toBe(false);
  expect(regex.test(noPass5)).toBe(false);
});
