const form = document.getElementById('generate-form');
const qr = document.getElementById('qrcode');

const onGenerateSubmit = (e) => {
    e.preventDefault();
    clearUI();

    const url = document.getElementById('url').value;
    const size = document.getElementById('size').value;

    if (url === '') {
        alert('Please enter a URL before submitting');
    } else{
        showSpinner();
        setTimeout(() => {
            hideSpinner();

            generateQRCode(url, size);

            setTimeout(()=>{
                const saveUrl = qr.querySelector('canvas').toDataURL();
                createSaveBtn(saveUrl);
            }, 50);

        }, 1000);
    }

    console.log(url, size);

};

const generateQRCode = (url, size) => {
    const qrcode = new QRCode('qrcode', {
        text: url,
        width: size,
        height: size,
    });
};

const showSpinner = () => {
    document.getElementById('spinner').style.display = 'block';
};

const hideSpinner = () => {
    document.getElementById('spinner').style.display = 'none';
};

const clearUI = () => {
    qr.innerHTML = '';

    const savebtn = document.getElementById('save-link');
    if (savebtn){
        savebtn.remove();
    }
};

const createSaveBtn = (saveUrl) => {
    const link = document.createElement('a');
    link.id = 'save-link';
    link.classList='bg-logo-blue hover:bg-light-blue text-white font-bold py-2 px-3 rounded w-1/3 m-auto mt-5'
    link.href = saveUrl;
    link.download = 'qrcode.png';
    link.innerHTML = 'Save Image';
    document.getElementById('generate').appendChild(link);
};

hideSpinner();

form.addEventListener('submit', onGenerateSubmit);
