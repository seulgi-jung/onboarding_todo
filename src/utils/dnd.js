import { MOUSE_EVENT } from '../const/todo.const';

import { setInsertDirection } from '../store/dnd.store';
import { removeGuide, updateDropzone } from '../ui/dnd/dnd.dom';
import { calcPosition } from '../ui/dnd/dnd.style';
import { cloneDragItem, addDragItem, addGuideLine } from '../ui/dnd/dnd.render';

export class DragAndDrop {
  id = 0;
  dragClass = 'is-dragging';
  guidelineClass = 'drop-guideline';
  dropzoneClass = 'drop-zone';
  offsetY = 0;
  offsetX = 0;
  insertDirection = null;

  constructor({ buttonClass, draggableClass, dropzone }) {
    this.draggableClass = draggableClass;
    this.buttonClass = buttonClass;
    this.$dropzone = dropzone;

    this.initVar();
  }

  customEvent() {}

  cancelDragEvent() {
    this.initVar();

    document.querySelector('.' + this.dragClass)?.remove();
    removeGuide.bind(this)();
    this.removeDocumentEvent();
  }

  //  드래그할 때 위치 이동.
  moveListItem = (e) => {
    if (!this.$dragItem) return;

    const $target = e.target;

    calcPosition.bind(this)(e);

    if ($target.classList.contains(this.guidelineClass)) return;

    if ($target.closest('.' + this.dropzoneClass + this.id)) {
      // dropzone 안에서 가이드라인 추가

      this.$insertItem = $target.closest('.' + this.draggableClass);

      if (!this.$insertItem) return;
      setInsertDirection.bind(this)(e);
      addGuideLine.bind(this)(e);
    } else {
      // dropzone 밖으로 나가면 가이드라인 삭제
      if (!this.$prevInsertItem) return;
      removeGuide.bind(this)();
    }
  };

  // Esc 누르면, 드래그 취소
  addKeyEvent = (e) => {
    if (!this.$dragItem) return;
    if (e.code === 'Escape') this.cancelDragEvent();
  };

  removeDocumentEvent() {
    document.removeEventListener('mouseup', this.dropListItem);
    document.removeEventListener('mousemove', this.moveListItem);
    document.removeEventListener('keydown', this.addKeyEvent);
  }

  addDocumentEvent() {
    document.addEventListener('mouseup', this.dropListItem);
    document.addEventListener('mousemove', this.moveListItem);
    document.addEventListener('keydown', this.addKeyEvent);
  }

  // 리스트에 드롭 아이템을 떨어뜨림
  dropListItem = (e) => {
    if (!this.$dragItem) return;
    addDragItem.bind(this)(e);
    this.customEvent();
    this.cancelDragEvent();
  };

  dragListItem($dropzone) {
    $dropzone.addEventListener('mousedown', (e) => {
      if (e.button === MOUSE_EVENT.RIGHT) return;
      if (this.$dragItem) return;

      const $target = e.target;

      if (!$target.classList.contains(this.buttonClass)) return;

      const clone = cloneDragItem.bind(this)(e);

      document.body.append(clone);
      this.$dragItem = document.querySelector('.' + this.dragClass);
      this.addDocumentEvent();
    });
  }

  initVar() {
    this.$dragItem = null;
    this.$dropItem = null;
    this.$prevInsertItem = null;
    this.$insertItem = null;
    this.insertDirection = null;
    this.offsetX = 0;
    this.offsetY = 0;
  }

  init() {
    updateDropzone.bind(this)(this.$dropzone);
  }
}
