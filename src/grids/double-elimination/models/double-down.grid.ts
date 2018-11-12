import {Match, Stage} from '../../../models';
import {IPlayer} from '../../../interfaces';

export class DoubleDownGrid {
  protected _stages: Stage[];
  get stages() {
    return this._stages;
  }

  constructor(players: IPlayer[]) {
    const countStages = Math.ceil(Math.log2(players.length));
    this.generateStages(countStages);
  }

  public generateStages(stagesInSingle: number): void {
    this._stages = [];
    const doubleSages = 2 * (stagesInSingle - 1);

    for (let i = doubleSages; i >= 1; --i) {
      const stage = new Stage();
      const countMatches = Math.pow(2, Math.ceil(i / 2) - 1);
      for (let j = 1; j <= countMatches; ++j) {
        const match = new Match();
        stage.matches.push(match);
      }

      this.stages.push(stage);
    }
  }
}