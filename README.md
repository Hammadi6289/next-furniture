# NextJS Tailwind Ecommerce website for a Furniture Showroom
![catalogues](https://github.com/Hammadi6289/next-furniture/assets/87120251/3b3758b8-35f8-4397-91fe-932910ffb961)
![dashboard](https://github.com/Hammadi6289/next-furniture/assets/87120251/ba10e9eb-5f44-4a2d-9b7d-11a53529bfcf)
![heroNav](https://github.com/Hammadi6289/next-furniture/assets/87120251/232c0855-25f8-4c62-a40b-98280c19311d)
![orderHistory](https://github.com/Hammadi6289/next-furniture/assets/87120251/c636ef7f-9875-477a-807a-cd8040bbe237)
![searchButton](https://github.com/Hammadi6289/next-furniture/assets/87120251/92e67d4f-1804-4d0d-aa92-7daa4df0e546)
![signup](https://github.com/Hammadi6289/next-furniture/assets/87120251/d96f96f3-755e-478d-a626-1168db3dba61)
![users](https://github.com/Hammadi6289/next-furniture/assets/87120251/0aa65fc2-c094-4a12-8935-784aef65120a)

## Actions

1. Create Next App.
2. Create Website Layout
   1. create layout component
   2. add header
   3. add main section
   4. add footer
   5. add tailwind classes
3. List Products
   1. add data.js
   2. add images 915 x 915 (jpg)
   3. render products
4. Create Product Details
   1. create product page
   2. create 3 columns
   3. show image in first column
   4. show product info in second column
   5. show add to cart action on third column
   6. add styles
5. Handle Add To Cart
   1. define react context
   2. define cart items state
   3. create addd to cart action
   4. add reducer
   5. create store provider
   6. handle add to cart button
6. Create Cart Page
   1. create cart.js
   2. use context to get cart items
   3. list items in cart items
   4. redirect to cart screen after add to cart
7. Update Quantity In The Cart
   1. add select box for quantity
   2. handle select box change
8. Save Cart Items
   1. install js-cookie package
   2. save and retreive cart items in cookies
9. Create Login Form

   1. install react hook form
   2. create input boxes
   3. add login button

10. Connect To MongoDB
    1. install mongoose
    2. install mongodb or use mongodb atlas
    3. save connection url in .env file
    4. create db utils file
    5. create sample users
11. Create Login API
    1. install next-auth
    2. create nextauth.js
    3. implement signin
    4. use signin in login form
12. Add User Menu
    1. check user authentication
    2. install headlessui
    3. show user menu
13. Create Shipping Screen
    1. display address fields
    2. save address in context
14. Create Payment Method Screen
    1. dispaly payment methods
    2. save payment method in context
15. Seed sample products
    1. insert sample products to mongodb
    2. load products from db in home and product screen
    3. check product count in stock in add to cart
16. Load Products MongoDB
    1. load products in home page from mongodb
    2. load products in product page from mongodb
    3. use product api to check count in stock in add to cart
17. Create Place Order Screen
    1. display shipping address
    2. display payment method
    3. display order items
    4. implment create order
18. Create Order Screen
    1. implement backend api for order details
    2. load order data from backend
    3. display order details
19. Create Register Screen
    1. add signup api
    2. create new account page
    3. call api on form submit
    4. Update UI part
20. PayPal API integration
    1. add paypal button
    2. handle payment
    3. create backend api
    4. update order state
21. Create Order History Screen
    1. create order history api
    2. create order history component
    3. fetch orders and display them
22. Update User Profile
    1. create profile screen
    2. show user info
    3. handle update user info
23. Create Admin Dashboard
    1. Create Admin Menu
    2. create dashboard screen
    3. Implement admin summary api
24. List Orders For Admin
    1. create orders page
    2. create orders api
    3. use api in page
25. List Products For Admin
    1. create products page
    2. create products api
    3. use api in page
26. Create Product Edit Page
    1. create Product edit page
    2. create api for product
    3. show product data in form
27. Create And Delete Products
    1. add create product button
    2. build new product api
    3. add handler for delete
    4. implement delete api
28. List Users For Admin
    1. create users page
    2. create users api
    3. use api in page
29. Create And Delete Users
    1. add create User button
    2. build new User api
    3. add handler for delete
    4. implement delete api
30. Add Carousel
    1. create featured products
    2. feed carousel data
    3. show popular products
31. Create Search Page
    1. create filters
    2. list products
    3. show filters
