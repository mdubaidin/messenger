import app from './app.js';

const port = 8000;

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
