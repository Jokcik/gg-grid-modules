import {Stage} from '../../single-elimination/models/stage';
import {Match} from '../../single-elimination/models/match';

export class DoubleDownGrid {
  public stages: Stage[] = [];

  public static generateGrid(players: string[]): DoubleDownGrid {
    const countStages = Math.ceil(Math.log2(players.length));

    const grid = new DoubleDownGrid();
    grid.generateStages(countStages);


    return grid;
  }

  public generateStages(stagesInSingle: number): Stage[] {
    this.stages = [];
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


    return this.stages;
  }
}