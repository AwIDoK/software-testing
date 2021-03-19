package com.awidok.todo.controller;

import com.awidok.todo.dao.TodoListsDao;
import com.awidok.todo.model.Todo;
import com.awidok.todo.model.TodoList;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.view.RedirectView;

import java.util.List;

@Controller
public class TodoListController {
    private final TodoListsDao todoListsDao;

    public TodoListController(TodoListsDao todoListsDao) {
        this.todoListsDao = todoListsDao;
    }

    @RequestMapping(value = "/api/todo", method = RequestMethod.POST)
    public RedirectView addTodoList(@RequestParam String name) {
        todoListsDao.addTodoList(new TodoList(name));
        RedirectView rv = new RedirectView("/");
        rv.setStatusCode(HttpStatus.SEE_OTHER);
        return rv;
    }

    @RequestMapping(value = "/api/todo/list/{listId}", method = RequestMethod.POST)
    public RedirectView addTodo(@RequestParam String name, @PathVariable int listId) {
        todoListsDao.addTodo(new Todo(listId, name));
        RedirectView rv = new RedirectView("/todo/" + listId);
        rv.setStatusCode(HttpStatus.SEE_OTHER);
        return rv;
    }

    @RequestMapping(value = {"/api/todo"}, method = RequestMethod.GET)
    public @ResponseBody
    List<TodoList> getTodoLists() {
        return todoListsDao.getTodoLists();
    }

    @RequestMapping(value = "/api/todo/list/{listId}", method = RequestMethod.GET)
    public @ResponseBody
    List<Todo> getTodoList(@PathVariable int listId) {
        return todoListsDao.getTodoList(listId);
    }

    @RequestMapping(value = "/api/todo/list/{listId}", method = RequestMethod.DELETE)
    public ResponseEntity delTodoList(@PathVariable int listId) {
        todoListsDao.deleteTodoList(listId);
        return new ResponseEntity(HttpStatus.OK);
    }

    @RequestMapping(value = "/api/todo/list/{listId}/mark", method = RequestMethod.POST)
    public ResponseEntity markTodo(@PathVariable int listId, @RequestBody Todo todo) {
        todoListsDao.markTodo(todo.getTodo_id(), todo.isCompleted());
        return new ResponseEntity(HttpStatus.OK);
    }
}

