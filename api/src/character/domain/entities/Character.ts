interface CharacterProps {
  id?: string;
  name: string;
}

export class Character {

  readonly id?: string;
  private _name: string;

  constructor({ id, name }: CharacterProps) {
    this.id = id;
    this.setName(name);
  }

  get name(): string {
    return this._name;
  }

  setName(name: string) {
    if (!name) {
      throw new Error('Name is required');
    }

    this._name = name;
  }
}