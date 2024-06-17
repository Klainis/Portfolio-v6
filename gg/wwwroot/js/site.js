// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.



$(document).ready(function () {
	$("#optionsRadios1").change(function () {
		$('.hide').fadeIn().show();
	});

	$("#optionsRadios2").change(function () {
		$('.hide').fadeOut(300);
	});
})


// Функция для переключения вкладок
function openCity(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Открываем вкладку по умолчанию
document.getElementById("defaultOpen").click();

// Обработчик для ссылок внутри вкладок
document.addEventListener('click', function (e) {
    // Проверяем, что это ссылка с якорем
    if (e.target.tagName === 'A' && e.target.href.includes('#')) {
        var hash = e.target.href.split('#')[1]; // Получаем ID из href
        var targetElement = document.getElementById(hash);

        if (targetElement) {
            // Находим родительский элемент, который является вкладкой
            var tab = targetElement.closest('.tabcontent');
            if (tab) {
                // Определяем ID вкладки
                var tabId = tab.id;
                // Находим кнопку, которая открывает эту вкладку
                var tabButton = document.querySelector(`button[onclick*="${tabId}"]`);
                if (tabButton) {
                    tabButton.click(); // Открываем вкладку
                }

                // Прокручиваем к нужному блоку
                setTimeout(function () {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }, 100); // Небольшая задержка, чтобы вкладка успела открыться
            }
            // Останавливаем стандартное поведение ссылки
            e.preventDefault();
        }
    }
});

function toggleEdit(num) {
    var editableDiv = document.getElementById('editable' + num);
    var button = document.getElementById('editButton' + num);

    if (editableDiv.contentEditable == 'true') {
        editableDiv.contentEditable = 'false';
        button.textContent = 'Редактировать';
    } else {
        editableDiv.contentEditable = 'true';
        button.textContent = 'Закончить редактирование';
    }
}




let currentYear, currentMonth;

// Функция для создания календаря
function createCalendar(year, month) {
    const calendarDiv = document.getElementById('calendar');
    const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    const monthDays = new Date(year, month + 1, 0).getDate(); // количество дней в месяце
    const firstDayIndex = new Date(year, month, 1).getDay(); // индекс первого дня недели
    const lastDayIndex = new Date(year, month, monthDays).getDay(); // индекс последнего дня недели

    const firstDayOffset = firstDayIndex === 0 ? 6 : firstDayIndex - 1; // смещение первого дня недели
    const lastDayOffset = lastDayIndex === 0 ? 6 : lastDayIndex - 1; // смещение последнего дня недели

    // Определяем количество строк таблицы
    const totalRows = Math.ceil((firstDayOffset + monthDays) / 7);

    // Создание таблицы календаря
    let calendarHTML = `<table>
                            <caption>${monthNames[month]} ${year}</caption>
                            <tr>
                                <th>Пн</th>
                                <th>Вт</th>
                                <th>Ср</th>
                                <th>Чт</th>
                                <th>Пт</th>
                                <th>Сб</th>
                                <th>Вс</th>
                            </tr>`;

    let day = 1;

    // Заполнение таблицы днями месяца
    for (let i = 0; i < totalRows; i++) {
        calendarHTML += '<tr>';
        for (let j = 0; j < 7; j++) {
            if ((i === 0 && j < firstDayOffset) || (i === totalRows - 1 && j > lastDayOffset)) {
                calendarHTML += '<td></td>';
            } else {
                // Добавляем кнопку для каждой даты
                if (day <= monthDays) {
                    calendarHTML += `<td><button class="date-btn" onclick="openModal('${day}')">${day}</button></td>`;
                    day++;
                }
            }
        }
        calendarHTML += '</tr>';
    }

    calendarHTML += '</table>';

    calendarDiv.innerHTML = calendarHTML;
}

// Функция для отображения модального окна с выбранной датой
function openModal(date) {
    const modal = document.getElementById('myModal');
    const modalDate = document.getElementById('modalDate');
    modal.style.display = 'block';
    modalDate.textContent = `Выбранная дата: ${date}`;
}

// Функция для закрытия модального окна
function closeModal() {
    const modal = document.getElementById('myModal');
    modal.style.display = 'none';
}

// Функция для отображения предыдущего месяца
function prevMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    createCalendar(currentYear, currentMonth);
}

// Функция для отображения следующего месяца
function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    createCalendar(currentYear, currentMonth);
}

// Инициализация календаря с текущим месяцем
const currentDate = new Date();
currentYear = currentDate.getFullYear();
currentMonth = currentDate.getMonth();
createCalendar(currentYear, currentMonth); й




var images1 = [];
var images2 = [];
var currentIndex1 = 0;
var currentIndex2 = 0;

function allowDrop(event) {
    event.preventDefault();

}
function drop(event, containerId, imagesArray) {
    event.preventDefault();
    var data = event.dataTransfer;
    var file = data.files[0];

    if (file.type.match('image.*')) {
        var reader = new FileReader();
        reader.onload = function (e) {
            if (imagesArray === 'images1') {
                images1.push(e.target.result);
                currentIndex1 = images1.length - 1;
                updateImage(containerId, images1, currentIndex1);
            } else if (imagesArray === 'images2') {
                images2.push(e.target.result);
                currentIndex2 = images2.length - 1;
                updateImage(containerId, images2, currentIndex2);
            }
        };
        reader.readAsDataURL(file);
    } else {
        alert('Пожалуйста, выберите изображение.');
    }
}

