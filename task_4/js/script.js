function AddCountryAjax() {
    if(xhr.status === 200){
        if(xhr.responseText == 'error'){
            main.result = 'Ошибка записи';
        } else {
            main.result = 'Страна добавлена';
            main.arCountries.push(xhr.responseText);
            main.country = "";
        }
        ShowResult();
    }
}

function GetCountryListAjax () {
    if(xhr.status === 200){
        if(xhr.responseText == 'error'){
            main.result = 'Ошибка ошибка чтения списка стран';
        } else if (!xhr.responseText){
            main.result = 'Тут пусто, добавьте страны!';
        } else {
            arCountries = JSON.parse(xhr.responseText);
            for(i=0;i<arCountries.data.length;i++){
                main.arCountries.push(arCountries.data[i][0]);
            }
            main.result = 'Не хотите добавить немного стран?';
        }
        ShowResult();
    }
}

function Ajax(data){
    xhr = new XMLHttpRequest();
    path = '/php/ajax.php?';
    xhr.open('GET', path+data, true);
    xhr.onload = AddCountryAjax;
    xhr.send();
}

//show result block for 3 sec.
function ShowResult(){
    main.showResult = true;
    setTimeout(function(){
                main.showResult = false;
    },3000);
}

var main = new Vue({
    el: '#main',
    data: {
        country: null,
        arCountries:[],
        result: '',
        showResult: false,
    },
    created: function() {//get countries list on page load
        xhr = new XMLHttpRequest();
        path = '/php/ajax.php?';
        xhr.open('GET', path+'getCountries=1', true);
        xhr.onload = GetCountryListAjax;
        xhr.send();
    },
    methods: {
        AddCountry: function(){
            if(this.country){
                request = 'country=' + this.country;
                Ajax(request);
            } else {
                this.result = 'Пустая строка';
                ShowResult();
            }
        },
    },
});