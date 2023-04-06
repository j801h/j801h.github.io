document.addEventListener('DOMContentLoaded', function () {
    var portfolioSections = document.querySelectorAll('#portfolio');
    if (portfolioSections.length > 1) {
      portfolioSections[1].remove();
    }
  });
  