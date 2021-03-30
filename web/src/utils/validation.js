export function isEmpty(value) {
  return (
    (typeof value === "string" && value.length === 0) ||
    value === undefined ||
    value === null
  );
}
export function isNotEmpty(value) {
  return !isEmpty(value);
}

export function isEmail(value) {
  const re = /^([\w.\-_+]+)?\w+@[\w-_]+(\.\w+){1,}$/;
  return re.test(value);
}

export function isPhoneNumber(value) {
  const re = /^\+[0-9]{10,15}$/;
  return re.test(value);
}
export function isPassword(value) {
  const re = /^.{8,}$/;
  return re.test(value);
}

export function isDate(value) {
  const re = /^(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])\/20\d\d$/;
  return re.test(value);
}

export function isMilitaryTime(value) {
  const re = /^([01][0-9]|2[0123]):[0-5][0-9]$/;
  return re.test(value);
}

export function isWholeNumber(value) {
  const re = /^\d+$/;
  return re.test(value);
}

export function isDecimalNumber(value) {
  const re = /^\d+(.\d+)?$/;
  return re.test(value);
}

export function isTrue(value) {
  return value === true;
}
