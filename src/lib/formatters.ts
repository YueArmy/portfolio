export function parseTechStack(json: string): string[] {
  try {
    const parsed = JSON.parse(json);
    if (Array.isArray(parsed)) return parsed;
    return [];
  } catch {
    return [];
  }
}

export function serializeTechStack(tags: string[]): string {
  return JSON.stringify(tags);
}

export function techStackFromInput(input: string): string {
  const tags = input
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean);
  return serializeTechStack(tags);
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
