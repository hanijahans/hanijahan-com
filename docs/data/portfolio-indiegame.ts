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
    title: "World Lattice",
    subtitle: " ",
    tags: ["Game Dev", "", ""],
    cover: "/portfolio/worldlattice-01.png",
    url: "https://hanijahan.itch.io/worldlattice", // or external if you prefer
    description:
      ""
  },

];
