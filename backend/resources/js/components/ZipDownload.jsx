import { saveAs } from 'file-saver';
import JSZip from 'jszip';

function ZipDownload(files, title) {
    console.log('Copy', files);

    var zip = new JSZip();

    files.forEach((file, index) => {
        zip.file(`QR_${index}.xlsx`, file);
    });
    zip.generateAsync({ type: 'blob' }).then((content) => {
        saveAs(content, title);
    });
}
export default ZipDownload;
