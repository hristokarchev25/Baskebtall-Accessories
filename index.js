const express = require('express');

const config = require('./config/config');

const app = express();

require('./config/express')(app);
require('./config/mongoose')(app);




app.listen(config.PORT, () => console.log(`Server is running on port ${config.PORT}...`));