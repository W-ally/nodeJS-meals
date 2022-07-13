const { app } = require('./app');

const { initModels } = require('./models/initModels');

// Utils
const { db } = require('./utils/database');

// Authenticate database credentials
db.authenticate()
  .then(() => console.log('Database authenticated'))
  .catch(err => console.log(err));

// Establish model's relations
initModels();


// Sync sequelize models
db.sync()
  .then(() => console.log('Database synced'))
  .catch(err => console.log(err));

// Spin up server
const PORT = process.env.PORT || 4100;

app.listen(PORT, () => {
  console.log(`Express app running on port: ${PORT}`);
});
