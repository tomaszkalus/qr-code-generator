
const alertPlaceholder = document.getElementById('color-info-placeholder');
const raise = () => {
    hide();
    const wrapper = document.createElement('div');
    wrapper.innerHTML = [
        `<div class="alert alert-warning alert-dismissible" role="alert">`,
        `   <div>The contrast between color may be too small so the QR code may not be detectable.</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('');

    alertPlaceholder.append(wrapper);
};

const hide = () => {
    alertPlaceholder.innerHTML = '';
}

const contrastWarning = { raise, hide };

export default contrastWarning;

