import { createEl } from './createEl';
import { getTime } from './formatTime';

const labels = ['days', 'hours', 'minutes', 'seconds'];

const createTimerItem = (label: string): { item: HTMLElement; number: HTMLElement } => {
  const item = createEl('div', { className: 'timer__item' });
  const number = createEl('span', { className: 'timer__number', textContent: '' });
  const span = createEl('span', { className: 'timer__label', textContent: label });
  item.append(number, span);

  return { item, number };
};

export const timer = (): HTMLElement => {
  const container = createEl('div', { className: 'timer' });
  const items = labels.map((label) => createTimerItem(label));

  const updateTime = () => {
    const currentDate = Date.now();
    const nextYear = new Date(currentDate).getFullYear() + 1;
    const endDate = new Date(nextYear, 0, 1);
    const time = (endDate.valueOf() - currentDate.valueOf()) / 1000;
    const data = getTime(time); //  {days, hours, minutes, seconds}

    Object.entries(data).forEach(([_, val], index) => {
      console.log('val', val);
      items[index].number.textContent = String(val);
    });
  };

  updateTime();
  window.setInterval(updateTime, 1000);
  container.append(...items.map(({ item }) => item));

  return container;
};
