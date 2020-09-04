declare module '*.css' {
  const content: { [className: string]: string };
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  export default content;
}
