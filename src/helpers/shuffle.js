// shuffe array
export default function shuffle(a) {
  for (let i = a.length; i; i--) {
    const j = Math.floor(Math.random() * i);
    [a[i - 1], a[j],] = [a[j], a[i - 1],];
  }
}
