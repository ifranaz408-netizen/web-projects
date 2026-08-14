
/* =========================================================
   PIXELFORGE IMAGE EDITOR
   Pure HTML + CSS + JavaScript
   No AI / No Background Remover
========================================================= */


/* =========================================================
   01. DOM ELEMENTS
========================================================= */

const dropZone =
    document.getElementById("dropZone");

const uploadContent =
    document.getElementById("uploadContent");

const previewArea =
    document.getElementById("previewArea");

const canvas =
    document.getElementById("canvas");

const ctx =
    canvas.getContext("2d");

const fileInput =
    document.getElementById("fileInput");

const browseButton =
    document.getElementById("browseButton");

const changeImageButton =
    document.getElementById("changeImageButton");

const downloadButton =
    document.getElementById("downloadButton");

const resetButton =
    document.getElementById("resetButton");

const statusText =
    document.getElementById("status");

const emptyState =
    document.getElementById("emptyState");

const originalInfo =
    document.getElementById("originalInfo");

const outputInfo =
    document.getElementById("outputInfo");

const formatInfo =
    document.getElementById("formatInfo");

const fileSizeInfo =
    document.getElementById("fileSizeInfo");

const formatSelect =
    document.getElementById("format");

const widthInput =
    document.getElementById("width");

const heightInput =
    document.getElementById("height");

const lockRatioButton =
    document.getElementById("lockRatio");

const blurInput =
    document.getElementById("blur");

const blurValue =
    document.getElementById("blurValue");

const qualityInput =
    document.getElementById("quality");

const qualityValue =
    document.getElementById("qualityValue");

const fitMode =
    document.getElementById("fitMode");

const rotateLeftButton =
    document.getElementById("rotateLeft");

const rotateRightButton =
    document.getElementById("rotateRight");

const flipHorizontalButton =
    document.getElementById("flipHorizontal");

const flipVerticalButton =
    document.getElementById("flipVertical");


/* =========================================================
   02. APPLICATION STATE
========================================================= */

const state = {

    image: null,

    file: null,

    originalWidth: 0,

    originalHeight: 0,

    width: 0,

    height: 0,

    ratio: null,

    ratioLocked: true,

    blur: 0,

    quality: 90,

    format: "image/png",

    rotation: 0,

    flipX: 1,

    flipY: 1,

    fitMode: "contain"

};


/* =========================================================
   03. INITIALIZATION
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateUI();

    }
);


/* =========================================================
   04. FILE INPUT
========================================================= */

if (browseButton) {

    browseButton.addEventListener(
        "click",
        () => {

            fileInput.click();

        }
    );

}


if (changeImageButton) {

    changeImageButton.addEventListener(
        "click",
        () => {

            fileInput.click();

        }
    );

}


fileInput.addEventListener(
    "change",
    (event) => {

        const file =
            event.target.files[0];

        if (!file) {
            return;
        }

        loadImage(file);

    }
);


/* =========================================================
   05. DRAG & DROP
========================================================= */

[
    "dragenter",
    "dragover"
].forEach(
    (eventName) => {

        dropZone.addEventListener(
            eventName,
            (event) => {

                event.preventDefault();

                event.stopPropagation();

                dropZone.classList.add(
                    "dragging"
                );

            }
        );

    }
);


[
    "dragleave",
    "drop"
].forEach(
    (eventName) => {

        dropZone.addEventListener(
            eventName,
            (event) => {

                event.preventDefault();

                event.stopPropagation();

                dropZone.classList.remove(
                    "dragging"
                );

            }
        );

    }
);


dropZone.addEventListener(
    "drop",
    (event) => {

        const files =
            event.dataTransfer.files;

        if (!files || !files.length) {
            return;
        }

        const file =
            files[0];

        if (
            !file.type.startsWith("image/")
        ) {

            showStatus(
                "Please upload an image file."
            );

            return;
        }

        loadImage(file);

    }
);


/* =========================================================
   06. LOAD IMAGE
========================================================= */

