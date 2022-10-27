create database blog_database;
use blog_database;
create table users(
                      userId int not null primary key auto_increment,
                      username varchar(15),
                      password varchar(8),
                      email varchar(40),
                      status bit not null
);

create table posts (
                       id int not null primary key auto_increment,
                       title varchar(255),
                       content varchar(1000),
                       date datetime
);

alter table posts add userId int not null;
alter table posts add foreign key (userID) references users(userId);
ALTER TABLE users
    ADD fullName varchar(50),
    add address varchar(50),
    add phoneNumber int;