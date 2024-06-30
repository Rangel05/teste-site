document.addEventListener('DOMContentLoaded', function() {
    const imageList = document.getElementById('imageList');
    const uploadInput = document.getElementById('uploadInput');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const closeModal = document.getElementById('closeModal');
  
    function loadImagesFromStorage() {
        const images = JSON.parse(localStorage.getItem('images')) || [];
        images.forEach(image => addImage(image));
    }
  
    function addImage(image) {
        const imageBlock = document.createElement('div');
        imageBlock.classList.add('image-block');
  
        const img = document.createElement('img');
        img.src = image;
  
        const actions = document.createElement('div');
        actions.classList.add('actions');
        actions.innerHTML = `
            <button class="delete" onclick="deleteImage(event)"><i class="fas fa-times"></i></button>
            <button class="edit" onclick="editImage(event)"><i class="fas fa-edit"></i></button>
        `;
  
        imageBlock.appendChild(img);
        imageBlock.appendChild(actions);
        imageList.appendChild(imageBlock);
  
        imageBlock.addEventListener('click', function() {
            modal.style.display = "flex";
            modalImg.src = img.src;
        });
    }
  
    uploadInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
  
        reader.onload = function() {
            const imageUrl = reader.result;
            addImage(imageUrl);
            saveImagesToStorage();
        };
  
        reader.readAsDataURL(file);
    });
  
    window.deleteImage = function(event) {
        const imageBlock = event.target.closest('.image-block');
        imageBlock.remove();
        saveImagesToStorage(); 
        event.stopPropagation(); 
    };
  
    window.editImage = function(event) {
        const imageBlock = event.target.closest('.image-block');
        const img = imageBlock.querySelector('img');
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
  
        fileInput.addEventListener('change', function(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
  
            reader.onload = function() {
                const imageUrl = reader.result;
                img.src = imageUrl;
                saveImagesToStorage(); 
            };
  
            reader.readAsDataURL(file);
        });
  
        fileInput.click();
        event.stopPropagation(); 
    };
  
    closeModal.addEventListener('click', function() {
        modal.style.display = "none";
    });
  
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });
  
    function saveImagesToStorage() {
        const images = [];
        document.querySelectorAll('.image-block img').forEach(img => {
            images.push(img.src);
        });
        localStorage.setItem('images', JSON.stringify(images));
    }
  
    loadImagesFromStorage();
  
    modal.style.display = "none";
  });
  