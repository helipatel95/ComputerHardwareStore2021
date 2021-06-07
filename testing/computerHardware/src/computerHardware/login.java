package computerHardware;

import org.openqa.selenium.By;
import org.openqa.selenium.firefox.FirefoxDriver;

public class login {

	public void login(){
		System.out.println("******************************************filter************************************");
		System.setProperty("webdriver.gecko.driver",
				"C:\\Users\\patel\\Downloads\\sel Heli\\geckodriver-v0.28.0-win64\\geckodriver.exe");
		FirefoxDriver driver = new FirefoxDriver();
		driver.get("http://localhost:62275/Auth/login");
		driver.manage().window().maximize();
		driver.findElement(By.id("email")).sendKeys("aa@gmail.com");
	    driver.findElement(By.id("password")).click();
	    driver.findElement(By.id("password")).sendKeys("123456789");
		driver.findElement(By.cssSelector(".btn")).click();
		System.out.println("******************************************Succesfully login!************************************");
	}
}
