// Set giá trị cho key token in LocalStorages
export function setLocalStorageToken(value) {
    try {
        localStorage.setItem("token", JSON.stringify(value));
    } catch (error) {
        console.error('Error setting localStorage:', error);
    }
}

// get value của key token trong LocalStorage
export function getLocalStorageToken() {
    try {
        const valueToken = localStorage.getItem("token");
        return valueToken ? JSON.parse(valueToken) : null;
    } catch (error) {
        console.error('Error getting localStorage:', error);
        return null;
    }
}

// Xóa key token trong LocalStorage
export function removeLocalStorageToken() {
    try {
        localStorage.removeItem("token");
    } catch (error) {
        console.error('Error removing from localStorage:', error);
    }
}


// Set giá trị cho key role in LocalStorages
export function setLocalStorageRole(value) {
    try {
        localStorage.setItem("role", JSON.stringify(value));
    } catch (error) {
        console.error('Error setting localStorage:', error);
    }
}

// get value của key role trong LocalStorage
export function getLocalStorageRole() {
    try {
        const valueRole = localStorage.getItem("role");
        return valueRole ? JSON.parse(valueRole) : null;
    } catch (error) {
        console.error('Error getting localStorage:', error);
        return null;
    }
}

// Xóa key role trong LocalStorage
export function removeLocalStorageRole() {
    try {
        localStorage.removeItem("role");
    } catch (error) {
        console.error('Error removing from localStorage:', error);
    }
}