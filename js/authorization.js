let form = document.forms.login;
let emailElem = form.email;
let passElem = form.password;

async function getToken() {
 
    try {
        let response = await fetch("https://ajax.test-danit.com/api/v2/cards/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email: `${emailElem.value}`, password: `${passElem.value}` })
        })
        // .then(response => response.text())
        // .then(token => console.log(token))

        if (response.status === 401) {
            throw new Error("Incorrect username or password");
        }

        let token = await response.text();        
        localStorage.setItem('token', token);

        const loginBtn = document.querySelector('.header__btn-login');
        const createBtn = document.querySelector('.header__btn-create-visit');
        const noitems = document.querySelector('.main__items-text');
        const welcome = document.querySelector('.main__text-wrapper');

        loginBtn.classList.add('d-none');
        createBtn.classList.remove('d-none');
        noitems.classList.remove('d-none');
        welcome.classList.add('d-none');


    } catch (err) {
        alert(err.message)
    }   
}

form.addEventListener('submit', (el) => {
    el.preventDefault(); 
    getToken();
})




