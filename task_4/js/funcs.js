//add country to db and add to country list
function AddCountryAjax() {
    if(xhr.status === 200){
        if(xhr.responseText === 'error'){
            main.result = 'Ошибка записи';
        } else {
            main.result = 'Страна добавлена';
            main.arCountries.push(xhr.responseText);
            main.country = "";
        }
        ShowResult();
    }
}

//show all countries in db and result message
function GetCountryListAjax () {
    console.log(xhr.status);
    if(xhr.status === 200) {
        if (xhr.responseText === 'error') {
            main.result = 'Ошибка ошибка чтения списка стран';
        } else if (!xhr.responseText) {
            main.result = 'Тут пусто, добавьте страны!';
        } else {
            arCountries = JSON.parse(xhr.responseText);
            for (i = 0; i < arCountries.data.length; i++) {
                main.arCountries.push(arCountries.data[i][0]);
            }
            main.result = 'Не хотите добавить немного стран?';
        }

    } else if(xhr.status === 404){
        main.result = 'Сервер не доступен';
    }
    ShowResult();
}
//send ajax requests
function Ajax(data, onloadFunc){
    xhr = new XMLHttpRequest();
    path = '/php/ajax.php?';
    xhr.open('GET', path+data, true);
    xhr.onload = onloadFunc;
    xhr.send();
}

//show result block for 3 sec.
function ShowResult(){
    main.showResult = true;
    setTimeout(function(){
        main.showResult = false;
    },3000);
}
