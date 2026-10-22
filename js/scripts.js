/*!
* Start Bootstrap - Resume v7.0.6 (https://startbootstrap.com/theme/resume)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-resume/blob/master/LICENSE)
*/
window.addEventListener('DOMContentLoaded', function () {
    const root = document.documentElement;
    const languageSelect = document.getElementById('langSelect');
    const themeToggle = document.getElementById('themeToggle');
    const navbarToggler = document.querySelector('.navbar-toggler');

    function readPreference(key) {
        try {
            return localStorage.getItem(key);
        } catch (error) {
            return null;
        }
    }

    function savePreference(key, value) {
        try {
            localStorage.setItem(key, value);
        } catch (error) {
            // The current page still works when browser storage is unavailable.
        }
    }

    function setLanguage(language) {
        const selectedLanguage = language === 'en' ? 'en' : 'es';
        root.lang = selectedLanguage;
        document.querySelectorAll('[data-es][data-en]').forEach(function (element) {
            element.textContent = element.dataset[selectedLanguage];
        });
        if (languageSelect) {
            languageSelect.value = selectedLanguage;
            languageSelect.setAttribute('aria-label', selectedLanguage === 'en' ? 'Language' : 'Idioma');
        }
        const controls = document.querySelector('.site-controls');
        if (controls) {
            controls.setAttribute('aria-label', selectedLanguage === 'en' ? 'Page preferences' : 'Preferencias de la página');
        }
        if (themeToggle) {
            const label = selectedLanguage === 'en' ? 'Toggle theme' : 'Cambiar tema';
            themeToggle.setAttribute('aria-label', label);
            themeToggle.setAttribute('title', label);
        }
        if (navbarToggler) {
            navbarToggler.setAttribute('aria-label', selectedLanguage === 'en' ? 'Open navigation' : 'Abrir navegación');
        }
        savePreference('lang', selectedLanguage);
    }

    const savedLanguage = readPreference('lang');
    setLanguage(savedLanguage === 'en' ? 'en' : 'es');

    if (languageSelect) {
        languageSelect.addEventListener('change', function () {
            setLanguage(languageSelect.value);
        });
    }

    function setTheme(theme) {
        const selectedTheme = theme === 'dark' ? 'dark' : 'light';
        root.setAttribute('data-theme', selectedTheme);
        savePreference('theme', selectedTheme);
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
        });
    }

    const savedTheme = readPreference('theme');
    setTheme(savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));

    document.querySelectorAll('#navbarResponsive .nav-link').forEach(function (navLink) {
        navLink.addEventListener('click', function () {
            if (navbarToggler && window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });
});
