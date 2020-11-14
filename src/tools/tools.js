export default function rem (px) {
  let rem =
    px /
    (750 / document.documentElement.clientWidth) /
    parseInt(document.documentElement.style.fontSize)
  return rem
}