function loadImage(file) {

    if (
        !file.type.startsWith("image/")
    ) {

        showStatus(
            "Invalid image file."
        );

        return;
    }


    state.file =
        file;


    const reader =
        new FileReader();


    reader.onload =
        (event) => {

            const img =
                new Image();


            img.onload =
                () => {

                    state.image =
                        img;

                    state.originalWidth =
                        img.naturalWidth;

                    state.originalHeight =
                        img.naturalHeight;

                    state.width =
                        img.naturalWidth;

                    state.height =
                        img.naturalHeight;

                    state.ratio =
                        img.naturalWidth /
                        img.naturalHeight;

                    state.rotation =
                        0;

                    state.flipX =
                        1;

                    state.flipY =
                        1;

                    state.blur =
                        0;

                    state.quality =
                        90;

                    state.format =
                        "image/png";

                    state.fitMode =
                        "contain";


                    /* Update controls */

                    formatSelect.value =
                        "image/png";

                    widthInput.value =
                        state.width;

                    heightInput.value =
                        state.height;

                    blurInput.value =
                        0;

                    qualityInput.value =
                        90;

                    fitMode.value =
                        "contain";


                    /* Show preview */

                    if (uploadContent) {

                        uploadContent.style.display =
                            "none";

                    }


                    if (previewArea) {

                        previewArea.style.display =
                            "flex";

                    }


                    if (emptyState) {

                        emptyState.style.display =
                            "none";

                    }


                    canvas.style.display =
                        "block";


                    downloadButton.disabled =
                        false;


                    updateUI();

                    renderImage();

                    showStatus(
                        "Image loaded successfully."
                    );

                };


            img.onerror =
                () => {

                    showStatus(
                        "Could not load this image."
                    );

                };


            img.src =
                event.target.result;

        };


    reader.onerror =
        () => {

            showStatus(
                "Could not read image file."
            );

        };


    reader.readAsDataURL(file);

}


/* =========================================================
   07. RENDER IMAGE
========================================================= */

function renderImage() {

    if (!state.image) {

        return;

    }


    const image =
        state.image;


    const outputWidth =
        Math.max(
            1,
            Number(state.width) ||
            image.naturalWidth
        );


    const outputHeight =
        Math.max(
            1,
            Number(state.height) ||
            image.naturalHeight
        );


    const angle =
        (
            (state.rotation % 360) +
            360
        ) % 360;


    const rotated =
        angle === 90 ||
        angle === 270;


    const canvasWidth =
        rotated
            ? outputHeight
            : outputWidth;


    const canvasHeight =
        rotated
            ? outputWidth
            : outputHeight;


    canvas.width =
        canvasWidth;

    canvas.height =
        canvasHeight;


    /*
       Clear canvas.

       PNG remains transparent.
    */

    ctx.clearRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    /*
       JPG does not support transparency.
       Give JPG a white background.
    */

    if (
        state.format === "image/jpeg"
    ) {

        ctx.fillStyle =
            "#ffffff";

        ctx.fillRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

    }


    ctx.save();


    /*
       Center
    */

    ctx.translate(
        canvas.width / 2,
        canvas.height / 2
    );


    /*
       Rotation
    */

    ctx.rotate(
        angle * Math.PI / 180
    );


    /*
       Flip
    */

    ctx.scale(
        state.flipX,
        state.flipY
    );


    let drawWidth =
        outputWidth;

    let drawHeight =
        outputHeight;


    /*
       CONTAIN
    */

    if (
        state.fitMode === "contain"
    ) {

        const scale =
            Math.min(
                outputWidth /
                    image.naturalWidth,

                outputHeight /
                    image.naturalHeight
            );


        drawWidth =
            image.naturalWidth *
            scale;


        drawHeight =
            image.naturalHeight *
            scale;

    }


    /*
       COVER
    */

    else if (
        state.fitMode === "cover"
    ) {

        const scale =
            Math.max(
                outputWidth /
                    image.naturalWidth,

                outputHeight /
                    image.naturalHeight
            );


        drawWidth =
            image.naturalWidth *
            scale;


        drawHeight =
            image.naturalHeight *
            scale;

    }


    /*
       STRETCH
    */

    else if (
        state.fitMode === "stretch"
    ) {

        drawWidth =
            outputWidth;

        drawHeight =
            outputHeight;

    }


    /*
       Blur
    */

    ctx.filter =
        state.blur > 0
            ? `blur(${state.blur}px)`
            : "none";


    /*
       High quality
    */

    ctx.imageSmoothingEnabled =
        true;

    ctx.imageSmoothingQuality =
        "high";


    /*
       Draw image
    */

    ctx.drawImage(
        image,

        -drawWidth / 2,

        -drawHeight / 2,

        drawWidth,

        drawHeight
    );


    ctx.restore();


    ctx.filter =
        "none";


    updateOutputInfo();

}


