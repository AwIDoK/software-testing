package com.awidok.todo.model;

public class Todo {
    int todo_id;
    int list_id;

    public int getTodo_id() {
        return todo_id;
    }

    public void setTodo_id(int todo_id) {
        this.todo_id = todo_id;
    }

    public int getList_id() {
        return list_id;
    }

    public void setList_id(int list_id) {
        this.list_id = list_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    String name;
    boolean completed;

    public Todo() {
    }

    public Todo(int listId, String text) {
        this.list_id = listId;
        this.name = text;
    }

    public Todo(int listId) {
        this.list_id = listId;
    }

    public boolean isCompleted() {
        return completed;
    }

    public void setCompleted(boolean completed) {
        this.completed = completed;
    }
}
