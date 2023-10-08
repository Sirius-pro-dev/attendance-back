import QRCode from 'qrcode';

export const generateQR = (url: string) => {
  return QRCode.toDataURL(url);
};
