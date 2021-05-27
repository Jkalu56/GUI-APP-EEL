import eel

# Okay, now I just need a data dictionary imported
# Once I have that, I'll know how to proceed.
# This program will just update once per second.


eel.init('web')

count = 0.00001
switch = 0
latitude = 40.4310
longitude = -86.9149

@eel.expose
def get_latitude():
    global count, latitude, switch
    switch += 1
    if switch % 7 == 0:
        latitude -= count
    else:
        latitude += count
    return latitude

@eel.expose
def get_longitude():
    global count, longitude, switch
    if switch % 3 == 0:
        longitude -= count
    else:
        longitude += count
    return longitude

@eel.expose
def get_altitude():
    return 0

@eel.expose
def get_ext_temperature():
    return 0

@eel.expose
def get_int_temperature():
    return 0

@eel.expose
def print_stuff(message):
  print(message)


eel.start('index.html', host="0.0.0.0", port=8080)