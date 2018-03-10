//Actions
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER';
export const SET_INITIAL_DATA = 'SET_INITIAL_DATA';
export const SET_STUDENTS = 'SET_STUDENTS';
export const SET_SENSEIS = 'SET_SENSEIS';
export const SET_PROFILES = 'SET_PROFILES';

export const setCurrentUser = userData => ({
    type: SET_CURRENT_USER,
    payload: userData
});

export const removeCurrentUser = _ => ({
    type: REMOVE_CURRENT_USER
});

export const setInitialData = initialData => ({
    type: SET_INITIAL_DATA,
    payload: initialData
});

export const setStudents = students => ({
    type: SET_STUDENTS,
    payload: students
});

export const setSenseis = senseis => ({
    type: SET_SENSEIS,
    payload: senseis
});

export const setProfiles = profiles => ({
    type: SET_PROFILES,
    payload: profiles
});


