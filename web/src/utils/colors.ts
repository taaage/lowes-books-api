const spineColors = [
  '#da3633','#58a6ff','#3fb950','#d29922','#bc8cff','#f78166','#79c0ff','#56d364',
  '#db61a2','#f0883e','#a371f7','#3d8bfd','#e3b341','#8b949e','#7ee787','#ff7b72',
  '#d2a8ff','#ffa657','#39d353','#6cb6ff',
]

export function hashColor(str: string) {
  let h = 0
  for (let i = 0; i < str.length; i++) h = str.charCodeAt(i) + ((h << 5) - h)
  return spineColors[Math.abs(h) % spineColors.length]
}

export function ratingColor(r: number) {
  const t = Math.max(0, Math.min(1, (r - 1) / 4))
  const red = [248, 81, 73]
  const blue = [88, 166, 255]
  return `rgb(${red.map((c, i) => Math.round(c + (blue[i] - c) * t)).join(',')})`
}
