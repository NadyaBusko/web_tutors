function showRepetitors() {
    fetch('http://localhost:4444/repetitors')
        .then(response => response.json())
        .then(function(data) {
            var repetitors = document.getElementById('repetitors');

            data.forEach(repetitor => {
                var div = document.createElement('div');
                div.setAttribute("class", "repetitor");

                div.innerHTML = `
                <img src="../resources/${repetitor.coverUrl}" alt="Фото репетитора" height="300px">
                <p><strong>${repetitor.surname} ${repetitor.name}</strong></p>
                <p>преподает c ${repetitor.experience} года</p>
                <p>${repetitor.programmes}</p>
                <p><i>Предмет: </i>${repetitor.subjects}</p>
                <p><i>${repetitor.email}</i></p>
                <button class="mainbutton">Отправить заявку</button>
                `;
                if (repetitors) {repetitors.appendChild(div)};
                
            });

            const fullName = sessionStorage.getItem('fullName');

            const buttons = document.querySelectorAll('.repetitor button.mainbutton');
            buttons.forEach((button, index) => {
                button.addEventListener('click', () => {
                    const selectedRepetitor = data[index]; // Получаем данные о выбранном репетиторе
                    sessionStorage.setItem('selectedRepetitor', JSON.stringify(selectedRepetitor)); // Сохраняем данные в sessionStorage
                    window.location.href = "../pages/application.html";
                });
            })
        })
        .catch(err => console.error('Ошибка получения данных', err));
}

function showApplications(useremail) {
    fetch('http://localhost:4444/applications')
        .then(response => response.json())
        .then(function(data) {
            var applications = document.getElementById('applications');
            let k = 0;

            data.forEach(application => {
                if (application.useremail === useremail) {
                    var div = document.createElement('div');
                    div.setAttribute("class", "application");

                    if (application.status === 'одобрена') {
                        div.classList.add('approved');
                    } else if (application.status === 'отклонена') {
                        div.classList.add('rejected');
                    }

                    k=k+1;
                    div.innerHTML = `
                    <span>${application.surname} ${application.name}</span>
                    <span>${application.programmes}</span>
                    <span>${application.subjects}</span>
                    <span><i>${application.email}</i></span>
                    <span>Статус: ${application.status}</span>
                    <button class="mainbutton">Удалить</button>
                    `;
                    if (applications) {applications.appendChild(div)};
                    div.querySelector('.mainbutton').addEventListener('click', function() {
                        const applicationIdToDelete = application._id;
                        const confirmDelete = () => {
                            const isConfirmed = window.confirm('Вы действительно хотите удалить заявку?');
                            if (isConfirmed) {
                              // Здесь вы можете вызвать функцию deleteApplication
                              deleteApplication(applicationIdToDelete);
                            } else {
                              console.log('Удаление заявки отменено');
                            }
                          };
                        confirmDelete();
                    });
                    if (applications) {
                        applications.appendChild(div);
                    }
                }
                
            });
            if(k===0){
                var div = document.createElement('div');
                div.setAttribute("class", "application");
                div.innerHTML = `<span>У вас нет отправленных заявок</span>`;
                applications.appendChild(div);
            }           
        })
        .catch(err => console.error('Ошибка получения данных', err));
}

function showApplicationsForTutor(useremail) {
    fetch('http://localhost:4444/applications')
        .then(response => response.json())
        .then(function(data) {
            var applications = document.getElementById('applications');
            applications.innerHTML = ''; // очищаем содержимое перед добавлением новых заявок
            let k = 0;

            data.forEach(application => {
                if (application.email === useremail) {
                    k=k+1;
                    var div = document.createElement('div');
                    div.setAttribute("class", "application");

                    if (application.status === 'одобрена') {
                        div.classList.add('approved');
                    } else if (application.status === 'отклонена') {
                        div.classList.add('rejected');
                    }

                    div.innerHTML = `
                    <span>Отправитель: ${application.userName}</span>
                    <span><i>${application.useremail}</i></span>
                    <span>Статус: ${application.status}</span>
                    <button class="approve-btn">Одобрить</button>
                    <button class="reject-btn">Отклонить</button>
                    `;
                    applications.appendChild(div);

                    div.querySelector('.approve-btn').addEventListener('click', function() {
                        updateApplicationStatus(application._id, 'одобрена', useremail);
                    });

                    div.querySelector('.reject-btn').addEventListener('click', function() {
                        updateApplicationStatus(application._id, 'отклонена', useremail);
                    });
                }
            });
            if(k===0){
                var div = document.createElement('div');
                div.setAttribute("class", "application");
                div.innerHTML = `<span>У вас нет отправленных заявок</span>`;
                applications.appendChild(div);
            }
        })
        .catch(err => console.error('Ошибка получения данных', err));
}

function updateApplicationStatus(applicationId, status, useremail) {
    fetch(`http://localhost:4444/applications/${applicationId}/status`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: status })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Статус обновлен', data);
        // Обновляем список заявок после изменения статуса
        showApplicationsForTutor(useremail);
    })
    .catch(err => console.error('Ошибка обновления статуса', err));
}



const deleteApplication = async (id) => {
    fetch(`http://localhost:4444/applications/${id}`, {
        method: 'POST'
    })
    .then(response => response.json())
    .then(function(data) {
        if (data.message) {
            alert(data.message);
        } else {
            window.location.href = "../pages/main.html";
        }
    })
    .catch(err => console.error('Ошибка при удалении:', err));
  };


showRepetitors()
document.getElementById('authorization').addEventListener('click', function() {
    window.location.href = "../pages/authorization.html";
});
document.getElementById('registration').addEventListener('click', function() {
    window.location.href = "../pages/registration.html";
});