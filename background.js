(async () => {
    console.log('background.js is running'); // 서비스 워커 시작 확인용 로그

    const capabilities =
        await chrome.aiOriginTrial.languageModel.capabilities();
    console.log('Capabilities:', capabilities); // 모델 상태 확인용 로그

    if (capabilities.available === 'after-download') {
        console.log('Downloading model...');
        const session = await chrome.aiOriginTrial.languageModel.create({
            monitor(m) {
                m.addEventListener('downloadprogress', (e) => {
                    console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
                });
            },
        });
        console.log('Model download complete.');
    } else if (capabilities.available === 'readily') {
        console.log('Model is readily available.');
    } else {
        console.log('Model is not available.');
    }
})();
