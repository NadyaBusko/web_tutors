document
  .getElementById("registration")
  .addEventListener("click", async (event) => {
    event.preventDefault();
    const role = sessionStorage.getItem('role');
    const fullName = sessionStorage.getItem('fullname');
    var newrole;
    if(role==='admin'){ //Если "fullName" существует (т.е. пользователь уже аутентифицирован)
      newrole = 'admin';
    }
    else if (role==='tutor'){
      newrole = 'tutor';
    }
    else {
      newrole = 'user';
    }

    /*Создается объект "user" с четырьмя свойствами: "fullName", "email", "password" и "role". 
    Значения этих свойств берутся из данных формы и переменной "newrole" */

    const form = document.querySelector('.registr');

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
  }
  
    const formData = new FormData(form);

    var user = {
        fullName: formData.get('name'),
        email: formData.get('email'),
        password: formData.get('password'),
        role: newrole,
    }

    try {
      const response = await fetch("http://localhost:4444/auth/registr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();


      /*Здесь проверяется успешность запроса. Если статус ответа "response.ok" равен true (то есть запрос был успешным) 
      и "fullName" не существует (т.е. пользователь только что зарегистрирован), то выполняется блок кода внутри первой 
      фигурной скобки. Если "fullName" существует (т.е. пользователь уже аутентифицирован), то выполняется блок кода внутри 
      второй фигурной скобки. В противном случае выполняется блок кода внутри третьей фигурной скобки*/

      if (response.ok && !fullName) {
        sessionStorage.setItem('fullName', data.fullName); //Здесь сохраняется значение свойства "fullName" из полученного объекта "data" в объекте sessionStorage
        sessionStorage.setItem('role', data.role);
        window.location.href = "../pages/main.html";
      } else if(fullName){
        window.location.href = "../pages/main.html";
      }else{
        alert(data.message);
      }
    } catch (error) {
      console.error("Ошибка:", error);
      alert("Произошла ошибка при входе. Пожалуйста, попробуйте еще раз.");
    }
  });