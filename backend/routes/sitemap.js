import express from "express";
import Article from "../models/Article.js";

const router = express.Router();

router.get("/sitemap.xml", async (req, res) => {
  try {
    const baseUrl = "https://www.nmai.in";

    const articles = await Article.find(
      { status: "published" },
      "slug updatedAt publishDate"
    ).sort({ publishDate: -1 });

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

    // Static pages
    const staticPages = [
      "",
      "/current-affairs",
      "/mcq-practice",
      "/daily-quiz",
      "/about-us",
      "/contact-us"
    ];

    staticPages.forEach(page => {
      xml += `
  <url>
    <loc>${baseUrl}${page}</loc>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>`;
    });

    // Dynamic articles
    articles.forEach(article => {
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

  } catch (err) {
    console.error(err);
    res.status(500).end();
  }
});

export default router;
