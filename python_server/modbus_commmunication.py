from pymodbus.client.serial import ModbusSerialClient
import time
import requests


url = 'http://localhost:4000/api/v1/amphie/insert'  

# Créer un client Modbus RTU
client = ModbusSerialClient(method='rtu', port='COM7', baudrate=9600, bytesize=8, parity='N')

# Se connecter au périphérique Modbus
client.connect()

while(1):
    # Lire les valeurs des registres
    response = client.read_holding_registers(address=0, count=2, slave=1)

    # Vérifier si la lecture a réussi
    if not response.isError():
        print("Valeurs lues:", response.registers)
        print(f'response ${response}')
        H = response.registers[0] / 100
        print("Humidity :", H , " %")
        T = response.registers[1] / 100
        print("Temperature :", T , " *C")

        data={
            "temperature":str(T),
            "humidity":str(H),
            "co2_gaz":str(99)
        }
        response = requests.post(url, json=data)
    else:
        print("Erreur de lecture:", response)

    

    # Fermer la connexion
    time.sleep(10)

client.close()