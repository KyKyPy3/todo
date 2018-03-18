export class TodoModel {

  public completed = false;

  public title: string;

  public id: string;

  /* tslint:disable no-bitwise */
  static newGuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  setTitle(title) {
    this.title = title.trim();
  }

  constructor(title: string) {
    this.id = TodoModel.newGuid();
    this.completed = false;
    this.setTitle(title);
  }
}
