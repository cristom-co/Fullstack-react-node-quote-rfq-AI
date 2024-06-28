export const extractClientName = (emailText: string) => {
  const regex =
    /Hi, my name is ([A-Z][a-z]+ [A-Z][a-z]+)|My name is ([A-Z][a-z]+ [A-Z][a-z]+)|I am ([A-Z][a-z]+ [A-Z][a-z]+)|This is ([A-Z][a-z]+ [A-Z][a-z]+)/i;
  const match = emailText.match(regex);
  if (match) {
    return match[1] || match[2] || match[3] || match[4];
  }
  return null;
};
