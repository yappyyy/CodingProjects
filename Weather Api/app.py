import requests 
api_key = 'f78ed7b94a63a1d54e616bfdd446f640'

user_input = input("Enter city: ") 

weather_data = requests.get( 
    f"https://api.openweathermap.org/data/2.5/weather?q={user_input}&units=metric&APPID={api_key}")

if weather_data.json()['cod'] == '404':
    print("No City Found")

##print(weather_data.status_code) to check if request is successful 200 means yes 
else:
    weather = weather_data.json()['weather'][0]['main']
    temp = round(weather_data.json()['main']['temp'])
    humidity = weather_data.json()['main']['humidity']

    print(f"The weather in {user_input} is: {weather}")
    print(f"The weather in {user_input} is: {temp}°C")
    print(f"The weather in {user_input} is: {humidity}")