function updateImage(containerId, imagesArray, currentIndex) {
    var image = document.getElementById(containerId).querySelector('img');
    image.src = imagesArray[currentIndex];
}

function previousImage(containerId, imagesArray) {
    if (imagesArray === 'images1') {
        if (currentIndex1 > 0) {
            currentIndex1--;
            updateImage(containerId, images1, currentIndex1);
        } else {
            alert('Это первое изображение.');
        }
    } else if (imagesArray === 'images2') {
        if (currentIndex2 > 0) {
            currentIndex2--;
            updateImage(containerId, images2, currentIndex2);
        } else {
            alert('Это первое изображение.');
        }
    }
}

function nextImage(containerId, imagesArray) {
    if (imagesArray === 'images1') {
        if (currentIndex1 < images1.length - 1) {
            currentIndex1++;
            updateImage(containerId, images1, currentIndex1);
        } else {
            alert('Это последнее изображение.');
        }
    } else if (imagesArray === 'images2') {
        if (currentIndex2 < images2.length - 1) {
            currentIndex2++;
            updateImage(containerId, images2, currentIndex2);
        } else {
            alert('Это последнее изображение.');
        }
    }
}

function handleDrop(event, containerId) {
    event.preventDefault();
    event.stopPropagation();

    // Получение файлов из события
    const files = event.dataTransfer.files;

    // Проверка, что это изображение
    if (files.length > 0 && files[0].type.startsWith('image/')) {
        const imageContainer = document.getElementById(containerId);
        const imagePreview = imageContainer.querySelector('img');

        // Создание объекта URL для файла изображения
        const file = files[0];
        const reader = new FileReader();

        // Считываем файл как Data URL
        reader.onload = function (event) {
            // Устанавливаем src изображения в Data URL
            imagePreview.src = event.target.result;
        };

        reader.readAsDataURL(file);
    } else {
        alert("Пожалуйста, перетащите файл изображения.");
    }
}



var currentTab = 0;
showTab(currentTab);

function showTab(n) {

    var x = document.getElementsByClassName("tab_reg");
    x[n].style.display = "block";
    if (n == 0) {
        document.getElementById("prevBtn").style.display = "none";
    } else {
        document.getElementById("prevBtn").style.display = "inline";
    }
    if (n == (x.length - 1)) {
        document.getElementById("nextBtn").innerHTML = "Submit";
    } else {
        document.getElementById("nextBtn").innerHTML = "Next";
    }
    fixStepIndicator(n)
}

function nextPrev(n) {
    var x = document.getElementsByClassName("tab_reg");
    if (n == 1 && !validateForm()) return false;
    x[currentTab].style.display = "none";
    currentTab = currentTab + n;
    if (currentTab >= x.length) {
        document.getElementById("regForm").submit();
        return false;
    }
    showTab(currentTab);
}

function validateForm() {
    var x, y, i, valid = true;
    x = document.getElementsByClassName("tab_reg");
    y = x[currentTab].getElementsByTagName("input");
    for (i = 0; i < y.length; i++) {
        if (y[i].value == "") {
            y[i].className += " invalid";
            valid = false;
        }
    }
    if (valid) {
        document.getElementsByClassName("step")[currentTab].className += " finish";
    }
    return valid;
}

function fixStepIndicator(n) {
    // This function removes the "active" class of all steps...
    var i, x = document.getElementsByClassName("step");
    for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
    }
    //... and adds the "active" class on the current step:
    x[n].className += " active";
}





function toggleEdit(num) {
    var editableDiv = document.getElementById('editable' + num);
    var button = document.getElementById('editButton' + num);
    var originalityCounter = document.getElementById('originalityCounter' + num);

    if (editableDiv.contentEditable == 'true') {
        editableDiv.contentEditable = 'false';
        button.textContent = 'Редактировать';
        updateOriginality(num);
    } else {
        editableDiv.contentEditable = 'true';
        button.textContent = 'Закончить редактирование';
    }
}



// Функция для открытия чата
function openChat(userId) {
    // Скрыть все окна чатов
    let chatWindows = document.getElementsByClassName('chat-window');
    for (let window of chatWindows) {
        window.classList.remove('active');
    }

    // Показать выбранное окно чата
    let chatWindow = document.getElementById(userId);
    if (chatWindow) {
        chatWindow.classList.add('active');
    }
}

// Функция для отправки сообщения
function sendMessage(userId) {
    let inputElement = document.getElementById('message' + userId.charAt(0).toUpperCase() + userId.slice(1));
    let messageText = inputElement.value;

    if (messageText.trim() === '') {
        return; // Игнорировать пустые сообщения
    }

    // Найти окно чата и добавить новое сообщение
    let chatWindow = document.getElementById(userId).getElementsByClassName('chat-messages')[0];
    let newMessage = document.createElement('p');
    newMessage.innerHTML = `<strong>Вы:</strong> ${messageText}`;
    chatWindow.appendChild(newMessage);

    // Прокрутить вниз, чтобы показать новое сообщение
    chatWindow.scrollTop = chatWindow.scrollHeight;

    // Очистить поле ввода
    inputElement.value = '';
}

// Убедиться, что первый чат виден по умолчанию
document.addEventListener("DOMContentLoaded", function () {
    let firstChatWindow = document.querySelector('.chat-window');
    if (firstChatWindow) {
        firstChatWindow.classList.add('active');
    }
});