export type PortfolioItem = {
  title: string
  subtitle?: string
  role?: string
  year?: string
  tags?: string[]
  cover: string     // path under /public
  video?: string    // optional mp4/webm path under /public
  videoEmbed?: string // optional embed URL (e.g. YouTube)
  url?: string      // external link or internal route
  description?: string
};

export const allPortfolioItems: PortfolioItem[] = [
  {
    title: "Platformer Kit",
    subtitle: " ",
    tags: ["", "", ""],
    cover: "/portfolio/unity-asset-platformer-kit-01.png",
    url: "https://assetstore.unity.com/packages/3d/environments/lowpoly-platformer-kit-free-modular-stylized-blocks-319018", // or external if you prefer
    description:
      ""
  },
  {
    title: "Sci-Fi Lab Kit",
    subtitle: " ",
    tags: ["", "", ""],
    cover: "/portfolio/unity-asset-scifi-lab-kit-01.png",
    url: "https://assetstore.unity.com/packages/3d/environments/sci-fi/sci-fi-lab-kit-modular-stylized-low-poly-environment-assets-324212",
    description:
      ""
  },
];
