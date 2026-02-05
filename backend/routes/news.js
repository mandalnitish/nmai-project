import express from "express";
import { fetchAndStoreNews } from "../services/newsdataService.js";

const router = express.Router();

/* ================= MANUAL NEWS SYNC ================= */
router.post("/sync", async (req, res) => {
  try {
    await fetchAndStoreNews();
    res.json({
      success: true,
      message: "News synced successfully",
    });
  } catch (err) {
    console.error("NEWS SYNC ERROR:", err);
    res.status(500).json({
      success: false,
      message: "News sync failed",
    });
  }
});

export default router;
