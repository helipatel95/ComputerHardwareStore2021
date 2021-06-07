package computerHardware;

import org.openqa.selenium.By;
import org.openqa.selenium.Dimension;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.sikuli.script.FindFailed;
import org.sikuli.script.Pattern;
import org.sikuli.script.Screen;

public class mainTest {

	public static void main(String[] args) {
		filter filter = new filter();
		login login = new login();
		signup signup = new signup();
		
		signup.dosignup();
		login.login();
		filter.dofilter();

	}

}
