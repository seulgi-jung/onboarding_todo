export const removeGuide = function () {
  const $guideline = this.$dropzone.querySelector('.' + this.guidelineClass);
  this.$prevInsertItem = null;
  if ($guideline) $guideline.remove();
};

export const updateDropzone = function ($dropzone) {
  if (!this.$dropzone) return;
  const randomId = Math.floor(Math.random() * 10000);
  this.$dropzone = $dropzone;
  this.$dropzone.classList.add(this.dropzoneClass + randomId);
  this.id = randomId;
  this.dragListItem(this.$dropzone);
};
