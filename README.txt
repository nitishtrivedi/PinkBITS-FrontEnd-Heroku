Day 1 - Code Restructuring (v 0.1)

Covered Lectures 1-22 on Udemy. Upto creation of models and routers for all 4 databases.
Latest commit for Day one: Change #3: Version 0.1

EOD


ADMIN USER ID AND password

    "name": "Nitish Trivedi"
    "email": "nitish@pinkbits.com"
    "password": "pinkbits123",

NON ADMIN USER ID AND PASSWORD

        "name": "Nitish Trivedi USER",
        "email": "nitish-nonAdmin@pinkbits.com",
        "password": "pink123"

------------------------------------------------------------------------------------------------------------------------------------




Day 2 - Code Restructuring (v 0.2)

Created new repo at C/Users/Nitish/Documents/GitHub/e-comm-app
Starting lecture 23. 
Installed CORS library 'npm insall cors' 
Completed Lectures 22-30. Created Categories API
Latest commit for Day Two: Commit #2: Version 0.2

------------------------------------------------------------------------------------------------------------------------------------


Day 3 - Code Restructuring (v 0.3)

Started with Lecture 31
Tip: Own APIs can be created. Follow along the comments mentioned in the router code files for more information
Completed upto Lecture 41 in Version 0.3. Created and Tested Products API lifecycle. 
Checked about all details. Also, replaced _id in metadata to id in the product schema file. This functionality needs to be implemented in all files. 
There is alot of scope of creating own APIs based on user preference. More details in the router codoes.
Cncluding Day 3
Completed Lectures 31- 41
Latest Commit for the Day Three: Commit #1: Version 0.3

------------------------------------------------------------------------------------------------------------------------------------


Day 4 - Main Start. End of Code Restructuring. Version 1.0
Starting with Users. This module had errors due to which previous app crashed.
Started with lecture number 41

------------------------------------------------------------------------------------------------------------------------------------


Day 5 - Post/Register a new user. Commit v1.1

Created POST request for Users
Imported bcryptjs library from node. Use npm install bcryptjs 
Added bcryptjs to users-router.js file
Added bcrypt related code for password hashing. Important instructions mentioned in the code.
Created GET individual request API. Added features. All details in the code comments
Created LOGIN API. Used compare password feature in the API
Created PUT Api to update user data. Created password update mechanism
Installed JWT Web Token library from node. Use 'npm install jsonwebtoken' to install
Added jsonwebtoken library to users-router.js file
Added secret_for_jwt = This-is-the-secret-answer in .env file as secret Question
jwt.sign function takes in 3 params. First is object to be returned. Second is secret key from env file and third is expiration time i.e. 1d, 1w, 1m

Created new folder called helpers and added jwt.js file. This will be used to protect APIs, and the user can access API only if the user has a valid token
Installed express-jwt library in node. Use 'npm install express-jwt' in command line
Call the express-jwt library in jwt.js file
Function     return expressJwt({
        secret,
        algorithms: ['HS256']
    })
    is used for returning the secret and encryption algorithms named HS256
Made important changes in jwt.js as per documentation of express-jwt module of node.
Error handling of authentication token.
Created error-handler.js file. Added function for custom error handling in authentication. 
End of Day


------------------------------------------------------------------------------------------------------------------------------------

Day 6 Commit V1.2

excluding 'api/v1/users/login' path from authentication, as we need it for token. """jwt.js Line number 26-32"""
{url:'/api/v1/users/products', methods:['GET', 'OPTIONS']}, // THis will exclude Products API GET and OPTIONS methods as a non registered user can only view the products.."""jwt.js Line number 28 & 29"""
Refer REGEX100.com website and research about Regular Expressions if needed."""jwt.js Line number 28-29"""
Example: {url: /\api\/v1\/products(.*)/, methods:['GET', 'OPTIONS'] }

Added functionality where with the token, we pass in isAdmin true or false.
This is to notify the front end if the logged in user is an Admin or notify.
Added functionality in users-router.js, Line number 120

