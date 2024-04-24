import requests

from_currency = str(
    input("Enter in the currency you like to convert from: ")).upper() #string coverted to upper case

to_currency = str(
    input("Enter in the currency you like to convert to: ")).upper() #string coverted to upper case

amount = float(
    input("Enter in the amount of money: "))

response = requests.get(
    f"https://api.frankfurter.app/latest?amount={amount}&from{from_currency}&to{to_currency}")

# Check if the request was successful
if response.status_code == 200:
    # Attempt to retrieve the conversion result and handle potential errors
    try:
        # We should ensure the 'rates' key and the specific currency are available in the JSON response
        conversion_result = response.json()['rates'][to_currency]
        print(f"{amount} {from_currency} is {conversion_result} {to_currency}")
    except KeyError:
        print("There was an error with the currency codes or conversion result.")
else:
    print("Failed to retrieve data. Please check your network connection and the provided URL.")
