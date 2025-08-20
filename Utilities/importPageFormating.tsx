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
