const loginButton = document.getElementById("login");
const whiteButton = document.querySelectorAll(".white-button");
const loginPopup = document.getElementById("login-popup");
const closeLoginPopup = document.getElementById("close-login-popup");
const usernameInputField = document.getElementById("username-input");
const passwordInputField = document.getElementById("password-input");
const submitLoginPopup = document.getElementById("submit-login-popup");
const createAccountPopup = document.getElementById("create-account-popup");

// validates the user's input credentials against the backend json registry
function submitLogin()
{
    // close the popup.
    loginPopup.style.display = "none";
    // fetch query to authenticate user credentials
    let status;
    fetch("/loginaccount",
    {
        method: "POST",
        headers:
        {
            "Content-type": "application/json"
        },
        body: JSON.stringify
        (
            {
                username: usernameInputField.value,
                password: passwordInputField.value
            }
        )
    }).then(response=>response.text()).then
    (response=> 
        {
            status = response;
            if (status == "Login successful!")
            {
                alert("Successfully logged in!");
            }
            else
            {
                alert("No matching credentials found.");
            }
        }
    );
    resetLoginFields();
    loginPopup.style.display = "none";
}
function resetLoginFields()
{
    usernameInputField.value = "Enter username...";
    passwordInputField.value = "Enter password...";
}

function createAccount()
{
    fetch("/createaccount", 
    {
        method: "POST",
        headers: 
        {
            "Content-type": "application/json"
        },
        body: JSON.stringify
        (
            {
                username: usernameInputField.value,
                password: passwordInputField.value
            }
        )
    });
    alert("Account successfully created!");
    resetLoginFields();
    loginPopup.style.display = "none";
}

loginButton.addEventListener("click", function()
{
    loginPopup.style.display= "flex";
});

whiteButton.forEach(element => {
    element.addEventListener("click", function(){
        loginPopup.style.display = "flex";
    });
});

closeLoginPopup.addEventListener("click", function()
{
    loginPopup.style.display = "none";
});

usernameInputField.addEventListener("click", function()
{
    usernameInputField.value = "";
});
passwordInputField.addEventListener("click", function()
{
    passwordInputField.value = "";  
});

submitLoginPopup.addEventListener("click", function()
{
    if (usernameInputField.value == "Enter username...")
    {
        alert("Please fill out all required fields.");
    }
    else
    {
        submitLogin();
    }
    
});
createAccountPopup.addEventListener("click", function()
{
    if (passwordInputField.value == "Enter password...")
    {
        alert("Please fill out all required fields.");
    }
    else
    {
        createAccount();
    }
});
