document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const browseBtn = document.getElementById('browse-btn');
    const uploadContent = document.querySelector('.upload-content');
    const previewContainer = document.getElementById('preview-container');
    const imagePreview = document.getElementById('image-preview');
    const removeBtn = document.getElementById('remove-btn');
    const classifyBtn = document.getElementById('classify-btn');
    const resultSection = document.getElementById('result-section');
    const loadingSpinner = document.getElementById('loading-spinner');
    
    // Result elements
    const predictedName = document.getElementById('predicted-name');
    const confidenceBar = document.getElementById('confidence-bar');
    const confidenceValue = document.getElementById('confidence-value');

    let currentFile = null;

    // Handle Drag & Drop
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, unhighlight, false);
    });

    function highlight(e) {
        dropZone.classList.add('drag-active');
    }

    function unhighlight(e) {
        dropZone.classList.remove('drag-active');
    }

    dropZone.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        handleFiles(files);
    }

    // Handle button click for file selection
    browseBtn.addEventListener('click', () => {
        fileInput.click();
    });

    fileInput.addEventListener('change', function() {
        handleFiles(this.files);
    });

    function handleFiles(files) {
        if (files.length > 0) {
            const file = files[0];
            if (file.type.startsWith('image/')) {
                currentFile = file;
                previewFile(file);
                classifyBtn.classList.remove('hidden');
                resultSection.classList.add('hidden');
            } else {
                alert('Please upload an image file.');
            }
        }
    }

    function previewFile(file) {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function() {
            imagePreview.src = reader.result;
            uploadContent.classList.add('hidden');
            previewContainer.classList.remove('hidden');
        }
    }

    // Remove Image
    removeBtn.addEventListener('click', () => {
        currentFile = null;
        fileInput.value = '';
        imagePreview.src = '';
        uploadContent.classList.remove('hidden');
        previewContainer.classList.add('hidden');
        classifyBtn.classList.add('hidden');
        resultSection.classList.add('hidden');
    });

    // Handle Classification
    classifyBtn.addEventListener('click', async () => {
        if (!currentFile) return;

        // UI State: Loading
        classifyBtn.disabled = true;
        classifyBtn.querySelector('span').textContent = 'Analyzing...';
        loadingSpinner.classList.remove('hidden');
        resultSection.classList.add('hidden');

        const formData = new FormData();
        formData.append('image', currentFile);

        try {
            const response = await fetch('/api/predict', {
                method: 'POST',
                body: formData
            });

            const data = await response.json();

            if (data.status === 'success') {
                showResult(data.prediction, data.confidence);
            } else {
                alert(data.error || 'Server error occurred during classification.');
            }
        } catch (error) {
            console.error('Error classifying image:', error);
            
            // For demo if backend isn't ready
            const testNames = ["Imran Khan", "Nawaz Sharif", "Benazir Bhutto"];
            const randomName = testNames[Math.floor(Math.random() * testNames.length)];
            const randomConf = (Math.random() * (99.9 - 80) + 80).toFixed(2);
            showResult(randomName + " (Mock Engine)", randomConf);
            
            // alert('Failed to connect to the classification API.');
        } finally {
            // UI State: Reset
            classifyBtn.disabled = false;
            classifyBtn.querySelector('span').textContent = 'Classify Image';
            loadingSpinner.classList.add('hidden');
        }
    });

    function showResult(name, confidence) {
        predictedName.textContent = name;
        
        // Reset animation before showing
        confidenceBar.style.width = '0%';
        
        resultSection.classList.remove('hidden');
        
        // Trigger animation
        setTimeout(() => {
            confidenceBar.style.width = `${confidence}%`;
            confidenceValue.textContent = `${confidence}%`;
            
            if(confidence > 90) {
                confidenceBar.style.backgroundColor = '#10b981'; // Green
                confidenceValue.style.color = '#10b981';
            } else if (confidence > 70) {
                confidenceBar.style.backgroundColor = '#f59e0b'; // Yellow
                confidenceValue.style.color = '#f59e0b';
            } else {
                confidenceBar.style.backgroundColor = '#ef4444'; // Red
                confidenceValue.style.color = '#ef4444';
            }
        }, 100);
    }
});
