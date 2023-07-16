const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const groupRoutes = require("./routes/group");
dotenv.config();
app.use(cors())
app.use(express.json());
const port = 8000

app.use('/api/auth', authRoutes)
app.use('/api/groups', groupRoutes)
app.use('/api/user', userRoutes)

app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})