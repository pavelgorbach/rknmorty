import { useCallback, useState, useEffect } from 'react'

import styles from './LazyImage.module.scss'

type Props = {
  src: string
  alt: string
  width: number
  height: number
}

export default function LazyImage(p: Props) {
  const [imgSrc, setSrc] = useState(p.src)

  const onLoad = useCallback(() => {
    setSrc(p.src)
  }, [p.src])

  const onError = useCallback(() => {
    setSrc('');
  }, []);

  useEffect(() => {
    const img = new Image();
    img.src = p.src as string;
    img.addEventListener("load", onLoad);
    img.addEventListener("error", onError);
    return () => {
      img.removeEventListener("load", onLoad);
      img.removeEventListener("error", onError);
    };
  }, [p.src, onLoad, onError]);

  // TODO: show placeholder while loading
  return (
    <img alt={imgSrc} className={styles.img} src={imgSrc} width={90} height={90} />
  )
}
