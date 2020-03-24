const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const weather = require("./weather");
const resource = require("./weather/resource");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get('/weather', weather.index);

app.listen(80, function () {
    console.log('Weather app listening on port 80!');

    resource.get()
        .then(() => {
            const oneDayInMs = 86400000;
            setInterval(() => weather.get(), oneDayInMs);
        });
});