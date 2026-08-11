from flask import Flask, render_template, request
import sqlite3
app = Flask(__name__)
@app.route("/")
def home():
    return render_template("index.html")


connection = sqlite3.connect("database.db")
cursor = connection.cursor()
cursor.execute("""
CREATE TABLE IF NOT EXISTS userregistry(
id INTEGER PRIMARY KEY,
username TEXT,
password TEXT)
""")
### cursor.execute("DELETE FROM userregistry")
connection.commit()
connection.close()



@app.route("/createaccount", methods = ["POST"])
def createAccount():
    connection1 = sqlite3.connect("database.db")
    cursor1 = connection1.cursor()
    inputData = request.get_json()
    cursor1.execute("""
        INSERT INTO userregistry(username, password)
        VALUES (?, ?)
    """, (inputData["username"], inputData["password"]))
    connection1.commit()
    connection1.close()
    return("Successful!")

@app.route("/loginaccount", methods = ["POST"])
def loginAccount():
    connection2 = sqlite3.connect("database.db")
    cursor2 = connection2.cursor()
    inputData = request.get_json()
    cursor2.execute("""
    SELECT *
    FROM userregistry
    WHERE username = ? AND password = ?
    """, (inputData["username"], inputData["password"]))
    result = cursor2.fetchone()
    if (result):
        return("Login successful!")
    else:
        return("No matching account found.")



app.run()
