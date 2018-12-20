window.addEventListener("DOMContentLoaded", function () {

    var listInput = document.querySelector(".listValue");        //Выбираем поле ввода
    var addValue = document.querySelector(".addValue");          //Выбираем кнопку добавить пункт
    var list = document.querySelector(".list");                  //Выбирает список дел
    var localList;                                               //Переменная для хранения списка

    if(localStorage.getItem("list")){                            //Проверяем есть ли список в LocalStorage
        list.innerHTML = localStorage.getItem("list");           //Если есть выводим список
    };

    function toLocal(){                                          //Функция сохранения нашего списка в LocalStorage
        localList = list.innerHTML;
        localStorage.setItem("list", localList);
    }

    function createItem() {                                             //Функция добавления нового элемента в список
        var listValue = document.querySelector(".listValue").value;     //Выбираем текс из поля ввода
        var li = document.createElement('li');
        li.className = "list-item";                                     //Создаем элемент списка 
        li.innerHTML = listValue;                                       // с содержимым равным тексу в поле ввода
        var span = document.createElement("SPAN");                      //Создаем кнопку удаления элемента списка
        span.innerHTML = "\u00D7";                                      // с таким контентом
        span.className = "close";                                       // и таким классом
        li.appendChild(span);                                           //Добавляем кнопку в конец элемента списка
        if (listValue === "") {                                         //Проверяет значение в поле ввода
            alert("Введите текст!");                                     // если пустое выводим предупреждение
        } else {                                                      
            list.appendChild(li);                                       // иначе создаем элемент списка идобавляем его в конец списка
            document.querySelector(".listValue").value = "";            // и очищаем поле ввода  
        }
        toLocal();
    }

    listInput.addEventListener("keypress", function(ev){
        if(ev.keyCode === 13){
            createItem();
        }
    });

    addValue.addEventListener("click", createItem);         //Вызов функции добавления при клике на кнопку

    list.addEventListener("click", function (ev) {          //Делегирование обработки кливо по элементам которе еще не созданны
        if (ev.target.tagName === "LI") {
            ev.target.classList.toggle("checked");          //Клик по элементу списка
            toLocal();
        } else if (ev.target.tagName === "SPAN") {          //Клик по кнопке удалить элемент списка
            ev.target.parentNode.remove();
            toLocal();
        }
    });

});