'use strict';
const express = require('express');
const app     = express();

app.get('/', (req, res) => {
  
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const languages = req.acceptsLanguages();
  const language = languages.length > 0 ? languages[0]: '';
  const software = req.headers['user-agent'].match(/\(([^\(\)]+)\)/)[1];

  const data = {ip,language,software};

  res.send(JSON.stringify(data));
});

const listen_port = process.env.PORT || 8080;
app.listen(listen_port, ()=> {
  console.log('app listening on port '+listen_port);
});
