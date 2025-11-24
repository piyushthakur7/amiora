import { CATEGORY_BUCKETS } from "./categoryBuckets";

export type CategoryBucketKey = keyof typeof CATEGORY_BUCKETS;

export function mapCategory(rawName: string) {
  if (!rawName) return null;

  const name = rawName.trim().toLowerCase();

  const buckets = Object.keys(CATEGORY_BUCKETS) as CategoryBucketKey[];

  for (const bucket of buckets) {
    const matches = CATEGORY_BUCKETS[bucket];

    if (matches.some((m: string) => name.includes(m))) {
      return bucket;
    }
  }

  return null;
}
