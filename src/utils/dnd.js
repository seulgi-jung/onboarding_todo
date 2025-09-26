export class DragAndDrop {
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

  initVar() {
    this.dragState = null;
    this.$dragItem = null;
    this.$dropItem = null;
    this.$prevInsertItem = null;
    this.$insertItem = null;
    this.insertDirection = null;
    this.offsetX = 0;
    this.offsetY = 0;
  }

  customEvent() {}

  cancelDnD() {
    this.initVar();
    document.querySelector('.' + this.dragClass)?.remove();
    this.removeGuide();
    this.removeDocumentEvent();
  }

  removeGuide() {
    const $guideline = this.$dropzone.querySelector('.' + this.guidelineClass);
    this.$prevInsertItem = null;
    if ($guideline) $guideline.remove();
    // if ($guideline) $guideline.classList.remove(this.guidelineClass);
  }

  //  드래그할 때 위치 이동.
  onMoveItem = (e) => {
    // if (!this.$dragItem || this.dragState !== 'dragging') return;
    if (!this.$dragItem) return;

    const $target = e.target;
    // 드래그 중인 아이템 위치 변경
    this.$dragItem.style.top = `${e.pageY - this.offsetY}px`;
    this.$dragItem.style.left = `${e.pageX - this.offsetX}px`;

    if ($target.classList.contains(this.guidelineClass)) return;

    if ($target.closest('.' + this.dropzoneClass)) {
      // dropzone 안에서 가이드라인 추가
      this.$insertItem = $target.closest('.' + this.draggableClass);
      if (!this.$insertItem) return;

      const rect = this.$insertItem.getBoundingClientRect();
      this.insertDirection = rect.top + rect.height / 2 > e.pageY ? 'before' : 'after';

      const $li = document.createElement('li');
      $li.classList.add(this.guidelineClass);

      if (this.$prevInsertItem) {
        const $guideline = this.$dropzone.querySelector('.' + this.guidelineClass);
        if ($guideline) $guideline.remove();
      }

      if (this.insertDirection === 'before') {
        this.$insertItem.before($li);
      } else if (this.insertDirection === 'after') {
        this.$insertItem.after($li);
      }

      this.$prevInsertItem = this.$insertItem;
    } else {
      // dropzone 밖으로 나가면 가이드라인 삭제
      if (!this.$prevInsertItem) return;
      this.removeGuide();
    }
  };

  // Esc 누르면, 드래그 취소
  onEsc = (e) => {
    if (!this.$dragItem || this.dragState !== 'dragging') return;
    if (e.code === 'Escape') this.cancelDnD();
  };

  removeDocumentEvent() {
    document.removeEventListener('mouseup', this.drop);
    document.removeEventListener('mousemove', this.onMoveItem);
    document.removeEventListener('keydown', this.onEsc);
  }
  addDocumentEvent() {
    document.addEventListener('mouseup', this.drop);
    document.addEventListener('mousemove', this.onMoveItem);
    document.addEventListener('keydown', this.onEsc);
  }

  // 리스트에 드롭 아이템을 떨어뜨림
  drop = (e) => {
    if (!this.$dragItem || this.dragState !== 'dragging') return;
    const $dropzone = e.target.closest('.' + this.dropzoneClass);
    const $guideline = document.querySelector('.' + this.guidelineClass);

    if (!$dropzone || !$guideline) {
      this.cancelDnD();
      return;
    }

    $guideline.before(this.$dropItem);
    this.customEvent();
    this.cancelDnD();
  };

  drag($dropzone) {
    $dropzone.addEventListener('mousedown', (e) => {
      if (e.button === 2) return;
      if (this.$dragItem) return;

      const $target = e.target;

      if (!$target.classList.contains(this.buttonClass)) return;

      // 리스트 아이템 복사
      this.dragState = 'dragging';
      this.$dropItem = $target.closest('.' + this.draggableClass);
      const rect = this.$dropItem.getBoundingClientRect();
      const clone = this.$dropItem.cloneNode(true);
      this.offsetX = e.pageX - rect.left; //e.offsetX;
      this.offsetY = e.pageY - rect.top; //e.offsetY;

      clone.style.position = 'fixed';
      clone.style.top = `${e.pageY - this.offsetY}px`;
      clone.style.left = `${e.pageX - this.offsetX}px`;
      clone.style.width = `${this.$dropItem.clientWidth}px`;
      clone.classList.add(this.dragClass);

      document.body.append(clone);

      this.$dragItem = document.querySelector('.' + this.dragClass);
      this.addDocumentEvent();
    });
  }

  updateDropzone($dropzone) {
    if (!this.$dropzone) return;
    this.$dropzone = $dropzone;
    this.$dropzone.classList.add(this.dropzoneClass);
    this.drag(this.$dropzone);
  }

  init() {
    this.updateDropzone(this.$dropzone);
  }
}
