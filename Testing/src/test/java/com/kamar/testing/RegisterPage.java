package com.kamar.testing;

import com.kamar.testing.base.Setup;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.testng.Assert;
import org.testng.annotations.AfterClass;
import org.testng.annotations.BeforeClass;
import org.testng.annotations.Test;

import java.time.Duration;
import java.util.Random;

public class RegisterPage {
    private WebDriver driver;

    @BeforeClass
    public void setUp() {
        driver = Setup.getDriver();
        driver.manage().window().maximize();
        driver.get(Constant.BASE_URL);
        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));
    }

    @Test(priority = 0)
    public void testSuccessfulRegister() {
        driver.findElement(By.xpath("//a")).click();
        Setup.type(By.name("firstName"),"kamar");
        Setup.type(By.name("lastName"),"Zaghloul");
        Setup.type(By.name("username"),String.valueOf(new Random().nextInt(545454)));
        Setup.type(By.name("email"),"kamarz01@gmail.com");
        Setup.type(By.name("phone"),"123456789");
        Setup.type(By.name("password"),"123");
        driver.findElement(By.xpath("//button")).click();
        String actualText = driver.findElement(By.xpath("//p[contains(.,'Sign in to')]")).getText();
        Assert.assertEquals(actualText,"Sign in to manage your bank account.");
    }

    @AfterClass
    public void tearDown() {
        driver.quit();
    }
}
