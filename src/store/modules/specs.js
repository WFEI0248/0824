import {reqSpecsList} from '../../util/request'

const state = {
    list:[], 
}

const mutations = {
    changeList(state,arr){
        state.list = arr
    }
}

const actions = {
    requestSpecsList(context) {
        reqSpecsList({size:10,page:1}).then(res=>{
            let arr = res.data.list;
            arr.forEach(item=>{
                if(item.attrs){
                    item.attrs = JSON.parse(item.attrs)
                }
            })
            context.commit('changeList',arr)
        })
    }
}

const getters = {
    list(state){
        return state.list
    }
}


export default {
    state,
    mutations,
    actions,
    getters,
    namespaced:true
}