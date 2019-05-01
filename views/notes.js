name: {type: String, required: true}
email: {type: String, required: true, unique: true}

unique is an id which will be generated and stored fro specific string.
we can define string length i.e (min-length, max-length) it validates the input and if it doesnt match it will note be stored.

refer: mongoose documents for authentication part.(shared in google drive )

while updating the document the validators will be false by default and in order to make it validate we should pass (runvalidator: true)

encrypting the password and storing it in database.
mongoose have certain predefined hooks or mongoose validators.

(bcrypt) is installed and used to encrypt the password.
both sync and async functions are available in bcrypt.


// login and verifying authentication 
read an article about cookie and session.
cookies stored on the browser side and session stored on the servr side.
read npm package express flash.

controller and authorization.

to learn ecpress refer mdn tutorial on express. 

// electron js clock.