document.getElementById("add").addEventListener("click", async (event) => {
    event.preventDefault();

    const form = document.querySelector('.add');

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
        requestCount: 0,
    };
    try {
        const response = await fetch("http://localhost:4444/repetitors", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(repetitor),
        });

        const data = await response.json();

        if (!response.ok) {
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
        console.log("ДОБАВЛЕНО");
        window.location.href = "../pages/main.html";


    } catch (error) {
        console.error(error);
        alert("Произошла ошибка");
    }
});