Added functionality :
Added functionality where {url: /\api\/v1\/products(.*)/, methods:['GET', 'OPTIONS'] } will not be authenticated with isAdmin function, as posting and deletion is possible only for a registered user/Administrator only, and not by the customers.
This is because most of our customers will be registered users, and not all registered users can POST or DELETE products. Hence, this is an additional security feature introduced here. This is also called doing "user roles in Node".
Added code in jwt.js, where isRevoked method is used. """jwt.js Line number 13""".
Then we create a function called isRevoked, where the isRevoked on Line 13 is declared as a function. """jwt.js Line number 39-49"""
async function isRevoked (req, payload, done). Here, the "req" is when we want to use request params send by the user, want to know what the user is sending
Payload contains data within the token. Ex: isAdmin


!!!!!!! THere is an error in jwt.js line 45, which says TypeError: done is not a function !!!!!!!!
!!!!!!! NEED TO FIX. EOD 18/7/22 !!!!!!!!

------------------------------------------------------------------------------------------------------------------------------------

Day 7: Commit v1.3

Fixed error in jwt.js. Made modifications to the code. In the lecture 52, some code is incorrect, of which changes are made in the jwt.js file. 

User.countDocuments() method is also modified in GET/COUNT API for users.

Added Delete user functionality and get user count.
Completed with Admin/Non Admin functions, and completed securing APIs with token.

Starting with Section 7: BACKEND FOR ORDERS

Created order schema in order-model.js 
Created new file orderItems-model.js
Interlinked order Items in order schema. Interlinked product ID with orderitems schema.

SHort session. EODCommit v1.3 done

------------------------------------------------------------------------------------------------------------------------------------

Day 8 - Orders and orderItems API - Commit v1.4

Create GET request in Orders
.populate('user', 'name email') - Populates user details. This method populates name and email of the user who created the order. More params can be added and deleted here
.sort({'dateOrdered': -1}) - This methods sorts the orders {'dateOrdered': -1 } means that the sorting must be from NEWEST TO OLDEST

Create GET by ID request in orders
Similar to GET method, but sort is removed
Populate for user remains the same
Here, we add a new method. .populate({path: 'orderItems', populate: 'product'});
.populate({path: 'orderItems', populate: 'product'}); - This method takes a path, which is an array for eg: orderItems, and pulls a specific and common params from all objects in the array. For eg: Products is present in all order Items, and we need Product details as well to be populated. Hence, this method.
In order to populate more options, for eg: categories in our case, we can choose a common param which has ID, and populate that as well.
Code will be .populate({path: 'orderItems', populate:{path: 'product', populate:'category' }});


Create Orders POST request.
Created reference to orderItems in the orders, as the order must contain the items that are ordered by the user.
Created Promise based return, and created orderItemsIdsResolved, to store the completed promise.
Created mechanism for calculating the totalPrice of the products, from orderItems schema and reference

EOD for today. Will continue with deletion of order and updating the order status

------------------------------------------------------------------------------------------------------------------------------------

Day 9 - Updating and Deleting orders and orderItems. Commit v1.5

Created API for updating the order. Only the status of the order can be updated, once the order is recorded in the system. Hence, update works only for updating the order status. The '/:id' is used to update the order

Created an API to delete the order. This API will delete the order based on order IDs.
Delete API will also delete the underlying orderItems in the product.

Added a feature to count the total price in the order. Total price will be calculated by taking the "price" from the product and displayed as a total price in the orders Section

Added API to get the total count of orders in the Order Bucket.

Added API to fetch User specific orders only.

Added API to get the total sales made for ADMIN Panel only. 

END of ORDERS API Section

Future Scope: Need to develop API for getting count of orders based on User ID. That means, we need to count number of orders a specific user have placed. UPDATE. Feature ADDED..!

------------------------------------------------------------------------------------------------------------------------------------

Day 10: Uploading documents on server (Images for products, and all documents in general). Commit v2.0

Main Steps:
1. Install Multer Library in NodeJS
2. Find out the best configuration for eShop
3. Destination and Uploaded file names
4. Use Postman to Test Image Uploaded
5. Validating file type that has been Uploaded
6. Product Gallery in case of Multiple images uploaded for a specific product
7. Fetching products with main image and gallery images paths

Install MULTER library. Run 'npm install multer' in command line. Documentation: https://www.npmjs.com/package/multer

