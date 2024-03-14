from pymodbus.client import ModbusSerialClient
from struct import unpack
import time

slave = ModbusSerialClient(method='rtu', port='COM9', baudrate=9600, bytesize=8, parity='N')

def PM3255(address):
    response = slave.read_holding_registers(address, count=2, slave=2)
    if not response.isError():
        V_totale = response.registers[0].to_bytes(2, byteorder='big')+ response.registers[1].to_bytes(2, byteorder='big')
        V = unpack('>f', V_totale)[0]
        return V
    else:
        #Erreur de lecture PM3255
        V = 0
        return V
while True:
    slave.connect()
    response = slave.read_holding_registers(0, count=2, slave=1)
    try:
        if not response.isError():
            print(f"Humidity : {response.registers[0] / 100} %")
            print(f"Temperature : {response.registers[1] / 100} *C")
            print(f"la valeur de Tension est : {PM3255(0x0BDB):.2f} V")
            print(f"la valeur de Courant est : {PM3255(0x0BC1):.2f} A")
            print(f"la valeur de la puissance active totale est : {PM3255(0x0BF3):.2f} KW")
            print(f"la valeur de la puissance reactive totale est : {PM3255(0x0BFB):.2f} KVAR")
            print(f"la valeur de la puissance apparente totale est : {PM3255(0x0C03):.2f} KVA")
    except AttributeError:
        pass
    slave.close()
    time.sleep(1) 