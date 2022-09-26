function autoUp() {
    let btnUp = document.querySelector('[data-qa = "resume-update-button_actions"]');
    btnUp.click();
    console.log('Первый клик')
    setTimeout(() => {
        let btnClose = document.querySelector('[data-qa = "bot-update-resume-modal__close-button"');
        btnClose.click();
        console.log('Окно закрыто')
    }, 1000)
    setInterval(() => {
    btnUp.click();
    console.log('Повторный клик');
    setTimeout(() => {
        btnClose.click();
        console.log('Окно закрыто');
    }, 1000);
}, 20000);
}

autoUp();