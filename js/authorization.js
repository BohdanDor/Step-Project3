
export async function getToken() {

    const form = document.forms.login;
    const emailElem = form.email;
    const passElem = form.password;
 
    try {
        let response = await fetch("https://ajax.test-danit.com/api/v2/cards/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: `${emailElem.value}`, password: `${passElem.value}` })
        })

        if (response.status === 401) {
            throw new Error("Incorrect username or password");
        }

        let token = await response.text();        
        localStorage.setItem('token', token);
        

    } catch (err) {
        alert(err.message)
    }   
}