/* =========================================================
   08. FORMAT CHANGE
========================================================= */

formatSelect.addEventListener(
    "change",
    () => {

        state.format =
            formatSelect.value;

        renderImage();

        updateUI();

    }
);


/* =========================================================
   09. WIDTH CHANGE
========================================================= */

widthInput.addEventListener(
    "input",
    () => {

        const width =
            Number(
                widthInput.value
            );


        if (
            !width ||
            width < 1
        ) {

            return;

        }


        state.width =
            width;


        if (
            state.ratioLocked &&
            state.ratio
        ) {

            const height =
                Math.round(
                    width /
                    state.ratio
                );


            state.height =
                Math.max(
                    1,
                    height
                );


            heightInput.value =
                state.height;

        }


        renderImage();

    }
);


/* =========================================================
   10. HEIGHT CHANGE
========================================================= */

heightInput.addEventListener(
    "input",
    () => {

        const height =
            Number(
                heightInput.value
            );


        if (
            !height ||
            height < 1
        ) {

            return;

        }


        state.height =
            height;


        if (
            state.ratioLocked &&
            state.ratio
        ) {

            const width =
                Math.round(
                    height *
                    state.ratio
                );


            state.width =
                Math.max(
                    1,
                    width
                );


            widthInput.value =
                state.width;

        }


        renderImage();

    }
);


/* =========================================================
   11. LOCK RATIO
========================================================= */

lockRatioButton.addEventListener(
    "click",
    () => {

        state.ratioLocked =
            !state.ratioLocked;


        lockRatioButton.classList.toggle(
            "active",
            state.ratioLocked
        );


        if (
            state.ratioLocked &&
            state.width > 0 &&
            state.height > 0
        ) {

            state.ratio =
                state.width /
                state.height;

        }

    }
);


/* =========================================================
   12. ASPECT RATIOS
========================================================= */

const ratioButtons =
    document.querySelectorAll(
        ".ratio-button"
    );


ratioButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                ratioButtons.forEach(
                    (btn) => {

                        btn.classList.remove(
                            "active"
                        );

                    }
                );


                button.classList.add(
                    "active"
                );


                const ratio =
                    button.dataset.ratio;


                /*
                   Free ratio
                */

                if (
                    ratio === "free"
                ) {

                    state.ratioLocked =
                        false;

                    state.ratio =
                        null;

                    lockRatioButton.classList.remove(
                        "active"
                    );

                    return;

                }


                const numericRatio =
                    Number(ratio);


                if (!numericRatio) {

                    return;

                }


                state.ratio =
                    numericRatio;

                state.ratioLocked =
                    true;


                lockRatioButton.classList.add(
                    "active"
                );


                const currentWidth =
                    Number(
                        widthInput.value
                    ) ||
                    state.width ||
                    1000;


                const newHeight =
                    Math.round(
                        currentWidth /
                        numericRatio
                    );


                state.width =
                    currentWidth;

                state.height =
                    newHeight;


                widthInput.value =
                    currentWidth;

                heightInput.value =
                    newHeight;


                renderImage();

            }
        );

    }
);


/* =========================================================
   13. BLUR
========================================================= */

blurInput.addEventListener(
    "input",
    () => {

        state.blur =
            Number(
                blurInput.value
            );


        blurValue.textContent =
            `${state.blur}px`;


        renderImage();

    }
);


/* =========================================================
   14. QUALITY
========================================================= */

