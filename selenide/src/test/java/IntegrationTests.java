import com.codeborne.selenide.AuthenticationType;
import com.codeborne.selenide.Configuration;
import com.codeborne.selenide.Credentials;
import com.codeborne.selenide.WebDriverRunner;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.Cookie;
import org.openqa.selenium.remote.DesiredCapabilities;

import java.io.IOException;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;

import static com.codeborne.selenide.Selenide.*;
import static com.codeborne.selenide.Condition.*;


public class IntegrationTests {
    private static String URL;
    @BeforeAll() public static void beforeAll () {
        String host = System.getenv("HOST");
        if (host == null) {
            host = "localhost";
        }
        URL = "http://" + host + ":3000/";
    }

    @BeforeEach
    public void before() {
        reset();
    }
    private void reset() {
        try {
            URL url = new URL(URL + "api/todo/reset");
            URLConnection con;
            con = url.openConnection();
            HttpURLConnection http = (HttpURLConnection)con;
            http.setRequestMethod("POST");
            http.setDoOutput(true);
            http.setFixedLengthStreamingMode(0);
            con.setRequestProperty("Accept-Charset", "UTF-8");
            con.setRequestProperty("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
            http.connect();
            OutputStream os = con.getOutputStream();
            os.write("".getBytes());
        } catch (IOException e) {
            e.printStackTrace();
            System.exit(1);
        }
    }
    @Test
    public void shouldLoadListOfLists() {
        open(URL);
        $("a").shouldHave(text("list1"));
    }

    @Test
    public void shouldLoadTodoList() {
        open(URL);
        $("a").click();
        $("button").shouldHave(text("todo1"));
    }

    @Test
    public void shouldAddNewList() {
        open(URL);
        $(":nth-child(2) > input").setValue("test_list");
        $("[type=\"submit\"]").click();
        $$("a").last().shouldHave(text("test_list"));
    }

    @Test
    public void shouldAddNewTodo() {
        open(URL + "todo/1");
        $(":nth-child(2) > input").setValue("test_todo");
        $("[type=\"submit\"]").click();
        $$("button").last().shouldHave(text("test_todo"));
    }

    @Test
    public void shouldDeleteList() {
        open(URL);
        $("svg").click();
        $$("a").shouldHaveSize(2);
    }

    @Test
    public void shouldMarkTodo() {
        open(URL + "todo/1");
        $("button").click();
        $$(".done").shouldHaveSize(2);
    }

}
