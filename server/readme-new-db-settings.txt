בוצעו שינויים בבסיס הנתונים. ראשית עליך להתקין על המחשב שלך פוסטגרס דרך הלינק הבא:
https://www.postgresql.org/
צריך לוודא שמתקינים לפי המדריך הבא:
https://www.youtube.com/watch?v=0n41UTkOBb0

add a server with the "register server" button in pgadmin app.
register should be with the username and password you used for instalation.
once the server is created, right click and select restore.
copy the path (with the file name) of the "star-backup-final" file in the server folder in our star application.
select all the options on the top part of the option page, when restoring the server.
after you restore make sure all the tables exist in the server.
now make sure the DBconfig.js file has the correct info to connect to the db.
everytging should work now. :-)

after all tables are restored, delete the week_number column in soldier table , and creat a new column with the same name, fill all rows with dummy data of '1'- there was a bug in the column.