qualityInput.addEventListener(
    "input",
    () => {

        state.quality =
            Number(
                qualityInput.value
            );


        qualityValue.textContent =
            `${state.quality}%`;

    }
);


/* =========================================================
   15. FIT MODE
========================================================= */

fitMode.addEventListener(
    "change",
    () => {

        state.fitMode =
            fitMode.value;

        renderImage();

    }
);


/* =========================================================
   16. ROTATE LEFT
========================================================= */

rotateLeftButton.addEventListener(
    "click",
    () => {

        state.rotation -=
            90;

        renderImage();

    }
);


/* =========================================================
   17. ROTATE RIGHT
========================================================= */

rotateRightButton.addEventListener(
    "click",
    () => {

        state.rotation +=
            90;

        renderImage();

    }
);


/* =========================================================
   18. FLIP HORIZONTAL
========================================================= */

flipHorizontalButton.addEventListener(
    "click",
    () => {

        state.flipX *=
            -1;

        renderImage();

    }
);


/* =========================================================
   19. FLIP VERTICAL
========================================================= */

flipVerticalButton.addEventListener(
    "click",
    () => {

        state.flipY *=
            -1;

        renderImage();

    }
);


/* =========================================================
   20. RESOLUTION PRESETS
========================================================= */

const presetButtons =
    document.querySelectorAll(
        ".preset-button"
    );


presetButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                const width =
                    Number(
                        button.dataset.width
                    );


                const height =
                    Number(
                        button.dataset.height
                    );


                if (
                    !width ||
                    !height
                ) {

                    return;

                }


                state.width =
                    width;

                state.height =
                    height;


                widthInput.value =
                    width;

                heightInput.value =
                    height;


                state.ratio =
                    width /
                    height;


                renderImage();

            }
        );

    }
);


/* =========================================================
   21. RESET
========================================================= */

resetButton.addEventListener(
    "click",
    () => {

        if (!state.image) {

            return;

        }


        state.width =
            state.originalWidth;

        state.height =
            state.originalHeight;


        state.ratio =
            state.originalWidth /
            state.originalHeight;


        state.ratioLocked =
            true;


        state.blur =
            0;


        state.quality =
            90;


        state.format =
            "image/png";


        state.rotation =
            0;


        state.flipX =
            1;


        state.flipY =
            1;


        state.fitMode =
            "contain";


        widthInput.value =
            state.width;

        heightInput.value =
            state.height;


        blurInput.value =
            0;

        qualityInput.value =
            90;


        formatSelect.value =
            "image/png";


        fitMode.value =
            "contain";


        blurValue.textContent =
            "0px";


        qualityValue.textContent =
            "90%";


        lockRatioButton.classList.add(
            "active"
        );


        ratioButtons.forEach(
            (button) => {

                button.classList.remove(
                    "active"
                );

            }
        );


        const freeButton =
            document.querySelector(
                '.ratio-button[data-ratio="free"]'
            );


        if (freeButton) {

            freeButton.classList.add(
                "active"
            );

        }


        renderImage();

        updateUI();

        showStatus(
            "Image settings reset."
        );

    }
);


/* =========================================================
   22. DOWNLOAD / CONVERT
========================================================= */

downloadButton.addEventListener(
    "click",
    () => {

        if (!state.image) {

            showStatus(
                "Please upload an image first."
            );

            return;

        }


        /*
           Render latest settings
        */

        renderImage();


        const selectedFormat =
            formatSelect.value;


        const extension =
            getExtension(
                selectedFormat
            );


        /*
           PNG does not need quality.
           JPG and WEBP use quality.
        */

        const quality =
            selectedFormat === "image/png"
                ? undefined
                : state.quality / 100;


        canvas.toBlob(
            (blob) => {

                if (!blob) {

                    showStatus(
                        "Image conversion failed."
                    );

                    return;

                }


                const downloadURL =
                    URL.createObjectURL(
                        blob
                    );


                const link =
                    document.createElement(
                        "a"
                    );


                link.href =
                    downloadURL;


                link.download =
                    `pixelforge-image-${Date.now()}.${extension}`;


                document.body.appendChild(
                    link
                );


                link.click();


                link.remove();


                updateFileSize(
                    blob
                );


                setTimeout(
                    () => {

                        URL.revokeObjectURL(
                            downloadURL
                        );

                    },
                    1000
                );


                showStatus(
                    `Downloaded as ${extension.toUpperCase()}`
                );

            },

            selectedFormat,

            quality
        );

    }
);


