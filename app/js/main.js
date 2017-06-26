
// подключаем слайдер
$( '.slider__carousel' ).owlCarousel( {

    loop: true,
    margin: 100,
    center: true,
    nav: true,
    autoplay: true,
    items: 1

} );

$( '.solution__items' ).owlCarousel( {

    loop: false,
    margin: 10,
    nav: false,
    dots: false,
    responsive: {

        0: {items: 1},
        900: {items: 3},
        1200: {items: 3}

    }

} );


// стилизация селектов
$( 'select' ).each( function() {

    $( this ).siblings( 'p' ).text( $( this ).children('option:selected').text() );
} );

$( 'select' ).change( function() {

    $( this ).siblings( 'p' ).text( $( this ).children('option:selected').text() );
} );

