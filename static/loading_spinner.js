const wrapper = document.querySelector('.qr-loading-spinner');
const spinner = document.querySelector('.qr-loading-spinner');

function showSpinner() {
    spinner.style.display = 'flex';
    wrapper.style.background = 'rgba(0, 0, 0, 0.7)';
}

function hideSpinner() {
    spinner.style.display = 'none';
    wrapper.style.background = 'none';
}

export default { showSpinner, hideSpinner };