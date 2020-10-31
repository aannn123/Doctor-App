// Fungsi store sama seperti state. Store tempat menyimpan state global kita berada.
// karena kalau kita menggunakan useState biasa, kita hanya bisa memkai state itu di component/halaman itu berada saja

import {createStore} from 'redux';
// import { act } from 'react-test-renderer';

// fungsi create store sama seperti state bisa diisi value apa saja, tapi bedanya kita memerlukan value berupa function 
// Fungsi reducer akan membuat suatu konsep untuk merubaha state secara global

// State yaitu valuenya apa aja yang kita perlukan sedangkan action untuk merubah tipe tipe perubahan untuk merubah statenya

const initialState = {
    loading : false,
    name: 'Farhan Mustaqim',
    address: 'Bogor'
}

const reducer = (state = initialState, action) => {
    if (action.type === 'SET_LOADING') {
        return {
            ...state,
            loading : action.value
        }
    }
    if (action.type === 'SET_NAME') {
        return {
            ...state,
            name: action.value
        }
    }
    return state
}

const store = createStore(reducer)

export default store;