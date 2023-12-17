// Set a value UserData for user-data in LocalStorage
export function setLocalStorageUserData(value) {
  try {
    localStorage.setItem("user-data", JSON.stringify(value));
  } catch (error) {
    console.error("Error setting localStorage:", error);
  }
}

// Get value UserData from key user-data
export function getLocalStorageUserData() {
  try {
    const valueUserData = localStorage.getItem("user-data");
    return valueUserData ? JSON.parse(valueUserData) : null;
  } catch (error) {
    console.error("Error getting localStorage:", error);
    return null;
  }
}

// Remove key user-data from localStorage
export function removeLocalStorageUserData() {
  try {
    localStorage.removeItem("user-data");
  } catch (error) {
    console.error("Error removing from localStorage:", error);
  }
}

// Set a value UserInfo for user-info in LocalStorage
export function setLocalStorageUserInfo(value) {
  try {
    localStorage.setItem("user-info", JSON.stringify(value));
  } catch (error) {
    console.error("Error setting localStorage:", error);
  }
}

// Get value UserInfo from key user-info in LocalStorage
export function getLocalStorageUserInfo() {
  try {
    const valueUserInfo = localStorage.getItem("user-info");
    return valueUserInfo ? JSON.parse(valueUserInfo) : null;
  } catch (error) {
    console.error("Error getting localStorage:", error);
    return null;
  }
}

// Remove key user-info from localStorage
export function removeLocalStorageDataInfo() {
  try {
    localStorage.removeItem("user-info");
  } catch (error) {
    console.error("Error removing from localStorage:", error);
  }
}

export function setLocalStorageListChairId(value) {
  try {
    localStorage.setItem("listchairId", JSON.stringify(value));
  } catch (error) {
    console.error("Error setting localStorage:", error);
  }
}

export function getLocalStorageListChairId() {
  try {
    const valueUserInfo = localStorage.getItem("listchairId");
    return valueUserInfo ? JSON.parse(valueUserInfo) : null;
  } catch (error) {
    console.error("Error getting localStorage:", error);
    return null;
  }
}

export function setLocalStorageEventId(value) {
  try {
    localStorage.setItem("eventId", JSON.stringify(value));
  } catch (error) {
    console.error("Error setting localStorage:", error);
  }
}

export function getLocalStorageEventId() {
  try {
    const valueUserInfo = localStorage.getItem("eventId");
    return valueUserInfo ? JSON.parse(valueUserInfo) : null;
  } catch (error) {
    console.error("Error getting localStorage:", error);
    return null;
  }
}

export function setLocalStorageEventInfo(value) {
  try {
    localStorage.setItem("eventInfo", JSON.stringify(value));
  } catch (error) {
    console.error("Error setting localStorage:", error);
  }
}

export function getLocalStorageEventInfo() {
  try {
    const valueUserInfo = localStorage.getItem("eventInfo");
    return valueUserInfo ? JSON.parse(valueUserInfo) : null;
  } catch (error) {
    console.error("Error getting localStorage:", error);
    return null;
  }
}

export function setLocalStorageTicketInfo(value) {
  try {
    localStorage.setItem("ticketInfo", JSON.stringify(value));
  } catch (error) {
    console.error("Error setting localStorage:", error);
  }
}

export function getLocalStorageTicketInfo() {
  try {
    const valueUserInfo = localStorage.getItem("ticketInfo");
    return valueUserInfo ? JSON.parse(valueUserInfo) : null;
  } catch (error) {
    console.error("Error getting localStorage:", error);
    return null;
  }
}
