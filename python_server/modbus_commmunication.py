from pymodbus.client.serial import ModbusSerialClient

# Créer un client Modbus RTU
client = ModbusSerialClient(method='rtu', port='COM9', baudrate=9600, bytesize=8, parity='N')

# Se connecter au périphérique Modbus
client.connect()

while(1):
    # Lire les valeurs des registres
    response = client.read_holding_registers(address=0, count=2, slave=1)

    # Vérifier si la lecture a réussi
    if not response.isError():
        print("Valeurs lues:", response.registers)
    else:
        print("Erreur de lecture:", response)

    H = response.registers[0] / 100
    print("Humidity :", H , " %")
    T = response.registers[1] / 100
    print("Temperature :", T , " *C")
    # Fermer la connexion

client.close()