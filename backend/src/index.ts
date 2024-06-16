import app from './app.js';

const port = process.env.PORT || 8001;

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
