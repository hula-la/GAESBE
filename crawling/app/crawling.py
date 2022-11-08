from selenium import webdriver
import chromedriver_autoinstaller
from selenium.webdriver.common.by import By

chromedriver_autoinstaller.install()

options = webdriver.ChromeOptions()
options.add_argument("headless")

driver = webdriver.Chrome(options=options)

# 백준 계정 연동
def confirm_user_code(user_id,code):
    driver.get("https://www.acmicpc.net/user/{}".format(user_id))
    print("https://www.acmicpc.net/user/{}".format(user_id))
    element = driver.find_element(By.CLASS_NAME,'no-mathjax')
    msg = element.text[:]
    print(msg)
    print(code)
    if msg.find(code) == -1:
        return False
    return True

# 사용자의 푼 문제 가져오기
def get_solved_problem(name='dusdml1502'):
    driver.get("https://www.acmicpc.net/user/{}".format(name))
    element = driver.find_element(By.CLASS_NAME, 'problem-list')
    problems = element.text
    problems = problems.split(' ')
    problems = list(map(str, problems))
    return problems

# 문제 맞춤 여부 
def get_result(problem_id,user_id,lan_id):
    driver.get("https://www.acmicpc.net/status?problem_id={}&user_id={}&language_id={}".format(problem_id, user_id, lan_id))
    element = driver.find_element(By.CLASS_NAME,'result-text')
    result = element.text
    return result == "맞았습니다!!"

