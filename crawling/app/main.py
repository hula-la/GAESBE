# uvicorn main:app --reload

from email.policy import HTTP
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import random
import string
import uvicorn


# from .crawling import get_solved_problem, get_result, confirm_user_code

# firebase 설정 start
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db

from selenium import webdriver
import chromedriver_autoinstaller
from selenium.webdriver.common.by import By

# path = chromedriver_autoinstaller.install()
path = "/usr/src/chrome/chromedriver"

chrome_options = webdriver.ChromeOptions()
chrome_options.add_argument('--headless')
chrome_options.add_argument('--no-sandbox')
chrome_options.add_argument("--single-process")
chrome_options.add_argument("--disable-dev-shm-usage")

driver = webdriver.Chrome(path, chrome_options=chrome_options)

options = webdriver.ChromeOptions()
options.add_argument("headless")

driver = webdriver.Chrome(path, options=options)

cred = credentials.Certificate("/usr/src/app/firebaseKey.json")
# cred = credentials.Certificate("./firebaseKey.json")
db_url = "https://ssafy-final-pjt-3addc-default-rtdb.firebaseio.com"

firebase_admin = firebase_admin.initialize_app(cred,{
  'databaseURL' : db_url,
  'name':'ver1'})
ref = db.reference() # 기본 위치 지정
# firebase 설정 end

app = FastAPI()

# Model 

class Info(BaseModel):
    tier: list = []
    userIds: list = []

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
    
def fb_get_tier_problems(tiers):
    problem_list = {}
    for tier in tiers:
        problem_ref = db.reference(tier)
        snapshot = problem_ref.order_by_child('info/submit'.format(tier)).get()
        for key, val in snapshot.items():
            problem_list[key] = val
    return problem_list



# API
@app.get("/fast/algo/code/{user_id}")
def createCode(user_id:str):
    code=""
    for i in range(8):
      code += str(random.choice(string.ascii_letters))
    user_code = db.reference('user_code')
    user_code.update({user_id:code})
    return code
    
@app.get("/fast/algo/confirm/{user_id}")
def confirmAccount(user_id:str):
    code = db.reference('user_code/{}'.format(user_id)).get()
    if(confirm_user_code(user_id,code)):
        db.reference('user_code/{}'.format(user_id)).delete()
        return {"isConfirm" : True}
    return {"isConfirm" : False}
    

@app.get("/fast/algo/{user_id}")
def getUserProblems(user_id:str):
  problems = get_solved_problem(user_id)
  if problems :
      try :
          user_ref = db.reference('user_problems') # 기본 위치 지정
          user_ref.update({user_id:problems})
      except :
          raise HTTPException( status_code=500, detail="데이터 저장 중 오류 발생")
      return problems
  raise HTTPException( status_code=500, detail="크롤링 중 오류 발생")

@app.post("/fast/algo/problems")
def get_common_problems(info : Info):
    result_problems = [] 
    all_problems = fb_get_tier_problems(info.tier) # 전체 문제 리스트
    solved_problem = [] # 사용자들이 푼 문제 리스트
    
    for user in info.userIds:
        user_ref = db.reference('/user_problems/{}'.format(user));
        solved_problem.append(user_ref.get()) # 사용자의 푼 문제 리스트
        
    solved_problem = sum(solved_problem, [])
    
    for key, value in all_problems.items():
        if key not in solved_problem:
            result_problems.append(value)
    
    result_problems = result_problems[-100:]
    return random.sample(result_problems,k=15)
  
@app.get("/fast/algo/{problem_id}/{user_id}/{lan_id}")
def get_user_result(problem_id:int, user_id:str, lan_id:int):
    try:
        return {"isSolve" : get_result(problem_id, user_id, lan_id)}
    except:
        raise HTTPException(status_code=500, detail="크롤링 중 에러 발생")



