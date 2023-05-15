import { galleryItems } from './gallery-items.js';

const galleryList = document.querySelector('.gallery');

const createGalleryItem = (item) => {
  const galleryItem = document.createElement('li');
  galleryItem.classList.add('gallery__item');

  const galleryLink = document.createElement('a');
  galleryLink.classList.add('gallery__link');
  galleryLink.href = item.original;

  const galleryImage = document.createElement('img');
  galleryImage.classList.add('gallery__image');
  galleryImage.src = item.preview;
  galleryImage.alt = item.description;
  galleryImage.setAttribute('data-source', item.original);

  galleryLink.appendChild(galleryImage);
  galleryItem.appendChild(galleryLink);

  return galleryItem;
};

const renderGallery = (items) => {
  const galleryItems = items.map((item) => createGalleryItem(item));
  galleryList.append(...galleryItems);
};

renderGallery(galleryItems);

let currentModal = null; // Переменная для отслеживания текущего открытого модального окна

const openModal = (imageUrl) => {
  if (currentModal)
    return; // Проверяем, если модальное окно уже открыто, просто выходим из функции
  
  const instance = basicLightbox.create(`<img src="${imageUrl}" alt="">`, {
    onClose: closeModal,
  });
  instance.show();
  currentModal = instance; // Присваиваем текущий экземпляр модального окна переменной
};

const closeModal = () => {
  document.removeEventListener('keydown', handleKeyDown);
  currentModal = null; // Сбрасываем переменную currentModal при закрытии модального окна
};

const handleKeyDown = (event) => {
  if (event.key === 'Escape' && currentModal) {
    currentModal.close();
  }
};

galleryList.addEventListener('click', (event) => {
  event.preventDefault();

  const clickedElement = event.target;
  if (clickedElement.classList.contains('gallery__image')) {
    const largeImageUrl = clickedElement.dataset.source;
    openModal(largeImageUrl);
    document.addEventListener('keydown', handleKeyDown);
  }
});

console.log(galleryItems);