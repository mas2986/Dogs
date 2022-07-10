import {GET_DOGS, GET_DOGS_BY_NAME, ORDER_BY_NAME,GET_DETAIL,CLEAR_STATE, GET_LOADING} from './constRedux';

const initialState = {
    dogs:[],
    dogsName:[],
    dogDetail:{},
    loading: true
}

const rootReducer = (state = initialState, action)=>{
    switch (action.type){
        case GET_DOGS:
            return{
                ...state,
                dogs:[...action.payload]
            }
        case GET_DOGS_BY_NAME:
            return{
                ...state,
                dogsName:[...action.payload]
            }
        case GET_DETAIL:
            return{
                ...state,
                dogDetail:action.payload
            }
        case ORDER_BY_NAME:
            let dogsName = state.dogs;
            dogsName = dogsName.sort((a,b)=>{
                if(a.name.toLowerCase()>b.name.toLowerCase()) return 1;
                if(a.name.toLowerCase()<b.name.toLowerCase()) return -1;
                return 0;
            })
            if(action.payload !== 'AaZ') dogsName = dogsName.reverse();
            return{
                ...state,
                dogs:dogsName
            }
        case GET_LOADING:
            return{
                ...state,
                loading: action.payload
            }
        case CLEAR_STATE:
            return{
                ...state,
                dogDetail:action.payload
            }
        default:
            return {...state}
    }
}

export default rootReducer;