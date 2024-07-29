const fileAllow = ["image/png", "image/jpg", "image/jpeg"];
const sizeAllowKB = 2;

export const superValidateImage = ({ file, sizeAllowOptions }: { file: File; sizeAllowOptions?: number }) => {
      let _check = false;
      let message = "";
      const { size, type } = file;
      const sizeMb = size / 1024 / 1024;

      const _checkFileAllow = fileAllow.includes(type);
      const sizeAllow = sizeAllowOptions || sizeAllowKB;
      const _checkSizeAllow = sizeMb < sizeAllow;

      if (_checkFileAllow && _checkSizeAllow) {
            _check = true;
            return { _check, message };
      }
      if (!_checkFileAllow && !_checkSizeAllow) {
            message = "File không đúng định dạng về đuôi file và kích thích file";
      }
      if (!_checkFileAllow && _checkSizeAllow) {
            message = "File không đúng định dạng - " + fileAllow.join(" - ");
      }

      if (_checkFileAllow && !_checkSizeAllow) {
            message = `File phải nhỏ hơn ${sizeAllow}mb`;
      }

      return { _check, message };
};
