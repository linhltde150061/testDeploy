export const BASE_URL = "http://3.26.32.42:8080/api";
// export const BASE_URL = "http://localhost:8080/api";
// export const URL_SOCKET = "http://localhost:5000";
export const URL_SOCKET = "http://3.26.32.42:5000";
export const URL_API_CITY = "https://provinces.open-api.vn/api/";

//-------------------AUTH----------------------------
export const URL_LOGIN = "/auth/login";
export const URL_REGISTERUSER = "auth/resigterUser";
export const URL_PROFILEOTGANIZER = "/auth/createOrganizer";
export const URL_PROFILECLIENT = "/auth/createClient";
export const URL_UPDATE_PROFILE = "/auth/updateClient";
export const URL_CHANGEPASSWORD = "/auth/changePassword";
export const URL_UPDATE_PROFILEORGANIZER = "auth/updateOrganizer";
export const URL_RESETPASSWORD = "auth/resetPassword";
export const URL_SIGNUP = "/resigterUser";

//-------------------SENDMAIL----------------------------
export const URL_SENOTP = "/sendMail/sendOTPResign";
export const URL_VERIFYOTP = "/sendMail/verifleOTPResign";
export const URL_VERIFYCODE = "/sendMail/verifleOTPResign";
export const URL_VERIFYEMAIL = "/sendMail/sendOTPResign";
export const URL_RESENDOTP = "/sendMail/resendOTPForMail";
export const URL_FORGOTPASSWORD = "/sendMail/sendOTPForResetPassword";

//-------------------EVENT----------------------------
export const URL_GETEVENTBYTYPE = "/event/getEventByType";
export const URL_GETALLEVENTS = "/event/getEvent";
export const URL_GETEVENTBYID = "/event/getEventById";
export const URL_GETDETAILEVENT = "/event/getDetailEvent";
export const URL_SEARCHEVENT = "/event/searchEvent";
export const URL_CREATEEVENT = "/event/createEvent";
export const URL_UPDATEEVENT = "/event/updateEvent";
export const URL_CREATEREFUND = "/refund/createRefund";
export const URL_EVENTHISTORY = "/event/listEventOrganizer";
export const URL_UPDATESTATUS = "/event/updateChairStatus";
export const URL_TOTALALLEVENT = "/event/statisticalEvent";
export const URL_TOTALONEEVENT = "/event/statisticalOneEvent";
export const URL_LISTEVENTTODAY = "/checkin/getEventToday";
export const URL_CHECKIN = "/checkin/check_in";
export const URL_GET_TOP5_EVENT = "/event/getTopRatedEventOfOrganizer"
export const URL_GET_LATES_HOT_EVENT_IMAGES = "/event/getLatestHotEventImages"
export const URL_GET_SELECT_CHAIR_IN_AREA = "/event/selectChairInArea"

//-------------------PAYBUSINESS----------------------------
export const URL_CREATE_PAY_BUSINESS_OF_EVENT = "/payBusiness/createPayBusinessOfEvent";
export const URL_GET_PAY_BUSINESS_ORGANIZERS = "/payBusiness/getPayBusinessWithOrganizers";
export const URL_GET_PAY_BUSINESS_WITH_REQUEST = "/payBusiness/getPayBusinessWithRequest";
export const URL_SET_ISPAY = "/payBusiness/setIsPayForOrganizers";

//-------------------RATING----------------------------
export const URL_RATING = "/rating/createRating";
export const URL_GET_RATING_OF_CLIENT = "/rating/getClientRating";

//-------------------CITY----------------------------
export const URL_CITY = "?depth=1";
export const URL_DISTRICT = "?depth=2";

//-------------------ADMIN----------------------------
export const URL_GET_ALL_CLIENTS = "/admin/getAllClient";
export const URL_GET_DETAIL_CLIENT = "/admin/getDetailClient";
export const URL_GET_ALL_ORGANIZAER = "/admin/getAllOrganizers";
export const URL_GET_DETAIL_ORGANIZAER = "/admin/getDetailOrganizer";
export const URL_GET_ALL_ORGANIZAER_ISACTIVE_FALSE = "/admin/getAllOrganizersIsAtivecFalse";
export const URL_GET_ALL_EVENT_ISACTIVE_FALSE = "/admin/getAllEventIsAtivecFalse";
export const URL_SET_IS_ACTIVE_ORGANIZAER = "/admin/setIsActiveOrganizer";
export const URL_GET_DETAIL_EVENT = "/admin/getDetailEventActiveIsFalse";
export const URL_SET_IS_ACTIVE_EVENT = "/admin/setIsActiveEvent";
export const URL_SET_IS_HOT = "/admin/setIsHotEvent";
export const URL_GET_ALL_ODRERS = "/admin/getAllOrders";
export const URL_GET_HOME_ADMIN = "/admin/getHomeAdmin";
export const URL_BLOCK_USER = "/admin/blockedUser";
export const URL_LIST_BLOCK_ORGANIZER = "/admin/getAllOrganizerBlockeds";
export const URL_GET_INFORMATION_EVENT = "/admin/getInformationEvent";
export const URL_GET_TRANSACTION_INFORMATION = "/admin/getTransactionInformation";

//-------------------PAYMENT----------------------------
export const URL_ADDPAYMENT = "";
export const URL_CREATETICKET = "/ticket/createTicket";

//-------------------PAYMENT----------------------------
export const URL_GET_ORDERS_AVAILABLET_TICKETS = "/order/getOrdersAvailableTickets";
export const URL_GET_ORDERS_REFUND_TICKETS = "/order/getOrdersRefundTicket";
export const URL_PAYTICKET_OF_EVENT = "/order/createQRcode";
export const URL_ORDER_BY_CLIENT = "/order/getOrdersByClient";
export const URL_GET_MY_TICKET = "/order/getMyTicket";
export const URL_ORDER_DETAIL = "/order/getOrderDetail";

//-------------------REFUND-ODER--------------------------------
export const URL_GET_LIST_REFUND = "/refund/getListRefund";
export const URL_ACCEPTREFUND = "/refund/acceptRefund";
export const URL_GET_IS_REFUND = "/refund/listIsRefund";
export const URL_REFUND_MONEY = "/refund/refundMoney";
