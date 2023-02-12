import contrast from "./color_contrast.js";
import contrastWarning from "./contrast_warning.js";
import spinner from "./loading_spinner.js";

const btn = document.getElementById('submit_btn');
const download_btn = document.getElementById('download-btn');

btn.addEventListener('click', async (e) => {
  spinner.showSpinner();
  e.preventDefault();
  const text = document.getElementById('text_input').value;
  const style = Array.from(document.querySelectorAll('.btn-check')).filter(e => { return e.checked; })[0].id;

  const fg = document.getElementById('fg-picker').value;
  const bg = document.getElementById('bg-picker').value;


  const rawResponse = await fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text, style, fg, bg })
  });

  const content = await rawResponse.json();
  show_qr(content.qr);
  spinner.hideSpinner();

});

download_btn.addEventListener('click', () => {
  const img = document.getElementById('qr_code_img').src;
  downloadQR(img, "qrcode");
});

function show_qr(b64) {
  const wrapper = document.querySelector('#qr_wrapper');
  const img = wrapper.querySelector('#qr_code_img');
  wrapper.style.visibility = 'visible';
  img.src = "data:image/png;base64, " + b64;
}

function downloadQR(src, fileName) {
  const linkSource = src;
  const downloadLink = document.createElement("a");
  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  downloadLink.click();
}


document.getElementById("fg-picker").addEventListener("change", e => {
  const fg = document.getElementById('fg-picker').value;
  const bg = document.getElementById('bg-picker').value;

  if (contrast.calculate_contrast_ratio(fg, bg) > 0.25){
    contrastWarning.raise();
  }
  else{

    contrastWarning.hide();
  }
});

document.getElementById('color-swap-btn').addEventListener('click', swapColors);

function swapColors(){
  const temp = document.getElementById('fg-picker').value;
  document.getElementById('fg-picker').value = document.getElementById('bg-picker').value;
  document.getElementById('bg-picker').value = temp;
}



