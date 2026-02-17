import express from "express";
import Article from "./models/Article.js"; // adjust path if needed

const router = express.Router();

router.get("/sitemap.xml", async (req, res) => {
  try {
    const baseUrl = "https://www.nmai.in";

    // Fetch published articles
    const articles = await Article.find(
      { status: "published" },
      "slug updatedAt publishDate"
    ).sort({ publishDate: -1 });

    // Static pages
    const staticPages = [
      "",
      "/current-affairs",
      "/mcq-practice",
      "/daily-quiz",
      "/about-us",
      "/contact-us",
    ];

    // Generate XML
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Static URLs
    staticPages.forEach((page) => {
      xml += `
  <url>
    <loc>${baseUrl}${page}</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`;
    });

    // Article URLs
    articles.forEach((article) => {
      xml += `
  <url>
    <loc>${baseUrl}/article/${article.slug}</loc>
    <lastmod>${new Date(
      article.updatedAt || article.publishDate
    ).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`;
    });

    xml += `
</urlset>`;

    res.header("Content-Type", "application/xml");
    res.send(xml);
  } catch (error) {
    console.error("Sitemap error:", error);
    res.status(500).end();
  }
});

export default router;
