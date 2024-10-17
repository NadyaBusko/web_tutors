function sortRepetitors() {
    var sortBy1 = document.getElementById('choice1').value;
    var sortBy2 = document.getElementById('choice2').value;
    var sortBy3 = document.getElementById('choice3').value;

    fetch(`http://localhost:4444/repetitors/sort/${sortBy1}/${sortBy2}/${sortBy3}`)
    .then(response => response.json())
    .then(function(data) {
        var repetitors = document.getElementById('repetitors');
        repetitors.innerHTML = '';

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
                console.log("hereeee");
                sessionStorage.setItem('selectedRepetitor', JSON.stringify(selectedRepetitor)); // Сохраняем данные в sessionStorage
                window.location.href = "../pages/application.html";
            });
        })
    })
        .catch(err => console.error('Ошибка получения данных', err));
}

const but = document.getElementById('sort');

but.addEventListener('click', function(event){
    event.preventDefault();
    sortRepetitors();
});