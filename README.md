# File-Upload-Download-Application
File upload and download using reactjs, nodejs and mongodb

**1. Frontend-**
- cd client
- npm install (to install all the packages and dependencies from package.json)
- npm start (to run the client)

**2. Backend-**
- cd server
- npm install (to install all the packages and dependencies from package.json)
- npm start (to run the server)

First run server before starting the client

While uploading once the file is choosen the original filename is replaced with the respective row Filename.

Example: if we choose to upload from first row that is *Filename1* and the original file name is demo.txt, the name of the uploaded file is *Filename 1.txt*.
If you want to change the column Filename just change the *tabledata.js* file respectively

For download, click on respective Filename column(eg: Filename1/Filename2). A modal will appear with download button. Click on the close button to close the modal.


