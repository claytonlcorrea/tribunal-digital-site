import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

const SITE_URL = "https://tribunaldigital.com.br";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  return [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/noticias`, changeFrequency: "weekly", priority: 0.8 },
    ...posts.map((post) => ({
      url: `${SITE_URL}/noticias/${post.slug}`,
      lastModified: post.frontmatter.date,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
