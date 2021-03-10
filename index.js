const express = require('express') //đi vào thư mục node_modules để tải thư viện express trả về function
const app = express() // gọi tới function express() trả về đối tượng đại diện cho ứng dụng nodejs để có thể xây dựng website
const port = 3000 // cổng chạy website

// route
app.get('/', (req, res) => {
    res.send('Hello World!')
})

//127.0.0.1 - localhost
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})