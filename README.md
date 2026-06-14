# File Uploader
The goal of this project was to create a file upload app similar to google drive using Prisma ORM in Node.js using Express, EJS, Express-Validator, PostgreSQL, Passport, Bcryptjs, Multer, Cloudinary and Dotenv.

## Features
1. Home page that displays a login form and a register link to create a new user.
2. Home page updates to an authorized user layout when login is successful with a link to go to user page.
3. User page that displays username with buttons to log out of passport session, update the user credentials, delete the user which logs the session out, create a new file folder associated to the current user, and a list of all current folders associated with the user (or No Folders if the current user hasn't made one yet).
4. An open folder button for each folder that goes to that associated folder's view page
5. Folder page that displays folder name with buttons to upload a new file and file info to Cloudinary and Prisma database respectively, update the folder name, delete the folder from the current user, and a list of all current files associated with the folder (or No Files if the current user hasn't uploaded one yet).
6. A more info button for each file that goes to that associated file's view page
7. File page that displays file name and file size with buttons to download the file from Cloudinary, update the file name in the Prisma database only, and delete the file and file record from Cloudinary and Prisma databases respectively.

## Installation

Before installing, ensure you have the following software installed:
**Git**: [Download Git](https://git-scm.com)
**Node.js**: [Download Node.js](https://nodejs.org)
**postSQL**: [Download postSQL](https://www.postgresql.org/)

1. **Clone the repository**
```git clone https://github.com/thall34/file-uploader```
2. **Navigate to the project directory**
```cd clone-location/file-uploader```
3. **Initialize project to create package.json**
```npm init -y```
4. **Install dependencies**
```npm install express ejs express-validator pg express-session passport passport-local bcryptjs prisma @prisma/client @quixo3/prisma-session-store cloudinary dotenv multer```
5. **Configure .env file in project folder and add a DATABASE_URL variable**
```DATABASE_URL=postgresql://<your-role-name>:<your-role-password>@localhost:5432/file_uploader?schema=public```
6. **Add a SESSION_SECRET variable to your .env file**
```SESSION_SECRET=<your-session-secret>```
7. **Add CLOUDINARY variables to your .env file**
```CLOUDINARY_CLOUD_NAME=<your-cloud-name>  CLOUDINARY_API_KEY=<your-api-key>  CLOUDINARY_API_SECRET=<your-api-secret>```
6. **Create Prisma database**
```npx prisma migrate```
7. **Start the local server**
```node app.js```
8. **Navigate to the localhost in your browser**
```http://localhost:3000```

## Future improvements

Finish styling using CSS
Add Express Validation to folder and file creation and updates