!!!!!! Documentation Pending !!!! 


------------------------------------------------------------------------------------------------------------------------------------

****************************       STARTTING WITH FRONTEND *************************

------------------------------------------------------------------------------------------------------------------------------------

Day 1 of FRONTEND. Commit v3.0

Created new repository on GitHub. Repo name "e-comm-app-full".
Credentials are as follows:

UserID: nitishtrivedi
Pass: Pinky@2603
Default Branch: master

The entire code is in the default Branch.

The new repository consists of the backend and the frontend code. Hence, created new repo.

FRONTEND ESSENTIAL INSTALLATIONS:   
1. Install Angular JS:
    To install Angular, we need to run command "npm install -g @angular/cli" on the terminal. This can be found at https://angular.io/cli.
    As Angular is a global library, it must be installed on the system, just like NodeJS. More commands for Angular can be found on website. Refer Lecture 80.

2. Install NX:
    NX is a global library, which is installed on top of Angular. We have added NX library in the repository, and not in the system, because we are using version control for our application.
    NX is used for simplification of execution of Angular Commands. 
    Features of NX include common library sharing across all our applications, unit testing etc. Libraries such as Node Libraries etc need to be individually installed everytime. They can simply be shared using NX
    To install NX, run the command "" on terminal. This can be found at https://nx.dev/#getting-started.
    This took around 10 minutes on my laptop for installation. Refer lecture 82 for more.

3. Create NX Workspace:
    To create NX workspace, run command "npx create-nx-workspace --preset=angular" on terminal. 
    It will ask for a lot of options. Refer to nx related screenshot in the documents
    
4. Create new ADMIN App in the workspace.
    To create a new application, we need to run nx g ""@nrwl/angular:app appName"" command in Angular Terminal
    !!! NOTE. WE ARE USING CMD FOR ANGULAR AND VSCODE TERMINAL FOR NODE COMMANDS, BECAUSE BOTH RUN IN DIFFERENT DIRECTORIES !!!
    Created an app named e-comm-app-admin for admin Panel
    Changed Compiler options tsconfig.json for both the apps. Set all options to false
    
EOD For Day 1 Commit v3.0

------------------------------------------------------------------------------------------------------------------------------------

Day 2 - Commit v3.1

Creation of Application Level Components.

1. Started with creation of application level components. Creating the HomePage for the E-COMM-APP-USER application.
    To create a component, run command """nx g component pages/home-page --project=e-comm-app-user""". In this command, g- Generate, pages/home-page will create a new folder in the app called pages and create home-page component in it. --project=appName means we need to specify the app in which we need to create component.

    In order to test the command before execution, use ""--dry-run"" at the end of the command.

    !!!!!!!!!!!!!!!!!!!!!!!!!!!    Use UP and DOWN arrow keys to choose previous commands in CLI   !!!!!!!!!!!!!!!!!!!!!!!!!!!


2. After the component is created, we need to head to "apps\e-comm-app-user\src\app\pages\home-page\home-page.component.ts" OR Page specific .ts file , and Under @Components, you can see parameters. "selectors" is used to call in the component.html file of the main root page.ie. ""app.component.html""

**********    ROUTING   ***************

Application Level Routing

Routing or Routers are used for routing of pages. "example.com/" will be the HomePage and "example.com/product-list" will be Products List page. 

For this, need to go to "apps\e-comm-app-user\src\app\app.module.ts" and in @NgModule, in "imports", add "RouterModule", or modify as shown below:
  const routes: Routes = [
        { path:'', component: HomePageComponent },
        { path: 'product-list', component: ProductListComponent }
    ]
  
  imports: [BrowserModule, RouterModule.forRoot(routes)]

  By using above, we can add custom routes, and import Components of those pages.

  End of Day 2 at Routing, Lecture 86. Committed changes


!!!!!   IMPORTANT. NODE MODULES IS IN .gitignore. In order to sync node modules on Repo, remove "dependencies: node_modules" option !!!!!!!
  ------------------------------------------------------------------------------------------------------------------------------------

Day 3: Creating Headers, Footers. ESLint Configuration to avoid errors. NX Extension for VS Code
Commit v3.1

