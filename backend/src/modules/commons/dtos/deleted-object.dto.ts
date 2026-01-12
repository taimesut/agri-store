export class DeletedObject {
  constructor(id: string, object: string, deleted: boolean) {
    this.id = id;
    this.deleted = deleted;
    this.object = object;
  }
  id: string;
  object: string;
  deleted: boolean;
}
