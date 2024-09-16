const express = require('express');
const router = express.Router();

router.post('/Items', (req, res) => {
    try {
        if (globalThis.ApnaKhanaItem && globalThis.ApnaKhanaCollection) {
            // Send the response as JSON with ApnaKhanaItem and ApnaKhanaCollection
            res.json([globalThis.ApnaKhanaItem, globalThis.ApnaKhanaCollection]);
        } else {
            // Return a proper error message if data is not available
            res.status(500).json({ error: "Data not available yet" });
        }
    } catch (error) {
        console.error("Error fetching global data:", error);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
