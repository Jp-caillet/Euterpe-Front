import axios from 'axios'

import actionsType from './actions-type'
import store from '../../../store'

/**
 * Format events
 * @param {Array} events
 * @return {Array} eventsFormatted
 */

const getLastEvents = events => ({
  type: actionsType.GET_ALL_RADIOS,
  data: events
})

export const getEventsData = () => {
  axios.get('http://localhost:4000/radio/show').then((response) => {
    console.log(response)
    store.dispatch(getLastEvents(response.data))
  })
}
