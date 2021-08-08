import eel

# Okay, now I just need a data dictionary imported
# Once I have that, I'll know how to proceed.
# This program will just update once per second.


eel.init('web')


def retrieve_data(optionalvalue=None):
    with open("sample.csv", 'r') as file:
        rd = file.readlines()
        rd2 = []
    for line in rd:
        line = line.replace('\n', '')
        line = line.split(',')
        rd2.append(line)
    keys = rd2[0]
    values = rd2[-1]
    return dict(zip(keys, values)) if not optionalvalue else dict(zip(keys, values))[optionalvalue]


@eel.expose
def get_latitude():
    latitude = retrieve_data("Latitude")
    return latitude

@eel.expose
def get_longitude():
    longitude = retrieve_data("Longitude")
    return longitude

@eel.expose
def get_altitude():
    altitude = retrieve_data("Altitude")
    return altitude

@eel.expose
def get_ext_temperature():
    temp = retrieve_data("External_Temperature")
    return temp

@eel.expose
def get_int_temperature():
    temp = retrieve_data("Internal_Temperature")
    return temp

@eel.expose
def print_stuff(message):
  print(message)


eel.start('index.html', host="0.0.0.0", port=8080)