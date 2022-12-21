interface Alias {
  find: string | RegExp;
  replacement: string;
}

interface Options {
  entries: Alias[] | { [find: string]: string };
}

const alias = (options: Options) => {
  const entries = normalizeEntries(options);

  return {
    resolveId(source: string, importer: string | undefined) {
      const matchedEntry = entries.find((entry) => entry.match(source));

      if (!matchedEntry) return null;

      const { find, replacement } = matchedEntry;
      return source.replace(find, replacement);
    },
  };
};

class Entry {
  find: string | RegExp;
  replacement: string;
  constructor(find: string | RegExp, replacement: string) {
    this.find = find;
    this.replacement = replacement;
  }
  match(source: string) {
    if (typeof this.find === "string") {
      return source.startsWith(this.find + "/");
    } else {
      return this.find.test(source);
    }
  }
}

function normalizeEntries(options: Options): Entry[] {
  const { entries } = options;
  if (Array.isArray(entries)) {
    return entries.map(({ find, replacement }) => {
      return new Entry(find, replacement);
    });
  }

  return Object.entries(entries).map(([find, replacement]) => {
    return new Entry(find, replacement);
  });
}

export { alias };
