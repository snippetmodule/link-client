
let LOCATION_COLORS = {
  'HERBST': '#00E3AD',
  'HERBST A': '#00E3AD',
  'HERBST B': '#00E3AD',
  'HACKER X': '#4D99EF',
  'HACKER Y': '#CF72B1',
  'COWELL': '#6A6AD5',
  'COWELL C': '#6A6AD5',
  'FOOD TENT': '#FFCD3B',
};

export function colorForLocation(location?: string): string {
  if (!location) {
    return 'black';
  }

  let color = LOCATION_COLORS[location.toUpperCase()];
  if (!color) {
    console.warn(`Location '${location}' has no color`);
    color = 'black';
  }
  return color;
}

export function colorForTopic(count: number, index: number): string {
  const hue = Math.round(360 * index / (count + 1));
  return `hsl(${hue}, 74%, 65%)`;
}
export let actionText: string = '#3FB4CF';
export let darkText: string = '#032250';
export let lightText: string = '#7F91A7';
export let cellBorder: string = '#EEEEEE';
export let darkBackground: string = '#183E63';

