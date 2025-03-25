import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

// Serve static files from the Frontened directory
app.use(express.static(join(__dirname, 'Frontened')));

// Handle all routes
app.get('*', (req, res) => {
    // If requesting a page HTML directly, serve it from pages directory
    if (req.path.endsWith('.html') && req.path.startsWith('/pages/')) {
        const filePath = join(__dirname, 'Frontened', req.path);
        res.sendFile(filePath);
    } else {
        // For all other routes, serve the main index.html
        res.sendFile(join(__dirname, 'Frontened', 'index.html'));
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 