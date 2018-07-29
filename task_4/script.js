function Ajax(data){
    xhr = new XMLHttpRequest();
    path = '/php/ajax.php?';
    xhr.open('GET', path+data, true);
    xhr.onload = function (e) {
        if(xhr.status === 200){
            if(xhr.responseText != 'ok'){
                main.result = 'Ошибка записи';
            } else {
                main.result = 'Страна добавлена';
                main.arCountries.push(main.country);
                main.country = "";
            }
            ShowResult();
        }
    } 
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
        xhr.onload = function (){
            if(xhr.status === 200){
                if(xhr.responseText == 'error'){
                    main.result = 'Ошибка ошибка чтения списка стран';
                } else if (!xhr.responseText){
                    main.result = 'Тут пусто, добавьте страны!';
                } else {
                    arCountries = xhr.responseText.split(/\$/);
                    for(country in arCountries){
                        main.arCountries.push(arCountries[country]);
                    }
                }
                ShowResult();
            } 
        };
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