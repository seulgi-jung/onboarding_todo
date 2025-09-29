export const calcPosition = function (e) {
  // 드래그 중인 아이템 위치 변경
  this.$dragItem.style.top = `${e.pageY - this.offsetY}px`;
  this.$dragItem.style.left = `${e.pageX - this.offsetX}px`;
};
