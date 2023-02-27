import { Review } from "./entities/reviews.entity";

export const REVIEW_REPOSITORY = "REVIEW_REPOSITORY";

export const reviewProvider = [
  {
    provide: REVIEW_REPOSITORY,
    useValue: Review,
  },
];
