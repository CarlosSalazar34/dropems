document.addEventListener("DOMContentLoaded", () => {
    const nameElement = document.getElementById("username-header");
    const username = document.getElementById('username');

    if (nameElement && username) {
        const nameText = nameElement.innerText;
        let index = 0;

        username.innerHTML = "Bienvenido ";

        const interval = setInterval(() => {
            if (index < nameText.length) {
                username.innerHTML += nameText[index];
                index++;
            } else {
                clearInterval(interval);
            }
        }, 100); 
    }
});
