package com.awidok.todomanager.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import com.awidok.todomanager.dao.TodoListsJdbcDao;

import javax.sql.DataSource;

@Configuration
public class JdbcDaoContextConfiguration {
    @Autowired
    private Environment env;
    @Bean
    public TodoListsJdbcDao todoListJdbcDao(DataSource dataSource) {
        return new TodoListsJdbcDao(dataSource);
    }

    @Bean
    public DataSource dataSource() {
        DriverManagerDataSource dataSource = new DriverManagerDataSource();
        dataSource.setDriverClassName("org.postgresql.Driver");
        dataSource.setUrl("jdbc:postgresql://" + env.getProperty("database.url"));
        dataSource.setUsername(env.getProperty("database.login"));
        dataSource.setPassword(env.getProperty("database.password"));
        return dataSource;
    }
}