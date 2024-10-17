document
  .getElementById("authorization")
  .addEventListener("click", async (event) => {
    event.preventDefault();

    const form = document.querySelector('.auth');//код получает элемент формы с классом "reg" из DOM
    const formData = new FormData(form);

    var user = {   //Создается объект "user" с двумя свойствами: "email" и "password". Значения этих свойств берутся из данных формы
        email: formData.get('email'),
        password: formData.get('password'),
    }


    /*Здесь происходит отправка POST-запроса на указанный URL ("http://localhost:4444/auth/login")
    с использованием Fetch API. В запросе передаются заголовки, указывающие, что данные отправляются
    в формате JSON, а также тело запроса, которое содержит сериализованный в JSON объект "user"*/
    try { 
      const response = await fetch("http://localhost:4444/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
       // credentials: 'include', 
      });
      const data = await response.json(); 


      if (response.ok) {    

        sessionStorage.setItem('fullName', data.fullName);
        sessionStorage.setItem('role', data.role);
        sessionStorage.setItem('email', data.email);
         window.location.href = "../pages/main.html";
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Произошла ошибка при входе, попробуйте еще раз.");
    }
  });