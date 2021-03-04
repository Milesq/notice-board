export default function (arr: string[], name: string): boolean {
  const accentsIn = 'ęóąśłżźćń'.split('');
  const accentsOut = 'eoaslzzcn'.split('');
  const accents: { [letter: string]: string } = accentsIn.reduce(
    (acc, el, i) => ({ ...acc, [el]: accentsOut[i] }),
    {}
  );

  const normalize = (s: string) =>
    s
      .toLocaleLowerCase()
      .split('')
      .map(letter => accents[letter] ?? letter)
      .join('')
      .split(' ')
      .sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }))
      .join('')
      .replace(/[^a-z]/g, '');

  return arr.map(user => normalize(user)).includes(normalize(name));
}
