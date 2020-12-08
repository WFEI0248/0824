import{reqMenuList} from '../../util/request'


const state ={
    list:[], //请求回来的菜单数据

}


const mutations={
    changeList(state,arr){
        state.list = arr;
    }
}

const actions = {
    requestMenuList(context){
        //传参是否需要返回树形结构
        reqMenuList({istree:true}).then(res=>{
            context.commit('changeList',res.data.list)
        })
    }
}

const getters = {
    list(state){
        return state.list
    }
}


//不需要额外创建axios实例，直接导出方法
export default {
    state,  
    mutations,
    actions,
    getters,
    //作为模块引出的必填项!!
    namespaced:true
}