/* =========================================================
   23. GET EXTENSION
========================================================= */

function getExtension(
    format
) {

    switch (format) {

        case "image/jpeg":

            return "jpg";


        case "image/webp":

            return "webp";


        case "image/png":

        default:

            return "png";

    }

}


/* =========================================================
   24. OUTPUT INFORMATION
========================================================= */

function updateOutputInfo() {

    if (!state.image) {

        return;

    }


    const extension =
        getExtension(
            state.format
        );


    outputInfo.textContent =
        `${canvas.width} × ${canvas.height}`;


    formatInfo.textContent =
        extension.toUpperCase();


    originalInfo.textContent =
        `${state.originalWidth} × ${state.originalHeight}`;


    fileSizeInfo.textContent =
        state.file
            ? formatBytes(
                state.file.size
            )
            : "—";

}


/* =========================================================
   25. UPDATE FILE SIZE
========================================================= */

function updateFileSize(
    blob
) {

    if (!blob) {

        return;

    }


    fileSizeInfo.textContent =
        formatBytes(
            blob.size
        );

}


/* =========================================================
   26. FORMAT BYTES
========================================================= */

function formatBytes(
    bytes
) {

    if (
        !bytes ||
        bytes <= 0
    ) {

        return "0 KB";

    }


    const units = [
        "Bytes",
        "KB",
        "MB",
        "GB"
    ];


    const index =
        Math.floor(
            Math.log(bytes) /
            Math.log(1024)
        );


    const value =
        bytes /
        Math.pow(
            1024,
            index
        );


    return `${value.toFixed(
        index === 0
            ? 0
            : 1
    )} ${units[index]}`;

}


/* =========================================================
   27. UPDATE UI
========================================================= */

function updateUI() {

    if (blurValue) {

        blurValue.textContent =
            `${state.blur}px`;

    }


    if (qualityValue) {

        qualityValue.textContent =
            `${state.quality}%`;

    }


    if (formatInfo) {

        formatInfo.textContent =
            getExtension(
                state.format
            ).toUpperCase();

    }


    if (state.image) {

        if (originalInfo) {

            originalInfo.textContent =
                `${state.originalWidth} × ${state.originalHeight}`;

        }


        if (outputInfo) {

            outputInfo.textContent =
                `${state.width} × ${state.height}`;

        }

    }

}


/* =========================================================
   28. STATUS MESSAGE
========================================================= */

function showStatus(
    message
) {

    if (!statusText) {

        return;

    }


    statusText.textContent =
        message;


    clearTimeout(
        window.pixelForgeStatusTimer
    );


    window.pixelForgeStatusTimer =
        setTimeout(
            () => {

                if (state.image) {

                    statusText.textContent =
                        "Image Ready";

                }

            },
            3000
        );

}


/* =========================================================
   29. KEYBOARD SHORTCUTS
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        /*
           Ctrl + O
        */

        if (
            event.ctrlKey &&
            event.key.toLowerCase() === "o"
        ) {

            event.preventDefault();

            fileInput.click();

        }


        /*
           Ctrl + S
        */

        if (
            event.ctrlKey &&
            event.key.toLowerCase() === "s"
        ) {

            event.preventDefault();


            if (
                !downloadButton.disabled
            ) {

                downloadButton.click();

            }

        }


        /*
           Escape
        */

        if (
            event.key === "Escape"
        ) {

            dropZone.classList.remove(
                "dragging"
            );

        }

    }
);


/* =========================================================
   30. PREVENT BROWSER DEFAULT DROP
========================================================= */

window.addEventListener(
    "dragover",
    (event) => {

        event.preventDefault();

    }
);


window.addEventListener(
    "drop",
    (event) => {

        event.preventDefault();

    }
);


/* =========================================================
   31. INITIAL UI
========================================================= */

updateUI();
