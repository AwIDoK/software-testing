package com.awidok.todomanager.config;

import com.awidok.todomanager.dao.TodoListsJdbcDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.env.Environment;

import javax.sql.DataSource;

@Configuration
public class JdbcDaoContextConfiguration {
    @Bean
    public TodoListsJdbcDao todoListJdbcDao(DataSource dataSource) {
        return new TodoListsJdbcDao(dataSource);
    }

    @Bean
    @Primary
    @ConfigurationProperties(prefix="spring.datasource")
    public DataSource dataSource() {
        return DataSourceBuilder.create().build();
    }
}