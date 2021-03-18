CREATE TABLE IF NOT EXISTS Lists (
    list_id SERIAL not null,
    name varchar(50) not null,
    primary key (list_id)
);

CREATE TABLE IF NOT EXISTS Todos (
    todo_id SERIAL not null,
    list_id int not null,
    completed boolean not null default false,
    name varchar(50) not null,
    primary key (todo_id),
    foreign key (list_id) REFERENCES Lists (list_id) on delete cascade
);

CREATE TABLE IF NOT EXISTS Users (
    user_id SERIAL not null,
    username varchar(50) not null,
    password varchar(64) not null,
    primary key (user_id),
    unique(username)
);