1. Adding Headers and Footers:

    Headers and Footers will remain common across the entire application. Hence, we create these components in a folder called as "shared". Here, we place files which will be required commonly in the entire application. 
    We created 2 components, using the command for creating the NX components. i.e. nx g component shared/header --project=e-com-app-user for HEADERS and nx g component shared/footer --project=e-com-app-user for FOOTERS

    We then find the created components. We can call them in the ROOT app.component.html file, with their selectors.

    In order to create more specific selectors, we edit the .eslintrc file on app level. 
    We search for "rules" in Directive and Component rules, we change the ""prefix"" for both the rule sets. By default, the Organization Name is selected.

    We then add the below mentioned rules after the [] end of "rules":
        "no-empty-function": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@angular-eslint/no-empty-lifecycle-method": "off"

    These errors will avoid errors in the file with empty declarations etc. Multiple rules can be added to bypass ESLinting rule set.

    We then installed NX Extension for VS Code. This extension saves hassle of remembering console commands, and can easily execute NX commands with a simple GUI. Refer screenshot "NX-extension-image".

    End of Commit v3.1 and Section 10. Starting with Section 11.

Commit v3.1 DONE. 


------------------------------------------------------------------------------------------------------------------------------------

Creating Shared Libraries. Commit v3.2

We create libraries which will be shared across all of our applications. By doing this, we do not need to create libraries for each application individually.

To do this, we write the following command in the terminal. This is the format, we can change it as per our naming.

        Command:        npx nx g @nrwl/workspace:lib libraryName --dry-run (for testing the command)
                        npx nx g @nrwl/workspace:lib libraryName (Main Command)

For creating UI component, our command is: 
            npx nx g @nrwl/workspace:lib userInterface-shared-lib

Here, the UI library is created under "lib" folder on global level. This folder holds our libraries which will be shared across applications. 

Use above command for generation of library. 
For customised experience and faster execution, use NX Extension. Modify the below mentioned options:
            1. Name
            2. Check "buildable"
            3. Select a prefix similar to Name

Generate the Users, Products, and Orders library using above steps. Refer lecture 92.

SESSION PAUSED. COMMIT v3.2.1 done. REWATCH SECTION 11 FROM BEGINNING

CONTINUE FROM LECTURE 93

CONTINUE FROM LECTURE 96 Commit v 3.2.2
------------------------------------------------------------------------------------------------------------------------------------

Commit v3.3.1 (Admin Panel Development Commit v3.3)

https://www.primefaces.org/primeng/setup

Refer to following:
Accordian in primeng
PrimeFlex Grid system
PrimeIcons

Documentation pending for Commits v3.2 and 3.3
Documentation pending from lectures 91 to 103

------------------------------------------------------------------------------------------------------------------------------------

Commit v3.3.2 - Creating SideBar for Admin Dashboard.

Documentation Pending for 103 to 108

Created Admin Panel Sidebar. 

Commit v3.3.2 done.
------------------------------------------------------------------------------------------------------------------------------------
Commit v3.3.3 - Admin Categories Panel

Cards PrimeNG Link: https://primefaces.org/primeng/card

PrimeFlex CSS Link: https://www.primefaces.org/primeflex/margin

Covered Until Lecture 115. 
DOCUMENTATION IS PENDING FOR THE ENTIRE FRONTEND. NEED TO COMPLETE ASAP

Commit v3.3.3 Release 2: Done. Pending Edit Categories onwards

------------------------------------------------------------------------------------------------------------------------------------

Commit v 3.3.3 Release 3: Update Categories in Frontend

Created methods and functions which talk to backend to update categories. Detailed Documentation pending
Editing or updatation of categories was done successfully. 
Refer Lecture number 116 for documentation.

Commit v 3.3.3 Release 3: Create Color Picker for categories in Frontend

FEATURE TO BE ADDED IN v3.3.3 Release 3: https://primefaces.org/primeng/table/state
This is for filtering categories based on Name the user adds

EOD for Commit v3.3.3 Release 3: Update Categories
Topics Covered
Edit/Update category
Build logics and APIs for Editing and Updating Categories based on parsing the Category ID
Implemented Color Picker for Categories
Created Environment Variables to Define Routes for Dev and Prod Environments on Global Level.
Configured Settings for the same. 
Detailed Documentation is pending for lectures 116 to 120 for Commit v3.3.3 Release 3.

