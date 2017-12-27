﻿//document.addEventListener('DOMContentLoaded', function () {
//    var checkPageButton = document.getElementById('checkPage');
//    checkPageButton.addEventListener('click', function () {
//        chrome.tabs.getSelected(null, function (tab) {
//            d = document;

//            var f = d.createElement('form');
//            f.action = 'http://gtmetrix.com/analyze.html?bm';
//            f.method = 'post';
//            var i = d.createElement('input');
//            i.type = 'hidden';
//            i.name = 'url';
//            i.value = tab.url;
//            f.appendChild(i);
//            d.body.appendChild(f);
//            f.submit();
//        });
//    }, false);
//}, false);
var preloader = $('#wrapped');
var tokenKey = "tokenInfo";
var user = getCookie("username");
var password = getCookie("password");
if (user || password) {
    var email = getCookie("username");
    var password = getCookie("password");
    login(email, password, preloader, function (data) {
        sessionStorage.setItem(tokenKey, data.access_token);
        document.location.href = "main.html";
    });

} else {
    $(document).ready(function () {
        $('#but-Sign-In').click(function (e) {
            e.preventDefault();
            var email = $('#emailLogin').val();
            var password = $('#passwordLogin').val();
            login(email, password, preloader, function (data) {
                sessionStorage.setItem(tokenKey, data.access_token);
                setCookie("username", email);
                setCookie("password", password);
                document.location.href = "main.html";
            });
        });
    });
}

$(function () {
    
    $('#but-Sign-Up').click(function (e) {
        e.preventDefault();
        var data = {
            Email: $('#inputEmail').val(),
            Password: $('#inputPassword').val(),
            ConfirmPassword: $('#inputPasswordConfirmation').val()
        };

        $.ajax({
            type: 'POST',
            url: 'http://localhost:54049/api/Account/Register/',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            beforeSend: function () {
                preloader.css('display', 'block');
            },
            complete: function () {
                preloader.css('display', 'none');
            },
            success: function (data) {
                alert("Всё норм");
            },
            fail: function (data) {
                alert(data.responseText);
            },
            error: function (data) {
                alert(data.responseText);
            }
        });
    });
    
    //var loginData = {
    //    grant_type: 'password',
    //    username: $('#emailLogin').val(),
    //    password: $('#passwordLogin').val()
    //};
    //var ajaxData = {
    //    type: 'POST',
    //    url: 'http://localhost:54049/Token',
    //    data: loginData,
    //    beforeSend: function () {
    //        preloader.css('display', 'block');
    //    },
    //    complete: function () {
    //        preloader.css('display', 'none');
    //    },
    //    success: function (data) {
    //        sessionStorage.setItem(tokenKey, data.access_token);
    //        document.location.href = "main.html";
    //    },
    //    fail: function (data) {
    //        alert(data.responseText);
    //    },
    //    error: function (jqXHR, textStatus, errorThrown) {
    //        alert(jqXHR.responseText || textStatus);
    //    }
    //};

    //$.ajax(ajaxData);


    $('#forgot-pass').click(function () {
        $("#main-section").fadeOut('1000');
        setTimeout(function () {
            $('#add-section').fadeIn('1000');
        }, 500);
    });
    $('#ok').click(function () {
        $('#wrapped').fadeOut('1000');
        setTimeout(function () {
            $('#main-section').fadeIn('1000');
        }, 500);
    });
    $('#cancle').click(function () {
        $("#add-section").fadeOut('1000');
        setTimeout(function () {
            $('#main-section').fadeIn('1000');
        }, 500);
    });
    $('#send-new-pass').click(function (e) {
        e.preventDefault();
        var data = {
            Email: $('#emailToSend').val()
        };

        $.ajax({
            type: 'POST',
            url: 'http://localhost:54049/api/Account/ForgotPassword/',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            beforeSend: function () {
                preloader.css('display', 'block');
            },
            complete: function () {
                preloader.css('display', 'none');
            },
            success: function () {
                alert("Вам отправлено письмо с новым паролем");
            },
            fail: function (data) {
                alert(data.responseText);
            },
            error: function (data) {
                alert(data.responseText);
            }
        });
    });
    $('#getItemsButton').click(function (e) {
        e.preventDefault();
        $.ajax({
            type: 'GET',
            url: 'http://localhost:54049/api/Values/GetValues',
            //     datatype: 'jsonp',
            beforeSend: function (xhr) {
                var token = sessionStorage.getItem(tokenKey);
                xhr.setRequestHeader("Authorization", "Bearer " + token);
            },
            success: function (data) {
                alert(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert(jqXHR.responseText || textStatus);
            }
        });
    });
    /////////////////////////////////////дальше код, который пока не подключён
    $('#logOut').click(function (e) {
        e.preventDefault();
        sessionStorage.removeItem(tokenKey);
    });


});
//document.addEventListener('DOMContentLoaded', function () {
//    document.querySelector('#submitLogin').addEventListener('click', clickHandler);
//    main();
//});