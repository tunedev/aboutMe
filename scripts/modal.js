$(document).ready(function () {
  // MODAL
  var modalText = {
    toga: {
      title: 'Toga Device Insurance',
      tag: 'Insure-tech platform',
      detail:
        'Toga Insurance is a platform that eases the process of getting an insurance in africa, it gives user insurance at their fingertips and also educate the users on the benefits of insurance.',
      link: 'https://toga.com.ng',
    },
    authorsHaven: {
      title: 'Authors Haven',
      tag: 'Platform for the creative at heart.',
      detail:
        'Authors Haven gives tech inclined writers a platform to express their thoughts on subjects, which helps keep the tech community growing and better.',
      link: 'http://persephone-frontend-staging.herokuapp.com/',
    },
    banka: {
      title: 'Banka',
      tag: 'Lite bank app that powers banking transactions',
      detail:
        'Banka is a lite banking app that is (work in progress) meant to power daily banking transactions like withdrawal, deposit and the likes.',
      link: 'https://tunedev.github.io/Banka/ui/',
    },
    onlineShop: {
      title: 'Online-Shop',
      tag: 'Ecommerce',
      detail:
        'Online shop is a code along project with wesbos advance react app that i intend to extend to look like https://mnml.la/.',
      link: 'https://online-shop-next.now.sh/',
    },
    onlineShopServer: {
      title: 'Online-Shop-backend',
      tag: 'Ecommerce',
      detail:
        'Online shop is a code along project with wesbos advance react app that i intend to extend to look like https://mnml.la/.',
      link: 'https://github.com/tunedev/Online_shop_backend',
    },
    qustomar: {
      title: 'Qustomar',
      tag: 'Issue tracker',
      detail:
        'An issue ticketing platform that enables companies to track their SLA’s and other issues from start to finish seamlessly.',
    },
  };

  $('#gallery .button').on('click', function () {
    fillModal(this.id);
    $('.modal-wrap').addClass('visible');
  });

  $('.close').on('click', function () {
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  $('.mask').on('click', function () {
    $('.modal-wrap, #modal .button').removeClass('visible');
  });

  var carousel = $('#carousel'),
    slideWidth = 700,
    threshold = slideWidth / 3,
    dragStart,
    dragEnd;

  setDimensions();

  $('#next').click(function () {
    shiftSlide(-1);
  });
  $('#prev').click(function () {
    shiftSlide(1);
  });

  carousel.on('mousedown', function () {
    if (carousel.hasClass('transition')) return;
    dragStart = event.pageX;
    $(this).on('mousemove', function () {
      dragEnd = event.pageX;
      $(this).css('transform', 'translateX(' + dragPos() + 'px)');
    });
    $(document).on('mouseup', function () {
      if (dragPos() > threshold) {
        return shiftSlide(1);
      }
      if (dragPos() < -threshold) {
        return shiftSlide(-1);
      }
      shiftSlide(0);
    });
  });

  function setDimensions() {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      slideWidth = $(window).innerWidth();
    }
    $('.carousel-wrap, .slide').css('width', slideWidth);
    $('.modal').css('max-width', slideWidth);
    $('#carousel').css('left', slideWidth * -1);
  }

  function dragPos() {
    return dragEnd - dragStart;
  }

  function shiftSlide(direction) {
    if (carousel.hasClass('transition')) return;
    dragEnd = dragStart;
    $(document).off('mouseup');
    carousel
      .off('mousemove')
      .addClass('transition')
      .css('transform', 'translateX(' + direction * slideWidth + 'px)');
    setTimeout(function () {
      if (direction === 1) {
        $('.slide:first').before($('.slide:last'));
      } else if (direction === -1) {
        $('.slide:last').after($('.slide:first'));
      }
      carousel.removeClass('transition');
      carousel.css('transform', 'translateX(0px)');
    }, 700);
  }

  function fillModal(id) {
    $('#modal .title').text(modalText[id].title);
    $('#modal .detail').text(modalText[id].detail);
    $('#modal .tag').text(modalText[id].tag);
    if (modalText[id].link)
      $('#modal .button')
        .addClass('visible')
        .parent()
        .attr('href', modalText[id].link);

    $.each($('#modal li'), function (index, value) {
      $(this).text(modalText[id].bullets[index]);
    });
    $.each($('#modal .slide'), function (index, value) {
      $(this).css({
        background:
          "url('img/slides/" + id + '-' + index + ".png') center center/cover",
        backgroundSize: 'cover',
      });
    });
  }
});
