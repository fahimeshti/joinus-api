const express = require('express');
const studentRoutes = require('./src/student/routes');
var cors = require('cors')

const app = express();
app.use(cors())
const port = 3000;
app.use(express.json())


app.get('/', (req, res) => {
    res.send("Server is running...")
})
app.use('/api/v1/students', studentRoutes);



app.listen(port, () => console.log(`app listening on port ${port}`));