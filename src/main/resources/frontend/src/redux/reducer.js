import {initialState} from './initialState';

export default function toDoListReducer(state = initialState, action) {
    switch(action.type) {
        case 'SET_CURRENT_USER': {
            return {
                ...state,
                currentUser: {...action.payload}
            }
        }
        
        case 'REMOVE_CURRENT_USER': {
            return {
                ...state,
                currentUser: { isAdmin: false }
            }
        }

        case 'SET_INITIAL_DATA': {
            return {
                ...state,
                senseis: [...action.payload.senseis],
                students: [...action.payload.students],
                profiles: [...action.payload.profiles]
            }
        }

		case 'SET_STUDENTS': {
            return {
                ...state,
                students: [...action.payload]
            }
        }

		case 'SET_SENSEIS': {
            return {
                ...state,
                senseis: [...action.payload]
            }
        }
        
        case 'SET_PROFILES': {
            return {
                ...state,
                profiles: [...action.payload]
            }
        }
    
        default: {
            return state;
        }
    }
}