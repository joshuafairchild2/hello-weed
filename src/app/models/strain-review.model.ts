import { StrainEffects } from './strain-effects.model';

export class StrainReview {
  constructor(
    public effectsRating: StrainEffects,
    public createdAt: string,
    public userName: string,
    public link: string
  ) {}
}
