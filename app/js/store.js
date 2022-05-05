import { createStore /*, applyMiddleware, compose*/ } from 'redux';
import appReducer from './reducers/index';

//Store = Globalized store
//Action => create/update state for service definitions(create or update) new service definitions
//Action => create/update state for service partitions
/*
state:{
  ServiceDefinitions:{
    service1:{
      serviceName:service1,
      partitionKeyDef:botId,
      noofPartitions:1,
    },
    service2:{
      serviceName:service2,
      partitionKeyDef:tenantId,botId,
      noofPartitions:0,
    },
  },
  ServicePartitions:{
    service1:{
      partitionKeys:["1110|1000","aisera_10000|2"],
    },
    service2:{
      partitionKeys:["1011|1011","aisera_salesforce|3"],
    },
  }
}
 */

//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  appReducer
  //composeEnhancers(applyMiddleware(thunkMiddleware))
);
