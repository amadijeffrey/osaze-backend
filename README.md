# Osaze Backend API

These endpoints are for a web application that allow customers to place orders or purchase already made clothings.
BaseURL: https://osazebackend.vercel.app
Apart from the signup and login request, you need to pass bearer token as a header in every request for authentication.

set up node envitonment type and othe env variables found in ./config.js

## Customer endpoints

### Signup
Request verb: POST,  url: {BaseUrl}/api/customer/signup, body: { firstName, lastName, password, email, phoneNumber, country, state, houseAddress, city  }

### Login
Request verb: POST,  url: {BaseUrl}/api/customer/login, body: { email, password }

### Request Password Reset
Request verb: POST,  url: {BaseUrl}/api/customer/forgotpassword, body: { email }

### Reset Password
Request verb: PATCH, url: {BaseUrl}/api/customer/resetpassword/:token, body: { password }

### Update Password For LoggedIn User
Request verb: PATCH, url: {BaseUrl}/api/customer/updatepassword, body:  { newPassword }

### Update Account Details for LoggedIn User 
Request verb: PATCH, url: {BaseUrl}/api/customer/updateaccount, body: { firstName,lastName, phoneNumber, houseAddress, country, city, state }

### Update Body Profile
Request verb: PATCH, url: {BaseUrl}/api/customer/updatebodyprofile, body : { any updated field sent }

### Get profile
Request verb: GET,   url: {BaseUrl}/api/customer/getProfile

### Get order details
Request verb: GET,   url: {BaseUrl}/api/customer/order/:id

### Get all orders for a customer
Request verb: GET,   url: {BaseUrl}/api/customer/orders

### Add product To Cart
Request verb: POST,  url: {BaseUrl}/api/customer/cart/add, body: { name, image, price, size, qty, brandName, currency, custom, customDesign, fabric }

### Cart Checkout
Request verb: POST,  url: {BaseUrl}/api/customer/cart/checkout, body: {reference(gotten from paystack payment)}

### Update Cart Item
Request verb: PATCH,  url: {BaseUrl}/api/customer/cart/:id, body: {qty}

### Remove Cart Item
Request verb: PATCH,  url: {BaseUrl}/api/customer/cart/:id

## Designer Endpoints

### Signup
Request verb: POST,  url: {BaseUrl}/api/designer/signup, body: { firstName, lastName, password, email, phoneNumber, houseAddress, state, city, country,  brandName, brandInfo, brandLocation, sketch, sew, businessPage, sketchSkill, sewSkill }

### Login
Request verb: POST,  url: {BaseUrl}/api/designer/login, body: { email, password }

### Request Password Reset
Request verb: POST,  url: {BaseUrl}/api/designer/forgotpassword, body: { email }

### Reset Password
Request verb: PATCH, url: {BaseUrl}/api/designer/resetpassword/:token, body: { password }

### Update Password For LoggedIn User
Request verb: PATCH, url: {BaseUrl}/api/designer/updatepassword, body:  { newPassword }

### Update Account Details for LoggedIn User 
Request verb: PATCH, url: {BaseUrl}/api/designer/updateaccount, body: { firstName,lastName, phoneNumber, houseAddress, country, city, state }

### Get profile
Request verb: GET,   url: {BaseUrl}/api/designer/getProfile

### Update Business Info
Request verb: PATCH,   url: {BaseUrl}/api/designer/updatebusinessinfo, body: { any updated field sent }

### Create A Product
Request verb: POST,   url: {BaseUrl}/api/designer/updatebusinessinfo, body: { name, category, description, price, subCategory, sizes, customization }

### Get All Placed Orders by Customers
Request verb: GET,   url: {BaseUrl}/api/designer/requests


## Product Endpoints

### Get Products Under A Category
Request verb: GET,   url: {BaseUrl}/api/products/category?category=(specify category here)

### Get Product Details
Request verb: GET,   url: {BaseUrl}/api/products/:id

### Get Featured Products
Request verb: GET,   url: {BaseUrl}/api/products/featured

### Search for a Product
Request verb: GET,   url: {BaseUrl}/api/products/search?name=(specify name here)




