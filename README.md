# WDD3600-24-25
This code is currently the beginning stages of a website that is created using the tutorial from "Node.js - The Complete Guide" by Maximilian Schwarzmuller. This website is still in progress and is not yet complete. This code only contains chapters 24 and 25 from the online tutorials.

## Before download
This website uses React, Node.js, Express, JavaScript, HTML, and CSS, and sequelize. Before you download the files make sure you have Node.js and Express downloaded. You can get the latest version of Node.js here: https://nodejs.org/en/download/ . You can install Express by opening GitBash ( which you can download here https://git-scm.com/ ) and type ```npm install express``` then press enter. This website also uses the templating language ejs. Make sure you install that before running. You will also need to connect the code to a database. In this code I use MongoDB, however, feel free to use the database of your choice.

## To download
To download these files click on the green "Code" button and click "download ZIP". Once the files are done downloading, unzip them and open in text editor of your choice.

## To use once downloaded
To use the files, open them in the text editor of your choice. Go to the "app.js" file in the back-end and enter your database connection string in the commented area. Next, open the terminal in your code editor. If there is no terminal in the text editor you are using, you can also use GitBash. If you use GitBash, you will need to open the main folder of the downloaded files. Before you can run the app you first need to install the node_modules for the front-end and back-end. You can do this by typeing ```npm install``` in either GitBash or your terminal. Finally, you can run the app by typing ```npm start``` in GitBash or in your terminal for the back-end and front-end. The React app will then open in the browser on localhost:3000. The back-end will open in localhost:8000.

### Front-end Structure
```
public/
├─ favicon.ico
├─ index.html
├─ manifest.json
src/
├─ components/
│  ├─ backdrop/
│  │  ├─ backdrop.css
│  │  ├─ backdrop.js
│  ├─ button/
│  │  ├─ button.css
│  │  ├─ button.js
│  ├─ errorHandler/
│  │  ├─ errorHandler.js
│  ├─ feed/
│  │  ├─ feedEdit/
│  │  │  ├─ feedEdit.js
│  │  ├─ post/
│  │  │  ├─ post.css
│  │  │  ├─ post.js
│  ├─ form/
│  │  ├─ input/
│  │  │  ├─ filePicker.js
│  │  │  ├─ input.css
│  │  │  ├─ input.js
│  ├─ image/
│  │  ├─ avatar.css
│  │  ├─ avatar.js
│  │  ├─ image.css
│  │  ├─ image.js
│  ├─ layout/
│  │  ├─ layout.css
│  │  ├─ layout.js
│  ├─ loader/
│  │  ├─ loader.css
│  │  ├─ loader.js
│  ├─ logo/
│  │  ├─ logo.css
│  │  ├─ logo.js
│  ├─ modal/
│  │  ├─ modal.css
│  │  ├─ modal.js
│  ├─ navigation/
│  │  ├─ mainNavigation/
│  │  │  ├─ mainNavigation.css
│  │  │  ├─ mainNavigation.js
│  │  ├─ mobileNavigation/
│  │  │  ├─ mobileNavigation.css
│  │  │  ├─ mobileNavigation.js
│  │  ├─ mobileToggle/
│  │  │  ├─ mobileToggle.css
│  │  │  ├─ mobileToggle.js
│  │  ├─ navigationItems/
│  │  │  ├─ navigationItems.css
│  │  │  ├─ navigationItems.js
│  ├─ paginator/
│  │  ├─ paginator.css
│  │  ├─ paginator.js
│  ├─ toolbar/
│  │  ├─ toolbar.css
│  │  ├─ toolbar.js
├─ pages/
│  ├─ auth/
│  │  ├─ auth.css
│  │  ├─ auth.js
│  │  ├─ login.js
│  │  ├─ signup.js
│  ├─ feed/
│  │  ├─ singlePost/
│  │  │  ├─ singlePost.css
│  │  │  ├─ singlePost.js
│  │  ├─ feed.css
│  │  ├─ feed.js
├─ util/
│  ├─ image.js
│  ├─ validators.js
├─ index.css
├─ app.css
├─ index.js
├─ app.js
.gitignore
package.json
README.md
```
### Back-end Structure
```
controllers/
├─ auth.js
├─ feed.js
images/
middleware/
├─ is-auth.js
models/
├─ post.js
├─ user.js
routes/
├─ auth.js
├─ feed.js
.gitignore
app.js
package.json
README.md
```
### Database Structure
```
admin/
local/
├─ clustermanager
├─ oplog.rs
├─ replset.election
├─ replset.initialSyncld
├─ replset.minvalid
├─ replset.oplogTruncateAfterPoint
├─ startup_log
messages/
├─ posts
├─ users
shop/
├─ orders
├─ products
├─ sessions
├─ users
```
