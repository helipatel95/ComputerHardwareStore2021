package computerHardware;

import org.openqa.selenium.By;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.firefox.FirefoxDriver;

public class signup {
	
	public void dosignup() {
		System.out.println("******************************************signup************************************");
		System.setProperty("webdriver.gecko.driver",
				"C:\\Users\\patel\\Downloads\\sel Heli\\geckodriver-v0.28.0-win64\\geckodriver.exe");
		FirefoxDriver driver = new FirefoxDriver();
		driver.get("http://localhost:62275/Auth/signup");
		driver.manage().window().maximize();
		driver.manage().window().setSize(new Dimension(1192, 706));
		driver.findElement(By.id("firstName")).click();
		driver.findElement(By.id("firstName")).sendKeys("aa");
		driver.findElement(By.id("lastName")).click();
		driver.findElement(By.id("lastName")).sendKeys("bb");
		driver.findElement(By.id("email")).click();
		driver.findElement(By.id("email")).sendKeys("aa@gmail.com");
		driver.findElement(By.id("password")).click();
		driver.findElement(By.id("password")).sendKeys("123456789");
		driver.findElement(By.cssSelector(".btn")).click();
		System.out.println("******************************************Succesfully signup!************************************");
}
}
