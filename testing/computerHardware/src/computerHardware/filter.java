package computerHardware;

import org.openqa.selenium.By;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.sikuli.script.FindFailed;
import org.sikuli.script.Pattern;
import org.sikuli.script.Screen;

public class filter {
	public  void dofilter(){
		System.out.println("******************************************filter************************************");
		System.setProperty("webdriver.gecko.driver",
				"C:\\Users\\patel\\Downloads\\sel Heli\\geckodriver-v0.28.0-win64\\geckodriver.exe");
		String filepath = "D:\\Desktop Backup\\20_12_2020\\eclipce\\sellenium\\computerHardware\\image\\";
		Screen s = new Screen();
		Pattern logo = new Pattern(filepath + "laptop.PNG");
		
		FirefoxDriver driver = new FirefoxDriver();
		driver.get("http://localhost:62275/Dashboard/home");
		driver.manage().window().maximize();
		try {
			s.find(logo);
			s.click(logo);

		} catch (FindFailed e) {
			e.printStackTrace();
		}
		System.out.println("apply multiple brand filter");
		driver.findElement(By.cssSelector("#mat-checkbox-1 .mat-checkbox-inner-container")).click();
		driver.findElement(By.cssSelector("#mat-checkbox-2 .mat-checkbox-label")).click();
		System.out.println("successful!");
		System.out.println("Applying price range");
		driver.findElement(By.cssSelector(".mat-slider")).click();
		driver.findElement(By.cssSelector(".filterDivFlex")).click();
		System.out.println("succesfully done");
		System.out.println(
				"******************************************Succesfully filtered!************************************");
	}
}
