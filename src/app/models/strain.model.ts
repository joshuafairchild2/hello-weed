import { StrainEffects } from './strain-effects.model';
import { StrainReview } from './strain-review.model';


export class Strain {
  constructor(
    public image: string,
    public name: string,
    public seedCompanyName: string,
    public ucpc: string,
    public effects: StrainEffects,
    public lineage: object
    // public reviews: StrainReview[]
    // more props to come...
  ) {}
}
