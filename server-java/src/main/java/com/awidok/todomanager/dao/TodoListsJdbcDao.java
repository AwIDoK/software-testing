package com.awidok.todomanager.dao;

import com.awidok.todomanager.model.Todo;
import com.awidok.todomanager.model.TodoList;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.support.JdbcDaoSupport;

import javax.sql.DataSource;
import java.util.ArrayList;
import java.util.List;


public class TodoListsJdbcDao extends JdbcDaoSupport implements TodoListsDao {

    public TodoListsJdbcDao(DataSource dataSource) {
        super();
        setDataSource(dataSource);
    }

    @Override
    public void addTodoList(TodoList todoList) {
        String sql = "INSERT INTO Lists (name) VALUES (?)";
        getJdbcTemplate().update(sql, todoList.getName());
    }

    @Override
    public void addTodo(Todo todo) {
        String sql = "INSERT INTO Todos (name, completed, list_id) VALUES (?, ?, ?)";
        getJdbcTemplate().update(sql, todo.getName(), todo.isCompleted(), todo.getList_id());
    }

    @Override
    public List<TodoList> getTodoLists() {
        String sql = "SELECT list_id, name FROM LISTS ORDER BY list_id";
        return getJdbcTemplate().query(sql, new BeanPropertyRowMapper(TodoList.class));
    }

    @Override
    public List<Todo> getTodoList(int listId) {
        String sql = "SELECT todo_id, name, completed FROM Todos WHERE list_id = (?) ORDER BY todo_id";
        return getJdbcTemplate().query(sql, new BeanPropertyRowMapper(Todo.class), listId);
    }

    @Override
    public void deleteTodoList(int listId) {
        String sql = "DELETE FROM Lists WHERE list_id = (?)";
        getJdbcTemplate().update(sql, listId);
    }

    @Override
    public void markTodo(int todoId, boolean completed) {
        String sql = "UPDATE Todos SET completed = (?) WHERE todo_id = (?)";
        getJdbcTemplate().update(sql, completed, todoId);
    }

}
