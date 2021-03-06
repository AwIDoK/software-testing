package com.awidok.todo.dao;

import com.awidok.todo.model.Todo;
import com.awidok.todo.model.TodoList;

import java.util.List;

public interface TodoListsDao {
    void addTodoList(TodoList todoList);

    void addTodo(Todo todo);

    List<TodoList> getTodoLists();

    List<Todo> getTodoList(int listId);

    void deleteTodoList(int listId);

    void markTodo(int todoId, boolean completed);
}