COMPLETE DOCUMENTATION FOR ADMIN PANEL FRONTEND IS PENDING.

Commit v3.3.3 Release 3 Done on GitHub.
EOD.

------------------------------------------------------------------------------------------------------------------------------------

Commit v 3.3.4 - Products and Products form

FULL DOCUMENTATION PENDING. Covered Section 15 Lectures 122 -130.
Commit v3.3.4 Release 1 - Creating New Product done.

Done with Commit v3.3.4 Products Admin Panel FrontEnd and linking to backend to perform all operations. 
DOCUMENTATION PENDING. Need to document for entire Section 16

Commit v3.3.4 - Products FrontEnd FULL DONE


------------------------------------------------------------------------------------------------------------------------------------

Commit v 3.3.5 - Users and Users form

FULL DOCUMENTATION PENDING. Section 16 completed. Assignment submission pending for Section 16.
Commit Done.

------------------------------------------------------------------------------------------------------------------------------------

Commit v 3.3.6 - Order List and Order Details Admin Panel

Section 17. FULL DOCUMENTATION PENDING

Commit v3.3.6 Release 1 - Completed with Orders List component. All functions working. Check for UI Changes

Commit v3.3.6 DONE. DOCUMENTATION PENDING

Issue: Delete button Confirmation Service NOT WORKING AS EXPECTED. Check GitHub Issues For More details

------------------------------------------------------------------------------------------------------------------------------------

Commit v3.3.7 - LOGIN and LOGIN functions

DOCUMENTATION PENDING. Section 18

Commit v3.3.7 Release 1: Login Page Development Done with Error Validating Function working. NEED TO WORK ON DESIGN OF PAGE


Commit v3.3.7 Release 2: Development of Token Storage mechanism and User authentication.
DOCUMENTATION PENDING. Refer Section 18 Lectures 152 for documentation.

https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage - For Local Storage
https://developer.mozilla.org/en-US/docs/Web/API/atob - For Decrypting the Token

COMPLETED WITH THE ENTIRE ADMIN PANEL. Completed with LOGIN and LOGOUT Functions with ZERO Open Errors. Good Job..!

Commit v3.3.7 - Login and Authentication 

------------------------------------------------------------------------------------------------------------------------------------

Commit v3.3.8 - Admin Dashboard Component

Completed with Admin Dashboard Component. DOCUMENTATION PENDING
Refer Section 19 for DOCUMENTATION.

Commit Done as all functions working fine.
This code marks the END OF ADMIN PANEL

UI/ UX can be modified as per our wish.
Next up is refactoring and starting with the User Application in FRONTEND. Next Commit will be version 4 of the application


GOOD JOB..!!!!!!!

------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------
------------------------------------------------------------------------------------------------------------------------------------

Commit Version v4.0.0 - PinkBITS Main WebSite (User Panel)

Starting with Section 21 - User Panel Application

Commit 1 made. Started with Section 21. 
Designed Header and Banner Components

Logo and Icons are a part of Header Component, whereas Search Bar and Menu has different components. Search is a shared component, and connected to Products Component.

Commit v4.0.0 Release 1 done. Initial styling of header

Installed FontAwesome using ""npx nx g @fortawesome/angular-fontawesome:ng-add"" command
This command gives options so can install more icons and features when needed

Commit v4.0.0 Final Release - Home Page. Completed.
DOCUMENTATION PENDING. 

------------------------------------------------------------------------------------------------------------------------------------

Commit v4.0.1 - Creating Products Page, Filtering mechanism using Categories and enabling Categories Banner

Refer to lectures 177 - 179 for more details
Created Product List Page. Moved Product List page to Products Shared Library, amking it a reusable component
Added Filtering mechanism to Product list page, where if a user selects a specific category, products of only that/those categories will be displayed.
Modified behaviour of Categories Banner component on homepage, in which if the user clicks on the Category name, the user will be redirected to Products List page, and products of only that category will be displayed.

Detailed DOCUMENTATION PENDING.

