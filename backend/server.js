const express = require('express')
const mongoose = require('mongoose')

//import routes
const userRoutes = require('./router/user')
const brandRoutes = require('./router/brand')
const categoryRoutes = require('./router/category')
const subCategoryRoutes = require('./router/subCategory')
const productRoutes = require('./router/product')
const itemRoutes = require('./router/item')
const storeRoutes = require('./router/store')
const storeTransRoutes = require('./router/storeTransaction')
const cartItemRoutes = require('./router/cartItem')
const cartRoutes = require('./router/cart')
const orderRoutes = require('./router/order')
const orderItemRoutes = require('./router/orderItem')

//configurations
const cors = require('cors')
require('dotenv').config()


//creating express app
const app = express()

//middleware
app.use(express.json())
app.use(cors())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/user', userRoutes)
app.use('/api/brand', brandRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/subCategory', subCategoryRoutes)
app.use('/api/product', productRoutes)
app.use('/api/item', itemRoutes)
app.use('/api/store', storeRoutes)
app.use('/api/storeTransaction', storeTransRoutes)
app.use('/api/cartItem', cartItemRoutes)
app.use('/api/cart', cartRoutes)
app.use('/api/order', orderRoutes)
app.use('/api/orderItem', orderItemRoutes)

//mongo connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('connected and listen to port: ', process.env.PORT)
        })
    }).catch((error) => {
        console.log(error)
    })