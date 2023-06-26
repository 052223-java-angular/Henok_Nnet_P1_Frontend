# Henok_Nnet_P1

# P1 - Neighborhood Net(Nnet) Project

## Introduction

The Neighborhood Net platform is a website that aims to enhance community safety and support by leveraging Angular and Java technologies for its development. It will serve as a centralized hub for residents to access various services and resources. The website will be designed with user-friendly interfaces and interactive features to encourage community engagement. 
Users will be able to report suspicious activities, request assistance,find lost and found items,access new businesses, rate and review different resources, get useful contacts list and access information on tips and local events. Additionally, the platform may include features such as neighborhood forums, emergency contact information, and updates from local law enforcement agencies. By utilizing Angular and Java, the website will offer a robust and scalable solution to empower communities and foster a sense of security and cooperation among residents.


## User Stories

- **As a user**, I want to register an account so that I can have access to the community resources.
- **As a user**, I want to log in to my account so that I can see whats is happening in my neighbourhood and post activities.
- **As a user**, I want to log in to my account so that I can view and edit my profile.
- **As a user**, I want to browse through the resources only when logging in.
- **As a user**, I want to browse through different event lists around my community, see Volunteer activities, new local businesses, emergencies.
- **As a user**, I want to search for resources and things in my communitiy based on categories.
- **As a user**, I want to post activities, promotions and events.
- **As a user**, I want to like and comment local businesses and events.
- **As a user**, I want to view comments from other users.
- **As an Admin**, I want to delete users.
- **As an Admin**, I want to view All hoods.
- **As an Admin**, I want to promote users to be an admin.
- **As an Admin**, I want to delete posts of users.
- **As an Admin**, I want to delete comments of users.


## MVP (Minimum Viable Product)

- User registration and login
- Session storage and Authentication
- Admin Privilage Delete users or promote users
- Admin privilage to delete user Posts
- Admin Privilage to delete bad Comments 
- Admin can View Hoods and Census
- posting events and activities, remove Posts (Poster & Admin)
- Comment on posts and Delete Comments (Commenter, Poster, Admin)
-  

## Stretch Goals

- filter for Posts
- Like people Post
- Small Social media feature for the community people to get to know new people
  


## Tech Stacks

- **Java**: The main programming language used for building the backend side of the web-app.
- **Spring Framework**: a java framework to handle the restful nature of the web.
- **Hibernate**: object–relational mapping tool for the Java programming language
- **Angular**: open-source single-page web application framework to build the frontend of the web-app.
- **zippopotam**: External Api to get Information of user location based on zipcode
- **PostgreSQL**: Used as the database to store user, product, and order data.
- **Maven**: Used for managing project dependencies.
- **JUnit**: A testing framework for Java applications, used to ensure our code works as expected.
- **JDBC (Java Database Connectivity)**: An API for connecting and executing queries on the database.
- **BCrypt**: A Java library for hashing and checking passwords for security.
- **JUnit, Mockito, and PowerMock**: Used for unit and integration testing.
- **Git and GitHub**: Used for version control.

## Requirements

- **Clean Codebase**: All code should be clean and well-documented. The repository should not include any unnecessary files or folders such as the `target/`, `.DS_Store`, etc. All files and directories should be appropriately named and organized.

- **Database Design**: The database should be designed following the principles of the 3rd Normal Form (3NF) to ensure data integrity and efficiency. An Entity Relationship Diagram (ERD) should be included in the documentation.

- **Secure**: All sensitive user data such as passwords must be securely hashed before storing it in the database. The application should not display any sensitive information in error messages.

- **Error Handling**: The application should handle potential errors gracefully and provide clear and helpful error messages to the users.

- **Testing**: The application should have a high test coverage. Unit tests and integration tests should be implemented using JUnit, Mockito, and PowerMock.

- **Version Control**: The application should be developed using a version control system, preferably Git, with regular commits denoting progress.

- **Documentation**: The repository should include a README file with clear instructions on how to run the application. Code should be well-commented to allow for easy understanding and maintenance.

- **Scalable**: The design of the application should be scalable, allowing for easy addition of new features or modifications in the future.

