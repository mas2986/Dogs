import {GET_DOGS,GET_TEMPERAMENTS, GET_DOGS_BY_NAME, GET_DETAIL, ADD_DOG ,ORDER_BY_NAME,ORDER_BY_WEIGHT, FILTER_BY_TEMPERAMENTS, CLEAR_STATE} from './constRedux';

const initialState = {
    dogs:[],
    dogsName:[],
    dogDetail:{},
    temperaments:[],
    loading: true
}

const rootReducer = (state = initialState, action)=>{
    switch (action.type){
        case GET_DOGS:
            return{
                ...state,
                dogs:[...action.payload],
                allDogs: [...action.payload],
                loading:false
            }
        case GET_TEMPERAMENTS:
            return{
                ...state,
                temperaments:[...action.payload]
            }
        case GET_DOGS_BY_NAME:
            return{
                ...state,
                dogsName:[...action.payload],
                loading:false
            }
        case GET_DETAIL:
            return{
                ...state,
                dogDetail:action.payload,
                loading:false
            }
        case ADD_DOG:
            return{
                ...state
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
        case ORDER_BY_WEIGHT:
            let dogsWeight = state.dogs;
            dogsWeight = dogsWeight.sort(function(a,b){
                if(a.weight[0]>b.weight[0]) return 1;
                if(a.weight[0]<b.weight[0]) return -1;
                return 0;
            });
            if(action.payload!=='MinMax') dogsWeight = dogsWeight.reverse();
            return{
                ...state,
                dogs:dogsWeight
            }
        case FILTER_BY_TEMPERAMENTS:
            let dogsTemperaments = state.allDogs;
            if(action.payload!=='todos') dogsTemperaments = dogsTemperaments.filter(el=>el.temperaments?.includes(action.payload));
            return{
                ...state,
                dogs:dogsTemperaments
            }
            case CLEAR_STATE:
            return{
                ...state,
                dogDetail:{},
                dogsName:[],
                dogs:[],
                loading:true
            }
        default:
            return {...state}
    }
}

export default rootReducer;