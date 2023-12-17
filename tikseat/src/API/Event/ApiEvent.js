import axiosDefault from "../Defaults/AxiosDefault";
import {
  URL_GETEVENTBYTYPE,
  URL_GETALLEVENTS,
  URL_GETEVENTBYID,
  URL_SEARCHEVENT,
  URL_CREATEEVENT,
  URL_UPDATEEVENT,
  URL_EVENTHISTORY,
  URL_UPDATESTATUS,
  URL_TOTALALLEVENT,
  URL_TOTALONEEVENT,
  URL_LISTEVENTTODAY,
  URL_CHECKIN,
  URL_ACCEPTREFUND,
  URL_GET_LIST_REFUND,
  URL_GETDETAILEVENT,
  URL_CREATE_PAY_BUSINESS_OF_EVENT,
  URL_GET_PAY_BUSINESS_ORGANIZERS,
  URL_GET_TOP5_EVENT,
  URL_GET_LATES_HOT_EVENT_IMAGES,
  URL_GET_SELECT_CHAIR_IN_AREA,
} from "../ConstAPI";

const ApiEvent = {
  getListEventToday(data) {
    return axiosDefault.post(URL_LISTEVENTTODAY, data);
  },
  checkIn(data) {
    return axiosDefault.post(URL_CHECKIN, data);
  },
  getTotalAllEvent(data) {
    return axiosDefault.post(URL_TOTALALLEVENT, data);
  },
  getTotalOneEvent(data) {
    return axiosDefault.post(URL_TOTALONEEVENT, data);
  },
  getEventByType() {
    return axiosDefault.get(URL_GETEVENTBYTYPE);
  },
  getAllEvents(page) {
    return axiosDefault.get(URL_GETALLEVENTS, { page });
  },
  getEventById(id) {
    return axiosDefault.get(URL_GETEVENTBYID, { idOrganizer: id });
  },
  searchEvent(data) {
    return axiosDefault.post(URL_SEARCHEVENT, data);
  },
  createEvent(data) {
    return axiosDefault.post(URL_CREATEEVENT, data);
  },
  getEventbyEventId(data) {
    return axiosDefault.post(URL_GETDETAILEVENT, data);
  },
  updateEvent(data) {
    return axiosDefault.post(URL_UPDATEEVENT, data);
  },
  eventHistory(data) {
    return axiosDefault.post(URL_EVENTHISTORY, data);
  },
  updateStatus(data) {
    return axiosDefault.post(URL_UPDATESTATUS, data);
  },
  getListRefund(data) {
    return axiosDefault.post(URL_GET_LIST_REFUND, data);
  },
  acceptRefund(data) {
    return axiosDefault.post(URL_ACCEPTREFUND, data);
  },
  createPayBusinessOfEvent(data) {
    return axiosDefault.post(URL_CREATE_PAY_BUSINESS_OF_EVENT, data)
  },
  getPayBusinessWithOrganizers(data) {
    return axiosDefault.post(URL_GET_PAY_BUSINESS_ORGANIZERS, data)
  },
  getTop5Event(data) {
    return axiosDefault.post(URL_GET_TOP5_EVENT, data)
  },
  getLatestHotEventImages() {
    return axiosDefault.get(URL_GET_LATES_HOT_EVENT_IMAGES)
  },
  selectChairInArea(data) {
    return axiosDefault.post(URL_GET_SELECT_CHAIR_IN_AREA, data)
  },
};

export default ApiEvent;
