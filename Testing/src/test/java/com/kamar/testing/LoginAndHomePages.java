package com.kamar.testing;

import com.kamar.testing.base.Setup;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import java.time.Duration;
import java.util.Set;

public class LoginAndHomePages {
    
    private WebDriver driver;
    
    @BeforeClass
    public void setUp() {
        driver = Setup.getDriver();
        driver.manage().window().maximize();
        driver.get(Constant.BASE_URL);
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
    }

    @Test(priority = 0)
    public void testFailedLogin() {
        Setup.type(By.name("username"),"test");
        Setup.type(By.name("password"),"test");
        driver.findElement(By.name("loginButton")).click();
        String actualText = driver.findElement(By.name("error")).getText();
        Assert.assertEquals(actualText,"Wrong username or password.");
    }

    @Test(priority = 1)
    public void testAdminLogin() {
        Setup.type(By.name("username"),"admin");
        Setup.type(By.name("password"),"123");
        driver.findElement(By.name("loginButton")).click();
        String actualText = driver.findElement(By.xpath("(//h6)[1]")).getText();
        Assert.assertEquals(actualText,"Welcome to our online banking solution");
    }

    @Test(priority = 2,dependsOnMethods = "testAdminLogin")
    public void testLogOut() {
        driver.findElement(By.xpath("//li[4]")).click();
        String actualText = driver.findElement(By.xpath("//p[contains(.,'Sign in to')]")).getText();
        Assert.assertEquals(actualText,"Sign in to manage your bank account.");
    }

    @AfterClass
    public void tearDown() {
        driver.quit();
    }
}
