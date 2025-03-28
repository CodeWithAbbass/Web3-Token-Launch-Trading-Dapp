export const socialLinkReg =
  /https?:\/\/(www\.)?twitter\.com\/[A-Za-z0-9_]+\/?|https?:\/\/(www\.)?(t\.me|telegram\.me)\/[A-Za-z0-9_]+\/?|https?:\/\/(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?([\/\w.-]*)*\/?/;

export const checkSocialLinks = (value) => {
  return socialLinkReg.test(value);
};
const _regexInt = /^(\d+)/;
export const regexInt = (value) => {
  return _regexInt.test(value);
};
