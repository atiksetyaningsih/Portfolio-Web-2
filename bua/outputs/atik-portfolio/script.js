const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });

  document.querySelectorAll('.nav a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const projectCards = document.querySelectorAll('.project-card');

if (projectCards.length) {
  const modalStyles = document.createElement('style');
  modalStyles.textContent = `.project-detail-trigger{cursor:pointer;transition:transform .2s,box-shadow .2s}.project-detail-trigger:hover,.project-detail-trigger:focus-visible{transform:translateY(-5px);box-shadow:11px 14px 0 rgba(56,40,105,.58);outline:3px solid #f4eeff;outline-offset:3px}.project-modal{width:min(900px,calc(100% - 32px));max-height:calc(100vh - 32px);padding:0;border:0;border-radius:24px;background:#f3efff;color:#44376e;box-shadow:0 24px 70px rgba(25,16,55,.55);overflow:auto}.project-modal::backdrop{background:rgba(27,19,57,.72);backdrop-filter:blur(3px)}.modal-image-wrap{min-height:260px;background:linear-gradient(135deg,#d7d0eb,#a99bcf);display:grid;place-items:center;padding:24px}.modal-image{display:none;max-width:100%;max-height:58vh;border-radius:12px;box-shadow:0 8px 25px rgba(55,42,91,.25)}.modal-image.has-image{display:block}.modal-image-wrap.no-image:after{content:'Preview proyek';font:600 2rem 'Playfair Display',serif;color:#5e4d91}.modal-content{padding:30px 34px 36px}.modal-content h3{margin:6px 0 12px;font:600 clamp(2rem,5vw,3.4rem)/.95 'Playfair Display',serif}.modal-type{margin:0;color:#7762b8;font-size:.7rem;font-weight:700;letter-spacing:.12em}.modal-description{max-width:630px;line-height:1.55}.modal-code{display:inline-block;margin-top:14px;border-radius:22px;padding:12px 18px;background:#5d4ba3;color:#fff;text-decoration:none;font:600 .9rem 'DM Sans',sans-serif}.modal-close{position:absolute;z-index:2;top:12px;right:12px;width:36px;height:36px;border:0;border-radius:50%;background:#fff;color:#44376e;font-size:1.8rem;line-height:1;cursor:pointer;box-shadow:0 3px 10px rgba(32,22,70,.2)}@media(max-width:800px){.modal-image-wrap{min-height:190px;padding:16px}.modal-content{padding:25px}.modal-content h3{font-size:2.2rem}}`;
  document.head.append(modalStyles);

  const modal = document.createElement('dialog');
  modal.className = 'project-modal';
  modal.setAttribute('aria-labelledby', 'project-modal-title');
  modal.innerHTML = `
    <button class="modal-close" type="button" aria-label="Tutup detail proyek">&times;</button>
    <div class="modal-image-wrap"><img class="modal-image" src="" alt="" /></div>
    <div class="modal-content">
      <p class="modal-type"></p><h3 id="project-modal-title"></h3><p class="modal-description"></p>
      <a class="modal-code" href="https://github.com/atiksetyaningsih" target="_blank" rel="noreferrer">Buka kode di GitHub ↗</a>
    </div>`;
  document.body.append(modal);

  const modalTitle = modal.querySelector('#project-modal-title');
  const modalType = modal.querySelector('.modal-type');
  const modalDescription = modal.querySelector('.modal-description');
  const modalImage = modal.querySelector('.modal-image');
  const modalImageWrap = modal.querySelector('.modal-image-wrap');

  const openProjectDetail = (card) => {
    const image = card.querySelector('.project-art img');
    modalTitle.textContent = card.querySelector('h3').textContent;
    modalType.textContent = card.querySelector('.project-text > span').textContent;
    modalDescription.textContent = card.querySelector('.project-text > p').textContent;

    if (image) {
      modalImage.src = image.src;
      modalImage.alt = image.alt;
      modalImage.classList.add('has-image');
      modalImageWrap.classList.remove('no-image');
    } else {
      modalImage.removeAttribute('src');
      modalImage.classList.remove('has-image');
      modalImageWrap.classList.add('no-image');
    }
    modal.showModal();
  };

  projectCards.forEach((card) => {
    card.classList.add('project-detail-trigger');
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', `Lihat detail ${card.querySelector('h3').textContent}`);
    card.addEventListener('click', (event) => {
      if (!event.target.closest('button, a')) openProjectDetail(card);
    });
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        openProjectDetail(card);
      }
    });
  });

  modal.querySelector('.modal-close').addEventListener('click', () => modal.close());
  modal.addEventListener('click', (event) => {
    if (event.target === modal) modal.close();
  });
}

const waForm = document.querySelector('#wa-form');
const waQuestion = document.querySelector('#wa-question');

if (waForm && waQuestion) {
  waForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const message = waQuestion.value.trim() || 'Halo, saya ingin bertanya lebih lanjut.';
    const url = `https://wa.me/6288239287669?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  });
}
