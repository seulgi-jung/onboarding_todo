import { INSERT_DIRECTION } from '../const/dnd.const';

export const setInsertDirection = function (e) {
  const rect = this.$insertItem.getBoundingClientRect();
  if (rect.top + rect.height / 2 > e.pageY) {
    this.insertDirection = INSERT_DIRECTION.BEFORE;
  } else {
    this.insertDirection = INSERT_DIRECTION.AFTER;
  }
};

export const reorderList = function (list) {
  if (!this.$dragItem || !this.$insertItem) return;

  const dragKey = this.$dragItem.dataset.key;
  const insertKey = this.$insertItem.dataset.key;
  let dragItem = null;

  // 이동한 요소 삭제
  const filteredItem = list.filter(function (item) {
    if (item.key != dragKey) {
      return item;
    }
    dragItem = item;
  });

  // 이동할 요소 위치 찾기
  let insertIndex = 0;
  filteredItem.forEach(function ({ key }, index) {
    if (key != insertKey) return;
    insertIndex = index;
  });

  if (this.insertDirection === INSERT_DIRECTION.AFTER) {
    insertIndex++;
  }

  filteredItem.splice(insertIndex, 0, dragItem);

  return filteredItem;
};
