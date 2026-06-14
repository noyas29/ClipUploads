// ドラッグ＆ドロップエリアを取得
const dropArea = document.getElementById('dropArea');

// 実際にファイルを保持するinput[type="file"]を取得
const fileInput = document.getElementById('fileInput');

// 選択されたファイル名を表示する要素を取得
const fileName = document.getElementById('fileName');


// ==============================
// クリックでファイル選択画面を開く
// ==============================

// ドロップエリアがクリックされたら
dropArea.addEventListener('click', () => {

    // 隠しているinput[type="file"]をクリックする
    // → OS標準のファイル選択画面が開く
    fileInput.click();
});


// ==============================
// ファイル選択後の処理
// ==============================

// ファイルが選択されたら
fileInput.addEventListener('change', () => {

    // 1つ以上ファイルが選択されているか確認
    if (fileInput.files.length > 0) {

        // 選択された最初のファイル名を画面に表示
        fileName.textContent = fileInput.files[0].name;
    }
});


// ==============================
// ドラッグ中の見た目変更
// ==============================

// ファイルがドロップエリアに入った時（dragenter）
// または上を移動している時（dragover）
['dragenter', 'dragover'].forEach(eventName => {

    dropArea.addEventListener(eventName, e => {

        // ブラウザ標準の動作を無効化
        // （ファイルを開こうとする動作を防ぐ）
        e.preventDefault();

        // CSSクラスを追加して見た目を変更
        // 例：枠線の色を変える
        dropArea.classList.add('dragover');
    });
});


// ==============================
// ドラッグ終了時の見た目を元に戻す
// ==============================

// ドラッグがエリア外に出た時（dragleave）
// またはドロップされた時（drop）
['dragleave', 'drop'].forEach(eventName => {

    dropArea.addEventListener(eventName, e => {

        // ブラウザ標準の動作を無効化
        e.preventDefault();

        // dragoverクラスを削除して元の見た目に戻す
        dropArea.classList.remove('dragover');
    });
});


// ==============================
// ファイルがドロップされた時の処理
// ==============================

// ドロップされたら
dropArea.addEventListener('drop', e => {

    // ドロップされたファイル一覧を取得
    const files = e.dataTransfer.files;

    // ファイルが存在するか確認
    if (files.length > 0) {

        // ドロップされたファイルを
        // input[type="file"]にセットする
        // → form送信時に通常のファイル選択と同じように送信できる
        fileInput.files = files;

        // 選択されたファイル名を表示
        fileName.textContent = files[0].name;
    }
});