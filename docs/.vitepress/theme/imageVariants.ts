import { portfolioImageVariants } from '../../data/portfolio-image-variants'

export type OptimizedImageSources = {
  fallback: string
  avif?: string
  webp?: string
}

export function getOptimizedImageSources(src: string): OptimizedImageSources {
  const variant = portfolioImageVariants[src]

  return {
    fallback: src,
    avif: variant?.avif,
    webp: variant?.webp,
  }
}
