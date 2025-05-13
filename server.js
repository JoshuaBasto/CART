const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cartRoutes = require('./routes/cartRoutes');
const { swaggerUi, specs } = require('./swagger/swagger');

dotenv.config();
const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
app.use('/api/carts', cartRoutes);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(3100, () => console.log("Server running on http://localhost:3100"));
  })
  .catch(err => console.error(err));
