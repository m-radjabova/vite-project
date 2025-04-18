declare module "*.css";
declare module "*.scss";
declare module "chroma-js";

declare module "*.svg" {
    const content: string;
    export default content;
}