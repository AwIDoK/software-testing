package com.awidok.todo.model;

import java.util.List;

public class TodoList {
    private int list_id;
    private String name;

    public TodoList() {
    }

    public TodoList(int list_id, String name) {
        this.list_id = list_id;
        this.name = name;
    }

    public TodoList(String name) {
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getList_id() {
        return list_id;
    }

    public void setList_id(int list_id) {
        this.list_id = list_id;
    }
}