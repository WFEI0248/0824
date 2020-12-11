const state = {
    //用户登录成功的时候登录成功的信息会存储在session 中，如果能获取到list证明登录已经成功，将其装成JSON格式赋值即可
    list:sessionStorage.getItem('list')?JSON.parse(sessionStorage.getItem('list')):[],
}

const mutations = {
    changeList(state,obj){
        state.list = obj;
        sessionStorage.setItem('list',JSON.stringify(obj))
    }
}

const actions = {
    requestUserList(context,obj){
        context.commit('changeList',obj)
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
    namespaced:true,
}