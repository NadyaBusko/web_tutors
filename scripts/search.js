function searchRepetitors() {
    var query = document.getElementById('search').value;
    fetch(`http://localhost:4444/repetitors/${query}`)
        .then(response => response.json())
        .then(function(data) {
            var repetitors = document.getElementById('repetitors');
            repetitors.innerHTML = '';

            if (data.surname !== undefined) {
                var div = document.createElement('div');
                div.setAttribute("class", "repetitor");
                div.innerHTML = `
                <img src="../resources/${data.coverUrl}" alt="Фото репетитора" height="300px">
                <p><strong>${data.surname} ${data.name}</strong></p>
                <p>преподает с ${data.experience} года</p>
                <p>${data.programmes}</p>
                <p><i>Предмет: </i>${data.subjects}</p>
                <p><i>${data.email}</i></p>
                <button class="mainbutton" data-repetitor='${JSON.stringify(data)}'>Отправить заявку</button>
                `;
                repetitors.appendChild(div);
            } else {
                repetitors.innerHTML = '<h3>Репетитор не найден</h3>';
            }

            const buttons = document.querySelectorAll('.repetitor button.mainbutton');
            buttons.forEach((button) => {
                button.addEventListener('click', () => {
                    const selectedRepetitor = JSON.parse(button.getAttribute('data-repetitor')); // Получаем данные о выбранном репетиторе из атрибута кнопки
                    sessionStorage.setItem('selectedRepetitor', JSON.stringify(selectedRepetitor)); // Сохраняем данные в sessionStorage
                    window.location.href = "../pages/application.html";
                });
            });
        })
        .catch(err => console.error('Ошибка получения данных'));
}

document.getElementById('search').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        searchRepetitors();
    }
});