export const CATEGORY_ORDER: Record<string, number> = {
  Terrain: 1,
  Geospatial: 2,
  'Technical Art': 3,
  'Data Visualization': 4,
  Medical: 5,
  Algorithmic: 6,
  'Indie Game': 7,
  Rest: 8
}

export const getCategoryOrder = (categories?: string[]): number | undefined => {
  const primaryCategory = categories?.[0]
  if (!primaryCategory) return undefined

  return CATEGORY_ORDER[primaryCategory]
}
