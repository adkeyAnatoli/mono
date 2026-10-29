export function scrollToBlock(id: string) {
  const element = document.querySelector(`#${id}`);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  } else {
    window.scrollTo(0, 0);
  }
}
