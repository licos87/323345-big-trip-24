import { UpdateType } from '../const/const.js';
import Observable from '../framework/observable.js';
export default class PointsTripModel extends Observable {
  #dataPoints = [];
  #pointsApiService = null;

  constructor({pointsApiService}) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  get points() {
    return this.#dataPoints;
  }

  async init() {
    try {
      this.#dataPoints = await this.#pointsApiService.points;
    } catch (err) {
      throw new Error('points not found');
    }
    this._notify(UpdateType.INIT);
  }

  async updatePoint(updateType, update) {

    const index = this.#dataPoints.findIndex((point) => point.id === update.id);

    if(index === -1){
      throw new Error('Can\'t update unexisting point');
    }

    try {
      const updatePoint = await this.#pointsApiService.updatePoint(update);

      this.#dataPoints = this.#dataPoints.map(
        (item) => (item.id === updatePoint.id ? updatePoint : item));

      this._notify(updateType, updatePoint);
    } catch(err) {
      throw new Error('Can\'t update point', err);
    }
  }

  async addPoint(updateType, update){
    try {
      this.#dataPoints = [
        update,
        ...this.#dataPoints
      ];

      this._notify(updateType, update);
    } catch(err) {
      throw new Error(err);
    }
  }

  deletePoint(updateType, update) {
    const index = this.#dataPoints.findIndex((point) => point.id === update.id);

    if(index === -1){
      throw new Error('Can\'t delete unexisting point');
    }

    this.#dataPoints = [
      ...this.#dataPoints.slice(0, index),
      ...this.#dataPoints.slice(index + 1)
    ];

    this._notify(updateType);
  }
}
