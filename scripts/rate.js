function sortRepetitors() {
    fetch('http://localhost:4444/repetitors/sort/requests')
        .then(response => response.json())
        .then(function(data) {
            var repetitors = document.getElementById('repetitors');
            repetitors.innerHTML = '';

            data.forEach(repetitor => {
                var row = document.createElement('tr');
                row.setAttribute("class", "styleforentrance");

                row.innerHTML = `
                <td>${repetitor.surname}</td>
                <td>${repetitor.name}</td>
                <td>${repetitor.requestCount}</td>
                `;
                repetitors.appendChild(row); 
            });
        })
        .catch(err => console.error('Ошибка получения данных', err));
}
sortRepetitors();