const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

// API endpoint to fetch data
app.get('/data-api', async (req, res) => {
  try {
    // Fetch data from the public API
    const response = await axios.get('https://api.publicapis.org/entries');
    const { entries } = response.data;

    // Apply filtering options
    let filteredData = entries;

    // Filter by category if specified
    const category = req.query.category;
    if (category) {
      filteredData = filteredData.filter(api => api.Category.toLowerCase() === category.toLowerCase());
    }

    // Limit results if specified
    const limit = req.query.limit ? parseInt(req.query.limit) : entries.length;
    filteredData = filteredData.slice(0, limit);

    res.json(filteredData);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
