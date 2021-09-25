


async function login(email, password)
{
    console.log("Searching for " + email + " " + password)
    document.getElementById("loginBtn").style.visibility = "hidden"

    data = await getData('users', email)

    if(data.length != 0)
    {
        if(password == data.password)
        {
            saveCreds(data.username, email, password)
            console.log("Success")
            document.getElementById("loginBtn").style.visibility = "visible"
            location.href = "/account.html"
            return "Success"
        }

        console.log('Password does not match')
        document.getElementById("loginBtn").style.visibility = "visible"
        return 'Password does not match'
        
    }

    console.log("Account does not exist")
    document.getElementById("loginBtn").style.visibility = "visible"
    return 'Does not exist'
}

async function signUp(username, email, password, repeatedPassword)
{
    document.getElementById("signupBtn").style.visibility = "hidden"
    console.log(email)
    if(password == repeatedPassword)
    {

        data = await getData('users', email)

        if(data.length != 0)
        {
            document.getElementById("signupBtn").style.visibility = "visible"
            console.log("Email in use")
            return 'Email in use'
        }

        dataSet = {username: username, email: email, password: password}

        setData('users', email, dataSet)

        saveCreds(username, email, password)

        console.log("Success")
        location.href = "/account.html"
        return 'Success'


    }

    document.getElementById("signupBtn").style.visibility = "visible"
    console.log("Passwords do not match")
    return 'Passwords do not match'
}

function saveCreds(username, email, password)
{
    Cookies.set('email', email, { expires: 30 })
    Cookies.set('password', password, { expires: 30 })
    Cookies.set('username', username, { expires: 30 })
}