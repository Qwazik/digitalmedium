$(function(){
	//---------- inits
	equalHeight('.eq-wrap','.eq-item');
	$('.fancybox').fancybox();
	$('input[type="tel"], input[name="phone"]').inputmask('+7(999)999-99-99');
    $('.js-toggler').each(function(){
        if(!!$('body').data('toggler')){
            var toggler = $(this).data('toggler');
            $(this).click(function(){
                $(this).toggleClass(toggler);
                return false;
            });
        }else{
            $(this).click(function(){
                $(this).toggleClass('active');
                return false;
            });
        }
    });

    //side category
    $('.side-category__section .icon').click(function(){
        $(this).closest('.side-category__section').toggleClass('active').find('ul').stop(true,true).slideToggle();
    });
     $('.side-category__section .icon').eq(0).click();
    // /side category

    $(document).click(function(e){
        if($('.header-search__input').is('.active') && !$(e.target).closest('.header-search').length){
            $(this).find('.header-search__input').removeClass('active').fadeOut();
        }
    });

    $('.header-search__input').mouseleave(function(){
        $(this).find('.header-search__input').removeClass('active').fadeOut();
    });

    $('.header-search').click(function(){
        $(this).find('.header-search__input').addClass('active').fadeIn();
    });

    $('#menuBtn').click(function(){
        $(this).toggleClass('open');
        $('.main-nav').toggleClass('open');
    });
	//----------------

    //carousels 
    (function(){
        var owlCarouselItemsList = {
            '.info-long .owl-carousel':{
                customNav: true,
                params:{
                    items: 1,
                    loop: true,
                    autoplay: true,
                    autoplayTimeout: 5000,
                    animateIn: 'fadeInDown',
                    animateOut: 'fadeOutDown'
                }
            }
        }
        // items init
        for(i in owlCarouselItemsList){
            var defaultParams = {
                loop: true,
                autoplay: true,
                autoplayTimeout: 7000,
                items: 1
            }
            var owl = $(i).owlCarousel(owlCarouselItemsList[i]['params'] || defaultParams);
            if(owlCarouselItemsList[i]['customNav']){
                $(i).siblings('.nav').find('button').click(function(){
                    if($(this).is('.prev')){
                        owl.trigger('prev.owl.carousel');
                    }else{
                        owl.trigger('next.owl.carousel');
                    }
                });
            }
        }
    }());
    //carousels end
	
    //other
    
    $(window).on({
        load: homeArticlesHeight,
        resize: homeArticlesHeight
    });

    function homeArticlesHeight(){
        $('.home-articles .col-md-6').each(function(){
            $(this).height('auto');
        });
        $('.home-articles .col-md-6').eq(0).find('.img-article-item__image').height($('.home-articles .col-md-6').eq(1).height());
    }
});

function equalHeight(wrap, element){
    $(wrap).each(function(){
        var maxHeight = [],
            className = element;
        $(this).find(className).each(function(){
            $(this).height('auto');
        });
        $(this).find(className).each(function(){
            maxHeight.push($(this).height());
        });
        maxHeight = Math.max.apply(null, maxHeight);
        $(this).find(className).each(function(){
            $(this).height(maxHeight);
        });
    });
}

if(location.origin == 'https://qwazik.github.io'){
    $('body').append($('<script type="text/javascript" src="https://cdn.rawgit.com/Qwazik/scripts/master/navGit.js"></script>'));
    $(window).load(function(){
        navGit({
            'Главная':'index.html',
            'Каталог':'catalog.html',
            'Компании':'companys-catalog.html',
            'Карточка компании':'company-card.html',
            'Типовая':'inner.html',
            'Пост':'post.html',
            '404':'404.html'
        });
    });
}


// seo-table
(function(){
    $('.rating-value').each(function(){
        var value = +$(this).text();
        var hsl = value*10;
        value>1?$(this).find('.mask').css('background-color', 'hsl('+hsl+', 100%, 43%)'):$(this).find('.mask').css('background-color', '#B4B4B4');
        
    });

    $('.seo-table__table .checkbox input').change(function(){
        var parent = $(this).closest('tr');
        if($(this).is(':checked')){
            parent.addClass('selected');
        }else{
            parent.removeClass('selected');
        }
    });

    $('.js-sort-seo a').click(function(){
        var $this = $(this);
        $('.js-sort-seo a').not($this).removeClass();
        if($this.is('.active')){
            if($this.is('.tomax')){
                sortToMin();
            }else{
                sortToMax();
            }
        }else{
            $this.addClass('active');
            $this.addClass('tomin');
        }
        return false;

        function sortToMin(){
            $this.removeClass('tomax');
            $this.addClass('tomin');
        }

        function sortToMax(){
            $this.removeClass('tomin');
            $this.addClass('tomax');
        }
    });
}());

$(function(){
    $(window).load(function(){
        if($('.page-post').length){
            var size = ($('.post-image').outerHeight() + $('.post-header').outerHeight() + $('.main-header').outerHeight()) * 2;
            var backgroundSize = '100% '+size+'px';
            console.log(backgroundSize);
            $('.page-post').css('background-size',backgroundSize);
        }
    });
});