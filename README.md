# Inventory-Uploader

##### A website that allows the user to create an account, and upload character inventory files to a backend server (For Everquest, an MMORPG). 

### Local Installation:
I have added a 'docker-compose' folder, which contains a docker-compose.yaml. Run this YAML to pull both the backend and frontend images from Docker Hub and launch the website locally.

###### Docker Hub:
https://hub.docker.com/r/hikemalliday/inventory-uploader-frontend

The website allows the user to create a username and password. Each unique username has its own table created in the SQLite database on the backend. The user can then upload an Everquest inventory text file. The text file is saved in the unique username's SQLite table.

This is my first project created with ReactJS. It is also my first project to use the web browser built in file submission functionality.
The table is created with a library called React Table. 

[Backend Server](https://github.com/hikemalliday/Inventory-Uploader-Backend/)

![alt text](https://cdn.discordapp.com/attachments/617825237752479751/1181730234496716810/image.png?ex=65821f0b&is=656faa0b&hm=ff49a3793e044e9134b8d5dadaf4956571523389ffb6ae586c934ea0477e5d58&)
