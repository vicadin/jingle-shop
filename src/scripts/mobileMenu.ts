const button = document.querySelector<HTMLElement>('.burger-menu');
const nav = document.querySelector<HTMLElement>('nav');
const navLinks = nav?.querySelectorAll<HTMLAnchorElement>('.nav-list__link') ?? [];
const logo = document.querySelector<HTMLAnchorElement>('.logo');
const body = document.body;
const desktopWidth: MediaQueryList = window.matchMedia('(min-width: 769px)');
console.log('button', button);

const classToggle = (): void => {
  button?.classList.toggle('open');
  nav?.classList.toggle('active');
  body.classList.toggle('overflow-hidden');
};

const closeMenu = (): void => {
  button?.classList.remove('open');
  nav?.classList.remove('active');
  body.classList.remove('overflow-hidden');
};

export default (): void => {
  console.log('clicked');
  button?.addEventListener('click', classToggle);
  console.log(button);

  const links: HTMLAnchorElement[] = [...navLinks, ...(logo ? [logo] : [])];

  links.forEach((link) => {
    link.addEventListener('click', (event: MouseEvent) => {
      const target = event.currentTarget as HTMLAnchorElement | null;
      if (!target) return;

      if (target.classList.contains('active')) {
        event.preventDefault();
        return;
      }

      if (nav?.classList.contains('active')) {
        const href = target.href;
        event.preventDefault();
        closeMenu();

        setTimeout(() => {
          window.location.href = href;
        }, 300);
      }
    });
  });
};

window.addEventListener('keyup', (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    closeMenu();
  }
});

desktopWidth.addEventListener('change', (event: MediaQueryListEvent) => {
  if (event.matches) {
    closeMenu();
  }
});
