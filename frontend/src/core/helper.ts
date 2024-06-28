import { BASE_URL } from "./axios.instance";

export const getShortLinkUrl = (shortId: string): string => {
  return `${BASE_URL}/${shortId}`;
};

export const copyToClipboard = (textToCopy: string) => {
  const el = document.createElement('textarea');
  el.addEventListener('focusin', (e) => e.stopPropagation());
  el.value = textToCopy;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};
