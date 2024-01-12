const fs = require('fs');
const path = require('path');
const send_siteMap = (req, res) => {
    const sitemapPath = path.join(__dirname, '../siteMap/sitemap.xml');
  
    // Check if the sitemap file exists
    if (fs.existsSync(sitemapPath)) {
      // Set the appropriate Content-Type
      res.header('Content-Type', 'application/xml');
  
      // Send the file
      fs.createReadStream(sitemapPath).pipe(res);
    } else {
      // Sitemap file not found
      res.status(404).send('Sitemap not found');
    }
  }
  module.exports = {
    send_siteMap
  }