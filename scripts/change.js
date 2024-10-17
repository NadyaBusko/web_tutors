var repetitorData = JSON.parse(sessionStorage.getItem('itemToChange'));

document.querySelector('input[name="name"]').value = repetitorData.name;
document.querySelector('input[name="surname"]').value = repetitorData.surname;
document.querySelector('input[name="email"]').value = repetitorData.email;
document.querySelector('input[name="experience"]').value = repetitorData.experience;
document.querySelector('input[name="person"]').value = repetitorData.person,
document.querySelector('select[name="subjects"]').value = repetitorData.subjects,
document.querySelector('select[name="programmes"]').value = repetitorData.programmes,

document.getElementById('change').addEventListener('click', async function(event){
    event.preventDefault();

    const form = document.querySelector('.change');

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const formData = new FormData(form);
    var fileInput = document.getElementById('cover');

    var repetitor = {
        coverUrl: fileInput.files.length > 0 ? fileInput.files[0].name : '',
        name: formData.get('name'),
        surname: formData.get('surname'),
        email: formData.get('email'),
        experience: formData.get('experience'),
        person: formData.get('person'),
        subjects: formData.get('subjects'),
        programmes: formData.get('programmes'),
    };

    try {
        const response = await fetch(`http://localhost:4444/repetitors/change/${repetitorData.surname}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(repetitor),
        });

        const data = await response.json();

        if (!response.ok) {
            console.log(response);
            console.log(data);
            alert(data.message);
        }

        if (fileInput.files.length > 0) {
            const file = fileInput.files[0];
            const formDataFile = new FormData();
            formDataFile.append('image', file);
            
            const response1 = await fetch("http://localhost:4444/resource", {
                method: "POST",
                body: formDataFile,
            });
            
            const data1 = await response1.json();
            
            if (!response1.ok) {
                alert(data1.message);
                
            }
        }
        console.log("ОТРЕДАКТИРОВАНO");
        alert("Репетитор отредактирован!");
        window.location.href = "../pages/main.html";
       } catch (error) {
        console.error(error);
        alert("Произошла ошибка.");
    }
})

