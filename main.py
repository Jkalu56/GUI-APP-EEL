import eel

eel.init('web')


#The only function main.js calls now ;)
@eel.expose
def retrieve_data():
	with open("sample.csv", 'r') as file:
		rd = file.readlines()
	if len(rd[-1]) > 1: values = rd[-1].replace('\n', '').split(",")
	else: values = rd[-2].replace('\n', '').split(",")
	keys = rd[0][:-1].split(",")
	return dict(zip(keys, values))


#This code is for debugging purposes
@eel.expose
def print_stuff(message):
	print(message)


eel.start('index.html', host="0.0.0.0", port=8080)
