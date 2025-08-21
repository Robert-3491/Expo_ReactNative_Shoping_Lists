export const hasMainListTag = (content: string) => {
  return content.startsWith("<M>");
};

export const hasSectionTag = (content: string) => {
  return content.startsWith("<S>");
};

export const hasItemTag = (content: string) => {
  return content.startsWith("<I>");
};

export const arrayHasItemTag = (contentArray: string[]) => {
  return contentArray.some((item) => item.startsWith("<I>"));
};

export const hasLinkTag = (content: string) => {
  return content.startsWith("<L>");
};

export const extractTagContent = (element: string): string => {
  const content = element.match(/<[^>]+>(.*?)<\/[^>]+>/);
  return content ? content[1] : element;
};

export const importInputPlaceholder = `Allowed structures:

-Lose Item/s:
  <I>Item title</I> 
  <L>www.item.com</L>
  ...

-Section/s:
  <S>Section title</S>
    <I>Item title</I> 
    <L>www.item.com</L>
    ...

-List/s:
  <M>List title</M> 
    <S>Section title</S>
      <I>Item title</I> 
      <L>www.item.com</L>
      ...
`;
