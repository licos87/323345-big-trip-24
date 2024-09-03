import {RenderPosition, render} from './render.js';
import ListPresenter from './presenter/list-presenter.js';
import SectionTripInfoView from './view/section-trip-info-view.js';
import NewEventButtonView from './view/new-event-button-view.js';
import TripFiltersFormView from './view/trip-filters-form-view.js';
import { pointsModel } from './model/points-model.js';


const tripMain = document.querySelector('.trip-main');
const tripEventsElement = document.querySelector('.trip-events');
const tripControlsFilters = document.querySelector('.trip-controls__filters');

render(new SectionTripInfoView(), tripMain, RenderPosition.AFTERBEGIN); // Заголовок, даты, общая цена
render(new NewEventButtonView(), tripMain); // Заголовок, кнопка добавить событие
render (new TripFiltersFormView(), tripControlsFilters); // Кнопки сортировки

const listPresenter = new ListPresenter({
  listContainer: tripEventsElement,
  pointsModel: pointsModel,
});

listPresenter.init();

