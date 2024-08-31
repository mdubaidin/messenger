import server from './app.js';

const port = process.env.PORT || 8001;

server.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
