document.addEventListener('DOMContentLoaded', () => {
  const bookContent = document.getElementById('book-content');
  const prevPage = document.getElementById('prev-page');
  const nextPage = document.getElementById('next-page');
  const chapterSelect = document.getElementById('chapter-select');
  const increaseFont = document.getElementById('increase-font');
  const decreaseFont = document.getElementById('decrease-font');

  const chapters = {
    intro: `<h4>Introducción</h4><p>Este libro introduce los fundamentos de la econometría, una disciplina que combina teoría económica, estadística y matemáticas para analizar datos económicos. A lo largo de los capítulos, se exploran modelos de regresión lineal, inferencia estadística y aplicaciones prácticas, con ejemplos en software como R y Stata. Está diseñado para estudiantes y profesionales que buscan comprender cómo los datos pueden informar decisiones económicas.</p>`,
    ch1: `<h4>Capítulo 1: Fundamentos de Regresión</h4><p>Este capítulo cubre los conceptos básicos de regresión lineal, incluyendo la especificación de modelos y supuestos clave.</p>`,
    ch2: `<h4>Capítulo 2: Inferencia Estadística</h4><p>Explora las técnicas de inferencia estadística aplicadas a la econometría, con énfasis en pruebas de hipótesis.</p>`
  };

  let currentChapter = 'intro';

  chapterSelect.addEventListener('change', (e) => {
    currentChapter = e.target.value;
    bookContent.innerHTML = chapters[currentChapter];
  });

  prevPage.addEventListener('click', () => {
    const chaptersList = Object.keys(chapters);
    const currentIndex = chaptersList.indexOf(currentChapter);
    if (currentIndex > 0) {
      currentChapter = chaptersList[currentIndex - 1];
      chapterSelect.value = currentChapter;
      bookContent.innerHTML = chapters[currentChapter];
    }
  });

  nextPage.addEventListener('click', () => {
    const chaptersList = Object.keys(chapters);
    const currentIndex = chaptersList.indexOf(currentChapter);
    if (currentIndex < chaptersList.length - 1) {
      currentChapter = chaptersList[currentIndex + 1];
      chapterSelect.value = currentChapter;
      bookContent.innerHTML = chapters[currentChapter];
    }
  });

  increaseFont.addEventListener('click', () => {
    let fontSize = parseInt(window.getComputedStyle(bookContent).fontSize);
    bookContent.style.fontSize = `${fontSize + 2}px`;
  });

  decreaseFont.addEventListener('click', () => {
    let fontSize = parseInt(window.getComputedStyle(bookContent).fontSize);
    if (fontSize > 12) {
      bookContent.style.fontSize = `${fontSize - 2}px`;
    }
  });
});