import React, { useRef, RefObject, useEffect } from 'react';
import { ThemeColor, ThemeType, themeColors, themeNames } from '../theme';
import {
  TEXT_IMAGE_WIDTH,
  TEXT_IMAGE_HEIGHT,
  TextPainter,
  ThemeSetting,
} from './utils';

export interface Props {
  text: string;
  themeType: ThemeType;
  themeColor: ThemeColor;
  onRender?: (imageBase64Url: string) => void;
}

const TextImage: React.FunctionComponent<Props> = ({
  text,
  themeType,
  themeColor,
  onRender,
}: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>() as RefObject<HTMLCanvasElement>;
  const imageRef = useRef<HTMLImageElement>() as RefObject<HTMLImageElement>;
  const themeNameIndex = themeColors.indexOf(themeColor);
  const themeName = themeNames[themeNameIndex];

  const canvasStyle = {
    display: 'none',
  };

  const imageStyle = {
    display: 'block',
    margin: '0 auto',
    width: '95%',
    maxWidth: 500,
  };

  useEffect(() => {
    if (!canvasRef.current || !imageRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    const image = imageRef.current;
    const canvasContext = canvas.getContext('2d');

    if (!canvasContext) {
      return;
    }

    const themeSetting: ThemeSetting = {
      type: themeType,
      name: themeName,
      color: themeColor,
    };

    const textPainter = new TextPainter(text, canvasContext, themeSetting);
    textPainter.paintText();
    image.src = canvas.toDataURL();
    onRender?.(image.src);
  }, [text, canvasRef, imageRef, themeName, themeType, themeColor, onRender]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={TEXT_IMAGE_WIDTH}
        height={TEXT_IMAGE_HEIGHT}
        style={canvasStyle}
      ></canvas>
      <img ref={imageRef} alt={text} style={imageStyle} />
    </div>
  );
};

export default TextImage;
