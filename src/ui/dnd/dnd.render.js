import { INSERT_DIRECTION } from '../../const/dnd.const';

export const cloneDragItem = function (e) {
  const $target = e.target;
  // 리스트 아이템 복사
  this.$dropItem = $target.closest('.' + this.draggableClass);
  const rect = this.$dropItem.getBoundingClientRect();
  const clone = this.$dropItem.cloneNode(true);
  this.offsetX = e.pageX - rect.left;
  this.offsetY = e.pageY - rect.top;

  clone.style.position = 'fixed';
  clone.style.top = `${e.pageY - this.offsetY}px`;
  clone.style.left = `${e.pageX - this.offsetX}px`;
  clone.style.width = `${this.$dropItem.clientWidth}px`;
  clone.classList.add(this.dragClass);

  return clone;
};

export const addDragItem = function (e) {
  const $dropzone = e.target.closest('.' + this.dropzoneClass + this.id);
  if (!$dropzone) {
    this.cancelDragEvent();
    return;
  }

  const $guideline = $dropzone.querySelector('.' + this.guidelineClass);

  if (!$guideline) {
    this.cancelDragEvent();
    return;
  }

  $guideline.before(this.$dropItem);
};

export const addGuideLine = function () {
  const $li = document.createElement('li');
  $li.classList.add(this.guidelineClass);

  if (this.$prevInsertItem) {
    const $guideline = this.$dropzone.querySelector('.' + this.guidelineClass);
    if ($guideline) $guideline.remove();
  }

  if (this.insertDirection === INSERT_DIRECTION.BEFORE) {
    this.$insertItem.before($li);
  } else if (this.insertDirection === INSERT_DIRECTION.AFTER) {
    this.$insertItem.after($li);
  }

  this.$prevInsertItem = this.$insertItem;
};
