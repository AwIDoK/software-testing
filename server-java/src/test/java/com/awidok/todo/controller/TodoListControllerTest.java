package com.awidok.todo.controller;

import com.awidok.todo.dao.TodoListsDao;
import com.awidok.todo.model.TodoList;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class TodoListControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private TodoListsDao todoListsDao;

    @Test
    public void getTodoLists() throws Exception {
        List<TodoList> list = new ArrayList<>();
        list.add(new TodoList(1, "a"));
        list.add(new TodoList(2, "b"));
        when(todoListsDao.getTodoLists()).thenReturn(list);
        MvcResult result = mockMvc.perform(get("/api/todo")).andExpect(status().isOk()).andReturn();
        String content = result.getResponse().getContentAsString();
        assertEquals("[{\"list_id\":1,\"name\":\"a\"},{\"list_id\":2,\"name\":\"b\"}]", content);
    }

    @Test
    public void markTodo() throws Exception {
        mockMvc.perform(post("/api/todo/list/1/mark").contentType(MediaType.APPLICATION_JSON)
                .content("{\"todo_id\":1,\"completed\":false}")).andExpect(status().isOk());
        verify(todoListsDao, times(1)).markTodo(1, false);
    }

    @Test
    public void deleteList() throws Exception {
        mockMvc.perform(delete("/api/todo/list/1")).andExpect(status().isOk());
        verify(todoListsDao, times(1)).deleteTodoList(1);
    }
}
