document.addEventListener("DOMContentLoaded", function() {
    const fullName = sessionStorage.getItem('fullName');
    const useremail = sessionStorage.getItem('email');
    if (fullName) {

        //const upperfooter = document.getElementById("upperfooter");
        const exitButton = document.createElement('button');
        exitButton.id = 'exit';
        exitButton.className = 'mainbutton';
        exitButton.textContent = 'ВЫЙТИ';
        upperfooter.appendChild(exitButton);


        document.getElementById('exit').addEventListener('click', function() {
            window.location.href = "../pages/main.html";
            sessionStorage.clear();
        });
        
        const role = sessionStorage.getItem('role');
        if (role === 'user') {
            const main = document.getElementById("main");
            main.innerHTML = `<p><br>Здравствуйте, ${fullName}! Ваши отправленные заявки:</p>`;
            main.className = 'account';
            const applicationsContainer = document.createElement('div');
            applicationsContainer.id = 'applications';
            applicationsContainer.className = 'applicationWrap';
            main.appendChild(applicationsContainer);

            showApplications(useremail);
        }

        if (role === 'tutor') {
            console.log("hellooo");
            const main = document.getElementById("main");
            main.innerHTML = `<p><br>Добрый день, ${fullName}! Отправленные вам заявки:</p>`;
            main.className = 'account';
            const applicationsContainer = document.createElement('div');
            applicationsContainer.id = 'applications';
            applicationsContainer.className = 'applicationWrap';
            main.appendChild(applicationsContainer);

            showApplicationsForTutor(useremail);
        }

        if (role === 'admin') {
            const main = document.getElementById("main");

            const addButton = document.createElement('button');
            addButton.id = 'add';
            addButton.className = 'mainbutton';
            addButton.textContent = 'Добавить репетитора'; 
            main.innerHTML = `<p><br>Привет, админ ${fullName}!</p>`;
            main.className = 'account';
            main.innerHTML += '<br>';      
            main.appendChild(addButton);

            addButton.addEventListener('click', (event) => {
                event.preventDefault();
                window.location.href = "../pages/add.html";
            })
    
            const deleteButton = document.createElement('button');
            deleteButton.id = 'delete';
            deleteButton.className = 'mainbutton';
            deleteButton.textContent = 'Удалить репетитора';
            main.appendChild(deleteButton);

            deleteButton.addEventListener('click', function(event) {
                deleteButton.disabled = true;
                event.preventDefault();
                var form = document.getElementById('main');
                var input = document.createElement('input');
                input.type = 'text';
                input.id = 'for_delete';
                input.placeholder = 'Удалить репетитора:';
                input.placeholder = 'Фамилия удаляемого репетитора:';
                input.style.marginTop = '5px';
                input.style.marginLeft = '500px';
                input.style.marginRight = '500px';
                input.style.padding = '10px';
                input.style.border= '2px solid rgb(180, 179, 179)';
                input.style.borderRadius = '5px';
                form.parentNode.insertBefore(input, form.nextSibling);

                document.getElementById('for_delete').addEventListener('keypress', function(event) {
                    if (event.key === 'Enter') {
                        deleteButton.disabled = false;
                        var repetitorSurname = document.getElementById("for_delete").value;

                        fetch(`http://localhost:4444/repetitors/${repetitorSurname}`, {
                                method: 'POST'
                            })
                            .then(response => response.json())
                            .then(function(data) {
                                if (data.message) {
                                    alert(data.message);
                                } else {
                                    alert("Репетитор удален!");
                                    window.location.href = "../pages/main.html";
                                }
                            })
                            .catch(err => console.error('Ошибка при удалении:', err));
                    }
                });
            });

            const changeButton = document.createElement('button');
            changeButton.id = 'change';
            changeButton.className = 'mainbutton';
            changeButton.textContent = 'Изменить репетитора';
            main.appendChild(changeButton);

            changeButton.addEventListener('click', function(event) {
              changeButton.disabled = true;
                event.preventDefault();
                var form = document.getElementById('main');
                var input = document.createElement('input');
                input.type = 'text';
                input.id = 'for_change';
                input.placeholder = 'Фамилия редактируемого репетитора:';
                input.style.marginTop = '20px';
                input.style.marginLeft = '500px';
                input.style.marginRight = '500px';
                input.style.padding = '10px';
                input.style.border= '2px solid rgb(180, 179, 179)';
                input.style.borderRadius = '5px';
                form.parentNode.insertBefore(input, form.nextSibling);

                document.getElementById('for_change').addEventListener('keypress', function(event) {
                    if (event.key === 'Enter') {
                      changeButton.disabled = false;
                        var repetitorSurname = document.getElementById("for_change").value;

                        fetch(`http://localhost:4444/repetitors/${repetitorSurname}`)
                            .then(response => response.json())
                            .then(function(data) {
                                if (data.message) {
                                    alert(data.message);
                                } else {
                                    sessionStorage.setItem('itemToChange', JSON.stringify(data));
                                    window.location.href = "../pages/change.html";
                                }
                            })
                            .catch(err => console.error('Ошибка при изменении:', err));
                    }
                });
            });

            const adminButton = document.createElement('button');
            adminButton.id = 'admin';
            adminButton.className = 'mainbutton';
            adminButton.textContent = 'Добавить админа';
            main.appendChild(adminButton);

            adminButton.addEventListener('click', (event) => {
                event.preventDefault();
                window.location.href = "../pages/registration.html";
            });

            const tutorButton = document.createElement('button');
            tutorButton.id = 'tutor';
            tutorButton.className = 'mainbutton';
            tutorButton.textContent = 'Добавить аккаунт репетитора';
            main.appendChild(tutorButton);

            tutorButton.addEventListener('click', (event) => {
                event.preventDefault();
                sessionStorage.setItem('role', 'tutor');
                window.location.href = "../pages/registration.html";
            });
            
            const rateButton = document.createElement('button');
            rateButton.id = 'add';
            rateButton.className = 'mainbutton';
            rateButton.textContent = 'Рейтинг по запросам';  
            main.appendChild(rateButton);

            rateButton.addEventListener('click', (event) => {
                event.preventDefault();
                window.location.href = "../pages/rate.html";
            })
        }
    }
});