import fs from 'fs';

class Container {
  constructor(fileName) {
    this.fileName = fileName;
    const names = fs.readdirSync(process.cwd());
    if (names.indexOf(fileName) == -1) {
      fs.writeFileSync(fileName, '');
    }
  }

  async save(object) {
    let content = await this.getAll();
    content.push(object);
    const json = JSON.stringify(content, null, 4);
    try {
      await fs.promises.writeFile(this.fileName, json, 'utf-8');
    } catch (err) {
      console.log(err);
    }
    return object;
  }

  async updateByMatchId(matchId, newObject) {
    let object;
    let content = await this.getAll();
    try {
      object = content.find((c) => c.matchId == matchId);
    } catch (err) {
      console.log(err);
    }
    if (!object) {
      return [];
    }
    content = content.filter((c) => c.matchId !== matchId);

    newObject.matchId = object.matchId;

    content.push(newObject);

    const json = JSON.stringify(content, null, 4);
    try {
      await fs.promises.writeFile(this.fileName, json, 'utf-8');
    } catch (err) {
      console.log(err);
    }

    object = await this.getByMatchId(newObject.matchId);

    return object ? object : [];
  }

  async getByMatchId(matchId) {
    let object;
    let content = await this.getAll();
    try {
      object = content.find((c) => c.matchId == matchId);
    } catch (err) {
      console.log(err);
    }

    return object ? object : [];
  }

  async getAll() {
    let content;
    try {
      content = await fs.promises.readFile(this.fileName, 'utf-8');
    } catch (err) {}
    if (content) {
      return JSON.parse(content);
    } else {
      return [];
    }
  }

  async deleteByMatchId(matchId) {
    let content = await this.getAll();
    content = content.filter((c) => c.matchId !== matchId);
    const json = JSON.stringify(content, null, 4);
    try {
      await fs.promises.writeFile(this.fileName, json, 'utf-8');
    } catch (err) {
      console.log(err);
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(this.fileName, '', 'utf-8');
    } catch (err) {
      console.log(err);
    }
  }
}

export default Container;
