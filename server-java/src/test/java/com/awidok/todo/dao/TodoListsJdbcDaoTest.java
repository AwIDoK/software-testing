package com.awidok.todo.dao;

import com.awidok.todo.model.TodoList;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.util.TestPropertyValues;
import org.springframework.context.ApplicationContextInitializer;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.transaction.annotation.Transactional;
import org.testcontainers.containers.PostgreSQLContainer;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

@SpringBootTest
@ContextConfiguration(initializers = {TodoListsJdbcDaoTest.Initializer.class})
public class TodoListsJdbcDaoTest {
    final private static PostgreSQLContainer<?> sqlContainer;

    static {
        sqlContainer = new PostgreSQLContainer<>("postgres:12.6")
                .withDatabaseName("todo_managertest")
                .withUsername("postgres")
                .withPassword("postgres")
                .withInitScript("db.sql");
        ;
        sqlContainer.start();
    }

    static class Initializer implements ApplicationContextInitializer<ConfigurableApplicationContext> {
        public void initialize(ConfigurableApplicationContext configurableApplicationContext) {
            TestPropertyValues.of(
                    "spring.datasource.jdbc-url=" + sqlContainer.getJdbcUrl(),
                    "spring.datasource.username=" + sqlContainer.getUsername(),
                    "spring.datasource.password=" + sqlContainer.getPassword()
            ).applyTo(configurableApplicationContext.getEnvironment());
        }
    }

    @Autowired
    private TodoListsDao todoListsDao;

    @Test
    @Transactional
    public void getTodoListsTest() {
        assertEquals(3, todoListsDao.getTodoLists().size());
    }

    @Test
    @Transactional
    public void addListTest() {
        TodoList todoList = new TodoList("name");
        todoListsDao.addTodoList(todoList);
        assertEquals(4, todoListsDao.getTodoLists().size());
    }

    @Test
    @Transactional
    public void markTodoListTest() {
        todoListsDao.markTodo(1, true);
        assertTrue(todoListsDao.getTodoList(1).get(0).isCompleted());
    }
}