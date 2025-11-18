import axios from "axios";
const BASE_API                  =       import.meta.env.VITE_BASE_API;

//add contact
const addContact                =       async (contactData) => {
    try {
        const response          =       await axios.post(`${BASE_API}/contacts/create`, {
            name: contactData.name,
            phone: contactData.phone,
            address: contactData.address,
            email: contactData.email,
            favorite: contactData.favorite
        });
        return response.data;
    } catch (error) {
        console.error("Error adding contact:", error);
        throw error;
    }
};

//get all contacts
const getAllContacts            =       async () => {
    try {
        const response          =       await axios.get(`${BASE_API}/contacts`);
        return response.data.data;
    } catch (error) {
        console.error("Error fetching contacts:", error);
        throw error;
    }
};

//delete all contacts
const deleteAllContacts         =       async () => {
    try {
        const response = await axios.delete(`${BASE_API}/contacts/delete/all`);
        return response.data;
    } catch (error) {
        console.error("Error deleting contacts:", error);
        throw error;
    }
};

//delete one contact
const deleteContact             =       async (id) => {
    try {
        const response          =       await axios.delete(`${BASE_API}/contacts/delete/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting contact:", error);
        throw error;
    }
};

//edit contact
const editContact               =       async (id, contactData) => {
    try {
        const response          =       await axios.put(`${BASE_API}/contacts/update/${id}`, {
            name: contactData.name,
            phone: contactData.phone,
            address: contactData.address,
            email: contactData.email,
            favorite: contactData.favorite
        });
        return response.data;
    } catch (error) {
        console.error("Error editing contact:", error);
        throw error;
    }
};

//toggle favorite
const toggleFavorite            =       async (id, value) => {
    try {
        const response          =       await axios.put(`${BASE_API}/contacts/update/${id}`, {
            favorite: value
        });
        return response.data;
    } catch (error) {
        console.error("Error toggling favorite:", error);
        throw error;
    }
};

export {
    addContact,
    getAllContacts,
    deleteAllContacts,
    deleteContact,
    editContact,
    toggleFavorite
};