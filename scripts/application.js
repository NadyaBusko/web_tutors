document.addEventListener("DOMContentLoaded", () => {
    const repetitor = JSON.parse(sessionStorage.getItem('selectedRepetitor'));

    if (repetitor) {
        document.getElementById('email').value = repetitor.email;
        document.getElementById('name').value = repetitor.name;
        document.getElementById('surname').value = repetitor.surname;
        document.getElementById('subjects').value = repetitor.subjects;
        document.getElementById('programmes').value = repetitor.programmes;
    } else {
        console.log("No repetitor data found in sessionStorage.");
    }
});

document.getElementById("addApplication").addEventListener("click", async (event) => {
    event.preventDefault();

    const form = document.querySelector('.add-application');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    if (!(form instanceof HTMLFormElement)) {
        console.error('Selected element is not a form.');
        return;
    }
    const formData = new FormData(form);

    const application = {
        useremail: formData.get('useremail'),
        userName: formData.get('userName'),
        email: formData.get('email'),
        name: formData.get('name'),
        surname: formData.get('surname'),
        subjects: formData.get('subjects'),
        programmes: formData.get('programmes'),
        status: 'Еще не рассмотрена',
    };

    try {
        const response = await fetch("http://localhost:4444/applications", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(application),
        });

        const data = await response.json();

        if (!response.ok) {
            alert(data.message);
        } else {
            console.log("Заявка добавлена");
            alert("Заявка успешно отправлена");
            window.location.href = "../pages/main.html";
        }

    } catch (error) {
        console.error(error);
        alert("Произошла ошибка при отправке заявки");
    }
});