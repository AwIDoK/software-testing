package com.awidok.todomanager.dao;

import com.awidok.todomanager.model.Todo;
import com.awidok.todomanager.model.TodoList;

import java.util.List;

public interface TodoListsDao {
    void addTodoList(TodoList todoList);

    void addTodo(Todo todo);

    List<TodoList> getTodoLists();

    List<Todo> getTodoList(int listId);

    void deleteTodoList(int listId);

    void markTodo(int todoId, boolean completed);
}