Commit v4.0.1 done.

------------------------------------------------------------------------------------------------------------------------------------

Commit v4.0.2 - Creating Product Details Page and implementing Products Gallery Feature

Refer to lecture 180-181 for more. Detailed DOCUMENTATION PENDING

Commit v4.0.2 Release 1 was done because in Products Detail page, there was an issue. The HTML content passed in richDescription was not visible
The reason was, Angular 14 has a security feature, where it does not allow external HTML content to be displayed. More details: https://angular.io/guide/security
Bypass mechanism link is https://careydevelopment.us/blog/angular-how-to-deal-with-the-sanitizing-html-stripped-some-content-issue

Completed with Product Details Page and Products Gallery. DOCUMENTATION PENDING.

Commit v4.0.2 Done - Added some features and UI improvements in this commit as well


------------------------------------------------------------------------------------------------------------------------------------

Commit v4.0.3 - Cart and CheckOut 

Started with Cart and CheckOut Function. Section 23

Commit v4.0.3 Release 1 - Completed Add Items to Cart mechanism.
Refer to lectures 183-188 for documentation.

Commit v4.0.3 Release 2 includes design of Cart Page, etc


Commit v4.0.3 Release 2

Completed with Cart Page and Order Summary in the cart page. Added all logics to display content dynamically.
Did not follow as per the instructor. Implemented own logic in terms of design and displaying data to make to look and feel of the page more as per our brand theme
Commit v4.0.3 Release 2 DONE

Commit v4.0.3 FINAL Release- CheckOut Page and Thank You Page

Completed with checkout and Thank you page
Created Shipping details form for Checkout page, and created Button logic.
Captured Form Data in backend and called the Place Order API call in order to record an order.
No errors recorded.

Created Thank You page.

Commit v4.0.3 FINAL RELEASE Done.
DOCUMENTATION PENDING. Refer entire section number 23 for documentation.

------------------------------------------------------------------------------------------------------------------------------------

Commit v4.1 - NGRX User Sessions

This commit will add feature, which focuses on authentication of the front end panel.
This will check if the user is logged in or not. Certain actions such as placing orders and adding/editing items in the cart can be done only when the user is logged in

Completed NGRX User Sessions. No errors identified. functionality working as expected.
HUGE DOCUMENTATION PENDING. Refer Section 24 for detailed documentation

FEATURE UPGRADE REQUIRED.

Need to fix Admin Panel Login Component, as the UI/UX is disturbed. Need to plan redesign as per User application color theming.

Commit v4.1 Done

------------------------------------------------------------------------------------------------------------------------------------

Commit v4.2 - Adding a Payment Gateway to the application.

Started with Section 25. Adding a payment gateway when user tries to place an order.

Here, we will implement a payment gateway before user clicks on Place Order button. The order will be placed ONLY if the payment is successful.

We are using payment gateway called Stripe. This has multi language support and has TEST Mode.

Details of Stripe are as follows:

Links:
https://stripe.com/en-in
https://stripe.com/docs - Stripe Documentation.
https://ngx-stripe.dev/docs/installation - NGX Stripe Developers Documentation

Login Details:

Email : chiragdifferent@gmail.com
Password : Pinky@2603

USE COMMAND ""npm install ngx-stripe @stripe/stripe-js --legacy-peer-deps"" to install ngx stripe


Completed integrating payment methods on the application. Refer Stripe Documentation for TEST Mode for demonstration purposes. 

BUGS and pending features in the application:

1. Registration Page. - Need to start development of logic for the registration page component for the application. By Default, isAdmin option will be false, if the user registers from the USER APP. If added from Admin Panel, as only Admins have access, isAdmin can be toggled.

2. Enable Login / Signup component in the USER APP. 
3. Uploading array of images in Admin Panel in Products Form Component
4. Search Products Feature
5. Reducing count in stock as and when orders are placed. 


With this, we complete MAIN PHASE OF DEVELOPMENT OF THE ENTIRE APPLICATION. 
FURTHER DEVELOPMENTS WILL BE FEATURE UPGRADES AND BUG FIXES.

GOOD JOB Nitish

Commit v4.2 - Final Dev SignOff DONE.
