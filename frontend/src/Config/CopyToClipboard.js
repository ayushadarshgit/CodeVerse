export default function CopyToClipboard(textToCopy) {
    const textarea = document.createElement('textarea');
    textarea.value = textToCopy;

    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';

    document.body.appendChild(textarea);

    textarea.select();
    document.execCommand('copy');

    document.body.removeChild(textarea);
}
