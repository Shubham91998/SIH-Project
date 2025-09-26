const express = require("express");
const router = express.Router();

// Example vaccination report API
router.get("/report", async (req, res) => {
  try {
    // Example static data (replace with DB query later)
    const report = {
      total: 120,
      byType: [
        { _id: "Covaxin", count: 50 },
        { _id: "Covishield", count: 70 },
      ],
    };

    res.json(report);
  } catch (err) {
    console.error("Error fetching report:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
