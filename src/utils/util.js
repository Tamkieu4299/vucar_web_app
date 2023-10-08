import { message } from "antd";
import { getLocalStorage } from "./storage";

const isString = (v) => typeof v === "string";

export const trimParams = (params) =>
  Object.keys(params).reduce((acc, k) => {
    if (!isString(params[k])) {
      return {
        ...acc,
        [k]: params[k],
      };
    }
    return {
      ...acc,
      [k]: params[k].trim(),
    };
  }, {});

export const fileMusicPattern =
  /^(audio\/mp3|audio\/mpeg|video\/mp4|audio\/x-ms-wma|audio\/wav|audio\/flac|audio\/aac|audio\/ogg|audio\/aiff|audio\/alac)$/;

export const checkFile = (file) => {
  const { type } = file;

  const isMusicFile = fileMusicPattern.test(type);

  if (!isMusicFile) {
    message.error("Upload wrong file");
  }
  return isMusicFile;
};

export const user = getLocalStorage("tempUser");
