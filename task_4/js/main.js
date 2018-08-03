var main = new Vue({
    el: '#main',
    data: {
        country: null,
        arCountries:[],
        result: '',
        showResult: false,
    },
    created: function() {//get countries list on page load
        Ajax('getCountries=1', GetCountryListAjax);
    },
    methods: {
        AddCountry: function(){
            if(this.country){
                request = 'country=' + this.country;
                Ajax(request, AddCountryAjax);
            } else {
                this.result = 'Пустая строка';
                ShowResult();
            }
        },
    },
});