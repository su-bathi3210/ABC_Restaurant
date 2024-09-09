package abc.example.abcResturant.Automation;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import java.time.Duration;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class ReservationTest {

    private WebDriver driver;
    private WebDriverWait wait;

    @BeforeEach
    public void setUp() {
        driver = new ChromeDriver();
        driver.manage().window().maximize();
        driver.get("http://localhost:3000/reservation"); // URL of your reservation form
        wait = new WebDriverWait(driver, Duration.ofSeconds(20));
    }

    @Test
    public void testReservationForm() {
        // Fill in the Name field
        WebElement nameInput = driver.findElement(By.cssSelector("input[placeholder='Enter Your Name']"));
        nameInput.sendKeys("John Doe");

        // Select an Outlet
        WebElement outletSelect = driver.findElement(By.id("outlet"));
        Select selectOutlet = new Select(outletSelect);
        selectOutlet.selectByValue("Bambalapitiya");

        // Fill in the Username field
        WebElement usernameInput = driver.findElement(By.cssSelector("input[placeholder='Enter Your Username or Email']"));
        usernameInput.sendKeys("john.doe@example.com");

        // Select the Date
        WebElement dateInput = driver.findElement(By.cssSelector("input[type='date']"));
        dateInput.sendKeys("2024-12-31");

        // Select the Time
        WebElement timeInput = driver.findElement(By.cssSelector("input[type='time']"));
        timeInput.sendKeys("19:00");

        // Fill in the Number of Guests
        WebElement guestsInput = driver.findElement(By.cssSelector("input[placeholder='Number of Guests']"));
        guestsInput.sendKeys("4");

        // Fill in the Contact Number
        WebElement contactNoInput = driver.findElement(By.cssSelector("input[placeholder='Enter Contact Number']"));
        contactNoInput.sendKeys("1234567890");

        // Submit the Form
        WebElement submitButton = driver.findElement(By.cssSelector("button.submit-button"));
        submitButton.click();

        // Wait for Confirmation Dialog and validate it
        WebElement confirmButton = wait.until(ExpectedConditions.elementToBeClickable(By.xpath("//button[text()='Confirm']")));
        WebElement cancelButton = driver.findElement(By.xpath("//button[text()='Cancel']"));

        assertEquals("Are you sure you want to submit the table reservation?", driver.findElement(By.className("dialog")).getText());

        // Confirm the dialog
        confirmButton.click();

        // Wait for the success alert or check for the successful submission message
        WebElement successMessage = wait.until(ExpectedConditions.visibilityOfElementLocated(By.cssSelector(".reservation-success-message")));
        assertEquals("Table reservation submitted successfully. You will receive a confirmation in your email!", successMessage.getText());
    }

    @AfterEach
    public void tearDown() {
        if (driver != null) {
            driver.quit();
        }
    }
}
