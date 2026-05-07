function menu() {
      window.location.href = '../choix_jeu.html';
    }

const backButton = document.querySelector('.back');
if (backButton) {
  backButton.addEventListener('click', menu);
}
