'use strict';

const TOKEN_PATTERN = /{([^{}]+)}/g;

function tokens(text: string): string[] {
  const match = text.match(TOKEN_PATTERN);
  if (!match) {
    return [];
  }
  return match.map(i => i.substring(1, i.length - 1));
}

export = tokens;
