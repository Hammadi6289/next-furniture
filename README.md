# NextJS Tailwind Ecommerce website for a Furniture Showroom

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
    2. create register page
    3. call api on form submit
