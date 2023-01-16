window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.menu'),
    menuItem = document.querySelectorAll('.menu_item'),
    hamburger = document.querySelector('.hamburger');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('hamburger_active');
        menu.classList.toggle('menu_active');
    });

    menuItem.forEach(item => {
        item.addEventListener('click', () => {
            hamburger.classList.toggle('hamburger_active');
            menu.classList.toggle('menu_active');
        })
    })
    $('[data-modal=consultation]').on('click', function(){
        $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function(){
        $('.overlay, #consultation, #thanks').fadeOut('slow');
   
    });
    
    
    function valideForms(form){
        $('form').validate({
            rules: {
               name: {
                  required: true,
                  minlength: 2
               },
               phone: "required", 
               email: {
                required:true,
                email:true
               }
            },
            messages: {
                name: {
                    required: "Будь-ласка,введіть своє ім'я",
                    minlength: jQuery.validator.format("Введіть мінімум {0} символа!")
                },
                phone: "Будь-ласка,введіть свій номер телефону",
                email: {
                required: "Будь-ласка,введіть свою електронну пошту",
                email: "Невірно введена поштова адреса"
                }
              }
            });          
    };
    valideForms('.feed-form');
    
    $('input[name=phone]').mask("+3(999) 999-99-99");

     $('.feed-form').submit(function(e) {
        e.preventDefault();

        if (!$(this).valid()) {
            return;
        }
        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
        
            $(this).find("input").val("");
            $('#consultation').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');
            
            $('.feed-form').trigger('reset');
        });
        return false;
    });
});


