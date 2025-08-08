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



async function toggleButton(id) {

    const nota = document.getElementById('nota').value;
    const desahogo = document.getElementById('desahogo').value;

    const ViewTransitionClass = 'vt-element-animation';
    const ViewTransitionClassClosing = 'vt-element-animation-closing';
    if (!id) {
        const openDialog = document.querySelector('dialog[open]');
        const originElement = document.querySelector("[origin-element]");

        openDialog.style.viewTransitionName = 'vt-shared';
        openDialog.style.viewTransitionClass = ViewTransitionClassClosing;

        const ViewTransition = document.startViewTransition(() => {
            originElement.style.viewTransitionName = 'vt-shared';
            originElement.style.viewTransitionClass = ViewTransitionClassClosing;

            openDialog.style.viewTransitionName = '';
            openDialog.style.viewTransitionClass = '';


            openDialog.close();

        })

        await ViewTransition.finished;

        originElement.style.viewTransitionName = '';
        originElement.style.viewTransitionClass = '';

        const response = await fetch("http://127.0.0.1:5000/publish-note", {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                note: nota,
                description: desahogo
            })
        });

        const data = await response.json();
        console.log(data);




        // openDialog.close();
        return false;
    }

    const dialog = document.getElementById(id);
    const originElement = event.currentTarget;


    dialog.style.viewTransitionName = 'vt-shared';
    dialog.style.viewTransitionClass = ViewTransitionClass;

    originElement.style.viewTransitionName = 'vt-shared';
    originElement.style.viewTransitionClass = ViewTransitionClass;

    originElement.setAttribute('origin-element', '');

    const ViewTransition = document.startViewTransition(() => {
        originElement.style.viewTransitionName = '';
        originElement.style.viewTransitionClass = '';
        dialog.showModal();
    })

    await ViewTransition.finished

    dialog.style.viewTransitionName = '';
    dialog.style.viewTransitionClass = '';


}






