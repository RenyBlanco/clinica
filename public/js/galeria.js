$(window).load( function(){
    //  Responsive
    $('#galeria').carouFredSel({
        auto: false,
        responsive: true,
        width: '100%',      
        scroll: 1,
        prev: '#prev',
        next: '#prox',
        pagination: false,
        mousewheel: false,
        swipe: {
            onMouse: true,
            onTouch: true
        },
        items: {
            width:380,
            height: 'auto', // Para ajustar la altura
            visible: {
                min: 2,
                max: 2
            }
        }
    });
});