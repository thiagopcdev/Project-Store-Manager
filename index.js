const express = require('express');
const error = require('./middleware/error');

const app = express();
app.use(express.json());

const PORT = 3000;

app.get('/', (_request, response) => {
  response.send();
});

app.use(require('./controller/root'));

app.use(error);

app.listen(PORT, () => { console.log(`Running on port ${PORT}`); });
