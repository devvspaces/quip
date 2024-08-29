from selenium import webdriver
from selenium.webdriver.firefox.service import Service as FirefoxService
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from webdriver_manager.firefox import GeckoDriverManager
from selenium.common.exceptions import NoSuchElementException
import time
import json
import multiprocessing


def run_scraper(id, file_name, url):
    print(f"Starting {id}...")
    results = []

    # driver = webdriver.Firefox(
    #     service=FirefoxService(GeckoDriverManager().install()))
    options = webdriver.FirefoxOptions()
    options.binary_location = "C:\\Program Files\\Mozilla Firefox\\firefox.exe"
    driver = webdriver.Firefox(service=webdriver.FirefoxService(
        "C:\\Users\\Administrator\\Downloads\\geckodriver-v0.35.0-win32\\geckodriver.exe"), options=options)

    try:
        driver.get(url)
        time.sleep(3)
        while True:
            rows = driver.find_elements(By.XPATH, "//*[@id='hosp']/tbody/tr")

            for row in rows:
                button = row.find_element(By.TAG_NAME, "a")
                button.click()
                time.sleep(1)
                modal = driver.find_element(By.ID, 'view_details')

                if (not modal.find_element(By.ID, 'unique_id').is_displayed()):
                    identifier = modal.find_element(
                        By.CSS_SELECTOR, '#accordion > div:nth-child(1) > div.panel-heading > h4 > a')
                    identifier.click()
                    time.sleep(0.2)

                facility_code = modal.find_element(By.ID, 'unique_id').text
                state_unique_id = modal.find_element(
                    By.ID, 'state_unique_id').text
                registration_no = modal.find_element(
                    By.ID, 'registration_no').text
                facility_name = modal.find_element(By.ID, 'facility_name').text
                alt_facility_name = modal.find_element(
                    By.ID, 'alt_facility_name').text
                start_date = modal.find_element(By.ID, 'start_date').text
                ownership = modal.find_element(By.ID, 'ownership').text
                ownership_type = modal.find_element(
                    By.ID, 'ownership_type').text
                facility_level = modal.find_element(
                    By.ID, 'facility_level').text
                operational_days = modal.find_element(
                    By.ID, 'operational_days').text
                operational_hours = modal.find_element(
                    By.ID, 'operational_hours').text

                location = modal.find_element(
                    By.CSS_SELECTOR, '#accordion > div:nth-child(2) > div.panel-heading > h4 > a')
                location.click()
                time.sleep(0.2)

                state = modal.find_element(By.ID, 'state').text
                lga = modal.find_element(By.ID, 'lga').text
                ward = modal.find_element(By.ID, 'ward').text
                physical_location = modal.find_element(
                    By.ID, 'physical_location').text
                postal_address = modal.find_element(
                    By.ID, 'postal_address').text
                longitude = modal.find_element(By.ID, 'longitude').text
                latitude = modal.find_element(By.ID, 'latitude').text

                contacts = modal.find_element(
                    By.CSS_SELECTOR, '#accordion > div:nth-child(3) > div.panel-heading > h4 > a')
                contacts.click()
                time.sleep(0.2)

                phone_number = modal.find_element(By.ID, 'phone_number').text
                alternate_number = modal.find_element(
                    By.ID, 'alternate_number').text
                email_address = modal.find_element(By.ID, 'email_address').text
                website = modal.find_element(By.ID, 'website').text

                status = modal.find_element(
                    By.CSS_SELECTOR, '#accordion > div:nth-child(4) > div.panel-heading > h4 > a')
                status.click()
                time.sleep(0.2)

                operation_status = modal.find_element(
                    By.ID, 'operation_status').text
                registration_status = modal.find_element(
                    By.ID, 'registration_status').text
                license_status = modal.find_element(
                    By.ID, 'license_status').text

                services = modal.find_element(
                    By.CSS_SELECTOR, '#accordion > div:nth-child(5) > div.panel-heading > h4 > a')
                services.click()
                time.sleep(0.2)

                outpatient = modal.find_element(By.ID, 'outpatient').text
                inpatient = modal.find_element(By.ID, 'inpatient').text

                medical = [el.text for el in modal.find_element(
                    By.ID, 'medical').find_elements(By.TAG_NAME, "span")]
                surgical = [el.text for el in modal.find_element(
                    By.ID, 'surgical').find_elements(By.TAG_NAME, "span")]
                gyn = [el.text for el in modal.find_element(
                    By.ID, 'gyn').find_elements(By.TAG_NAME, "span")]
                pediatrics = [el.text for el in modal.find_element(
                    By.ID, 'pediatrics').find_elements(By.TAG_NAME, "span")]
                dental = [el.text for el in modal.find_element(
                    By.ID, 'dental').find_elements(By.TAG_NAME, "span")]
                specialservice = [el.text for el in modal.find_element(
                    By.ID, 'specialservice').find_elements(By.TAG_NAME, "span")]
                beds = modal.find_element(By.ID, 'beds').text
                onsite_laboratory = modal.find_element(
                    By.ID, 'onsite_laboratory').text
                onsite_imaging = modal.find_element(
                    By.ID, 'onsite_imaging').text
                onsite_pharmarcy = modal.find_element(
                    By.ID, 'onsite_pharmarcy').text
                mortuary_services = modal.find_element(
                    By.ID, 'mortuary_services').text
                ambulance_services = modal.find_element(
                    By.ID, 'ambulance_services').text

                personnel = modal.find_element(
                    By.CSS_SELECTOR, '#accordion > div:nth-child(6) > div.panel-heading > h4 > a')
                personnel.click()
                time.sleep(0.2)

                doctors = modal.find_element(By.ID, 'doctors').text
                pharmacists = modal.find_element(By.ID, 'pharmacists').text
                pharmacy_technicians = modal.find_element(
                    By.ID, 'pharmacy_technicians').text
                dentist = modal.find_element(By.ID, 'dentist').text
                dental_technicians = modal.find_element(
                    By.ID, 'dental_technicians').text
                nurses = modal.find_element(By.ID, 'nurses').text
                midwifes = modal.find_element(By.ID, 'midwifes').text
                nurse_midwife = modal.find_element(By.ID, 'nurse_midwife').text
                lab_technicians = modal.find_element(
                    By.ID, 'lab_technicians').text
                lab_scientists = modal.find_element(
                    By.ID, 'lab_scientists').text
                him_officers = modal.find_element(By.ID, 'him_officers').text
                community_health_officer = modal.find_element(
                    By.ID, 'community_health_officer').text
                community_extension_workers = modal.find_element(
                    By.ID, 'community_extension_workers').text
                jun_community_extension_worker = modal.find_element(
                    By.ID, 'jun_community_extension_worker').text
                env_health_officers = modal.find_element(
                    By.ID, 'env_health_officers').text
                attendants = modal.find_element(By.ID, 'attendants').text

                data = {
                    'facility_code': facility_code,
                    'state_unique_id': state_unique_id,
                    'registration_no': registration_no,
                    'facility_name': facility_name,
                    'alt_facility_name': alt_facility_name,
                    'start_date': start_date,
                    'ownership': ownership,
                    'ownership_type': ownership_type,
                    'facility_level': facility_level,
                    'operational_days': operational_days,
                    'operational_hours': operational_hours,
                    'state': state,
                    'lga': lga,
                    'ward': ward,
                    'physical_location': physical_location,
                    'postal_address': postal_address,
                    'longitude': longitude,
                    'latitude': latitude,
                    'phone_number': phone_number,
                    'alternate_number': alternate_number,
                    'email_address': email_address,
                    'website': website,
                    'operation_status': operation_status,
                    'registration_status': registration_status,
                    'license_status': license_status,
                    'outpatient': outpatient,
                    'inpatient': inpatient,
                    'medical': medical,
                    'surgical': surgical,
                    'gyn': gyn,
                    'pediatrics': pediatrics,
                    'dental': dental,
                    'specialservice': specialservice,
                    'beds': beds,
                    'onsite_laboratory': onsite_laboratory,
                    'onsite_imaging': onsite_imaging,
                    'onsite_pharmarcy': onsite_pharmarcy,
                    'mortuary_services': mortuary_services,
                    'ambulance_services': ambulance_services,
                    'doctors': doctors,
                    'pharmacists': pharmacists,
                    'pharmacy_technicians': pharmacy_technicians,
                    'dentist': dentist,
                    'dental_technicians': dental_technicians,
                    'nurses': nurses,
                    'midwifes': midwifes,
                    'nurse_midwife': nurse_midwife,
                    'lab_technicians': lab_technicians,
                    'lab_scientists': lab_scientists,
                    'him_officers': him_officers,
                    'community_health_officer': community_health_officer,
                    'community_extension_workers': community_extension_workers,
                    'jun_community_extension_worker': jun_community_extension_worker,
                    'env_health_officers': env_health_officers,
                    'attendants': attendants
                }

                results.append(data)

                print("Scraped", facility_code)

                # Close modal
                close = driver.find_element(By.CLASS_NAME, 'close')
                close.click()
                time.sleep(1)

            try:
                nextBtn = driver.find_element(
                    By.XPATH, '/html/body/div/div/div[2]/div/div[3]/div/div[2]/div/ul/li[13]/a')
                nextBtn.click()
                time.sleep(3)
            except NoSuchElementException:
                break
    finally:
        driver.quit()
        print("Scraping completed. Results saved to", id)

        with open(file_name, 'w') as f:
            json.dump(results, f, indent=4)


# 101, 102, 103 '124', '128', '130'

if __name__ == '__main__':
    states = ['104', '105', '106']

    processes: list[multiprocessing.Process] = []
    for state in states:
        url = f"https://hfr.health.gov.ng/facilities/hospitals-search?_token=ZGeVGmJ7drwACjppCjFI5qTYmdx80XPIKhKpXmQP&state_id={state}&lga_id=&ward_id=0&facility_level_id=0&ownership_id=0&operational_status_id=0&registration_status_id=0&license_status_id=0&geo_codes=0&service_type=0&service_category_id=0&facility_name=&entries_per_page=2000"
        file_name = f"data_{state}.json"
        p = multiprocessing.Process(
            target=run_scraper, args=(state, file_name, url,))
        p.start()
        processes.append(p)

    for p in processes:
        p.join()
