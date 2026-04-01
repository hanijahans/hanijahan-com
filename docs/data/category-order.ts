export const CATEGORY_ORDER: Record<string, number> = {
  Portfolio: 1,
  Terrain: 2,
  Geospatial: 3,
  'Technical Art': 4,
  'Data Visualization': 5,
  Medical: 6,
  Algorithmic: 7,
  'Indie Game': 8,
  Rest: 9
}

export const getCategoryOrder = (categories?: string[]): number | undefined => {
  const primaryCategory = categories?.[0]
  if (!primaryCategory) return undefined

  return CATEGORY_ORDER[primaryCategory]
}
