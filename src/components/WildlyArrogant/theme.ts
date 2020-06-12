export type ThemeName =
    | "狂言妄語"
    | "甜言蜜語"
    | "自言自語"
    | "酸言酸語"
    | "流言蜚語"
    | "胡言亂語"
    | "污言穢語"
    | "名言勵語"
    | "荒言謬語";

export type ThemeColor =
    | "lightblue"
    | "hotpink"
    | "lightgray"
    | "mediumslateblue"
    | "lightsalmon"
    | "lightseagreen"
    | "crimson"
    | "gold"
    | "cornflowerblue";

export const themeNames: ThemeName[] = [
    "狂言妄語",
    "甜言蜜語",
    "自言自語",
    "酸言酸語",
    "流言蜚語",
    "胡言亂語",
    "污言穢語",
    "名言勵語",
    "荒言謬語",
];

export const themeColors: ThemeColor[] = [
    "lightblue",
    "hotpink",
    "lightgray",
    "mediumslateblue",
    "lightsalmon",
    "lightseagreen",
    "crimson",
    "gold",
    "cornflowerblue",
];

export enum ThemeType {
    BlackBackground,
    WhiteText,
    BlackText,
    BlackBackgroundWhiteText,
    WhiteBackgroundBlackText,
}

export const ThemeTypeNames = [
    "黑底原色",
    "原底白色",
    "原底黑色",
    "黑底白色",
    "白底黑色",
];
