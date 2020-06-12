import { ThemeColor, ThemeType, ThemeName } from "../theme";

export const TEXT_IMAGE_WIDTH = 500;
export const TEXT_IMAGE_HEIGHT = 300;
export const TEXT_IMAGE_BORDER_WIDTH = 10;
export const AVAILABLE_TEXT_IMAGE_WIDTH = TEXT_IMAGE_WIDTH - TEXT_IMAGE_BORDER_WIDTH * 2;

interface ThemeStyle {
    textColor: string;
    borderColor: string;
    backgroundColor: string;
}

interface TextLinesWithStyle {
    textLines: string[],
    fontSize: number,
    lineHeight: number,
    paddingTop: number,
    paddingLeft: number,
}

export interface ThemeSetting {
    type: ThemeType;
    name: ThemeName;
    color: ThemeColor;
}

export class TextPainter {
    public text: string;
    public canvasContext: CanvasRenderingContext2D;
    public themeStyle: ThemeStyle;
    public themeSetting: ThemeSetting;

    constructor(text: string, canvasContext: CanvasRenderingContext2D, themeSetting: ThemeSetting) {
        this.text = text;
        this.canvasContext = canvasContext;
        this.themeSetting = themeSetting;
        this.themeStyle = this.applyThemeSetting();
    }

    applyThemeSetting() {
        const { themeSetting: { type: themeType, color: themeColor } } = this;

        switch (themeType) {
            case ThemeType.WhiteText:
                return this.themeStyle = {
                    textColor: "#f2f2f2",
                    borderColor: "#888888",
                    backgroundColor: themeColor,
                };

            case ThemeType.BlackText:
                return this.themeStyle = {
                    textColor: "#0d0d0d",
                    borderColor: "#777777",
                    backgroundColor: themeColor,
                };

            case ThemeType.BlackBackgroundWhiteText:
                return this.themeStyle = {
                    textColor: "#f2f2f2",
                    borderColor: themeColor,
                    backgroundColor: " #0d0d0d",
                };

            case ThemeType.WhiteBackgroundBlackText:
                return this.themeStyle = {
                    textColor: "#0d0d0d",
                    borderColor: themeColor,
                    backgroundColor: "#f2f2f2",
                };

            case ThemeType.BlackBackground:
            default:
                return this.themeStyle = {
                    textColor: themeColor,
                    borderColor: "#777777",
                    backgroundColor: "#0d0d0d",
                };
        }
    }

    paintThemeTemplate() {
        const { canvasContext, themeStyle, themeSetting } = this;
        const { textColor, borderColor, backgroundColor } = themeStyle;
        canvasContext.textBaseline = "middle";
        canvasContext.fillStyle = backgroundColor;
        canvasContext.fillRect(5, 5, 490, 290);
        canvasContext.lineWidth = 10;
        canvasContext.strokeStyle = borderColor;
        canvasContext.strokeRect(0, 0, 500, 300);
        canvasContext.font = "20px sens-serif";
        canvasContext.globalAlpha = 0.8;
        canvasContext.fillStyle = textColor;
        canvasContext.fillText(themeSetting.name, 415, 285);
        canvasContext.globalAlpha = 1;
        canvasContext.font = "30px sans-serif";
    }

    getBreakedTextLinesWithStyleByFontSize(fontSize: number = 30): TextLinesWithStyle {
        const { text, canvasContext } = this;
        const textLines = text.split("\n");
        const breakedTextLines = [];
        let maxTextLineWidthOnCanvas = 0;
        canvasContext.font = `${fontSize}px sans-serif`;

        for (let textLine of textLines) {
            const textLineWidthOnCanvas = canvasContext.measureText(textLine).width;

            if (textLineWidthOnCanvas > AVAILABLE_TEXT_IMAGE_WIDTH) {
                let newTextLine = "";

                for (let textChar of textLine) {
                    const newTextLineWidthOnCanvas = canvasContext.measureText(newTextLine + textChar).width;

                    if (newTextLineWidthOnCanvas <= AVAILABLE_TEXT_IMAGE_WIDTH) {
                        newTextLine += textChar;
                        maxTextLineWidthOnCanvas = Math.max(newTextLineWidthOnCanvas, maxTextLineWidthOnCanvas);
                    }
                    else {
                        breakedTextLines.push(newTextLine);
                        newTextLine = textChar;
                    }
                }

                if (newTextLine) {
                    breakedTextLines.push(newTextLine);
                }
            }
            else {
                breakedTextLines.push(textLine);
                maxTextLineWidthOnCanvas = Math.max(textLineWidthOnCanvas, maxTextLineWidthOnCanvas);
            }
        }

        const lineHeight = fontSize + 5;
        const paddingTop = (TEXT_IMAGE_HEIGHT - (breakedTextLines.length * lineHeight)) / 2 + 2.5;
        const paddingLeft = (TEXT_IMAGE_WIDTH - maxTextLineWidthOnCanvas) / 2;

        return {
            textLines: breakedTextLines,
            fontSize,
            lineHeight,
            paddingTop,
            paddingLeft,
        };
    }

    paintTextByTextLinesAndStyle({ textLines, ...style }: TextLinesWithStyle) {
        const { canvasContext } = this;
        const { fontSize, lineHeight, paddingTop, paddingLeft } = style;

        const textLineStartPosition = {
            x: paddingLeft,
            y: paddingTop + lineHeight / 2,
        };

        canvasContext.font = `${fontSize}px sans-serif`;

        for (let textLine of textLines) {
            canvasContext.fillText(textLine, textLineStartPosition.x, textLineStartPosition.y);
            textLineStartPosition.y += fontSize + 5;
        }
    }

    paintText() {
        const { text } = this;
        const textLines = text.split("\n");

        for (let fontSize = 25; fontSize <= 60; fontSize += 5) {
            const breakedTextLinesWithStyle = this.getBreakedTextLinesWithStyleByFontSize(fontSize);
            const breakedTextLines = breakedTextLinesWithStyle.textLines;

            if (breakedTextLinesWithStyle.paddingTop < fontSize || textLines.length < breakedTextLines.length) {
                const breakedTextLinesWithStyle = this.getBreakedTextLinesWithStyleByFontSize(fontSize - 5);
                this.paintThemeTemplate();
                this.paintTextByTextLinesAndStyle(breakedTextLinesWithStyle);
                return;
            }
        }

        const breakedTextLinesWithStyle = this.getBreakedTextLinesWithStyleByFontSize(60);
        this.paintThemeTemplate();
        this.paintTextByTextLinesAndStyle(breakedTextLinesWithStyle);
    }
}
