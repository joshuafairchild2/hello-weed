import { StrainEffectData } from './strain-effect-data.model';

export class StrainData {
  constructor(
    public image: string,
    public name: string,
    public seedCompanyName: string,
    public ucpc: string,
    public effects: StrainEffectData
    // more props to come...
  ) {}
}
