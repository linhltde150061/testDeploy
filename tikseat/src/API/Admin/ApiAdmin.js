import { URL_BLOCK_USER, URL_GET_ALL_CLIENTS, URL_GET_ALL_EVENT_ISACTIVE_FALSE, URL_GET_ALL_ODRERS, URL_GET_ALL_ORDER_OF_EVENT, URL_GET_ALL_ORGANIZAER, URL_GET_ALL_ORGANIZAER_ISACTIVE_FALSE, URL_GET_DETAIL_CLIENT, URL_GET_DETAIL_EVENT, URL_GET_DETAIL_ORGANIZAER, URL_GET_HOME_ADMIN, URL_GET_INFORMATION_EVENT, URL_GET_IS_REFUND, URL_GET_PAY_BUSINESS_WITH_REQUEST, URL_GET_TOTAL_AMOUNT_AND_ADMIN_EARNING, URL_GET_TRANSACTION_INFORMATION, URL_LIST_BLOCK_ORGANIZER, URL_REFUND_MONEY, URL_SET_ISPAY, URL_SET_IS_ACTIVE_EVENT, URL_SET_IS_ACTIVE_ORGANIZAER } from "../ConstAPI";
import axiosDefault from "../Defaults/AxiosDefault";

const ApiAdmin = {
    getAllClients(data) {
        return axiosDefault.post(URL_GET_ALL_CLIENTS, data);
    },
    getDetailClient(data) {
        return axiosDefault.post(URL_GET_DETAIL_CLIENT, data)
    },
    getAllOrganizers(data) {
        return axiosDefault.post(URL_GET_ALL_ORGANIZAER, data);
    },
    getDetailOrganizer(data) {
        return axiosDefault.post(URL_GET_DETAIL_ORGANIZAER, data)
    },
    getAllOrganizersIsActiveFalse(data) {
        return axiosDefault.post(URL_GET_ALL_ORGANIZAER_ISACTIVE_FALSE, data)
    },
    getAllEventIsActiveFalse(data) {
        return axiosDefault.post(URL_GET_ALL_EVENT_ISACTIVE_FALSE, data)
    },
    setAcceptOrganizer(data) {
        return axiosDefault.post(URL_SET_IS_ACTIVE_ORGANIZAER, data)
    },
    getDetailEvent(data) {
        return axiosDefault.post(URL_GET_DETAIL_EVENT, data)
    },
    setAcceptEvent(data) {
        return axiosDefault.post(URL_SET_IS_ACTIVE_EVENT, data)
    },
    setAcceptIsHot(data) {
        return axiosDefault.post(URL_SET_IS_ACTIVE_ORGANIZAER, data)
    },
    getAllOrders(data) {
        return axiosDefault.post(URL_GET_ALL_ODRERS, data)
    },
    getAllIsRefund() {
        return axiosDefault.get(URL_GET_IS_REFUND)
    },
    refundMoney(data) {
        return axiosDefault.post(URL_REFUND_MONEY, data)
    },
    getHomeAdmin() {
        return axiosDefault.get(URL_GET_HOME_ADMIN)
    },
    blockedUser(data) {
        return axiosDefault.post(URL_BLOCK_USER, data)
    },
    getListOrganizerBlock(data) {
        return axiosDefault.post(URL_LIST_BLOCK_ORGANIZER, data)
    },
    getAllOrderOfEvent(data) {
        return axiosDefault.post(URL_GET_INFORMATION_EVENT, data)
    },
    getTransactionInformation(data) {
        return axiosDefault.post(URL_GET_TRANSACTION_INFORMATION, data)
    },
    getPayBusinessWithRequest(data) {
        return axiosDefault.post(URL_GET_PAY_BUSINESS_WITH_REQUEST, data)
    },
    setIsPayForOrganizers(data) {
        return axiosDefault.post(URL_SET_ISPAY, data)
    },
}

export default ApiAdmin;
