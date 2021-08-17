import React, { useEffect, useState } from "react";
import { getStorageUrl } from "../js/firebase-helper";
import { isValidUrl } from "../js/helper";

export default function StorageImg(props) {
  const { src, ...rest } = props;
  const [url, setUrl] = useState("");

  useEffect(() => {
    if (!src) return;
    if (isValidUrl(src)) {
      setUrl(src);
    }
    getStorageUrl(src).then(setUrl);
  }, [src]);

  if (!url) {
    return null;
  }
  return <img src={url} {...rest} />;
}
