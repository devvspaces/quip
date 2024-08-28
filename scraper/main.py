from selenium import webdriver
from selenium.webdriver.firefox.service import Service as FirefoxService
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from webdriver_manager.firefox import GeckoDriverManager
import time

driver = webdriver.Firefox(service=FirefoxService(GeckoDriverManager().install()))


print("Installed")

driver.get("https://hfr.health.gov.ng/facilities/hospitals-list#")

nextBtn = driver.find_element(By.XPATH, '/html/body/div/div/div[2]/div/div[3]/div/div[2]/div/ul/li[13]/a')

time.sleep(2)
while (nextBtn is not None):
  rows = driver.find_elements(By.XPATH, "//*[@id='hosp']/tbody/tr")


  for row in rows:
    button = row.find_element(By.TAG_NAME, "a")
    button.click()
    time.sleep(1)
    facilityCode = driver.find_element(By.ID, 'unique_id')
    print("Facility Code", facilityCode.text)
    
    # Close modal
    close = driver.find_element(By.CLASS_NAME, 'close')
    close.click()
    time.sleep(1)
  
  nextBtn.click()
  time.sleep(2)
