import axios from "axios";
import url from "postcss-url";
import qs from "qs";

const baseUrl = "/api";

axios.interceptors.response.use(res => {
  console.log(`=====请求路劲为${res.config.url}======`);
  console.log(res);
  return res;
});

//=============菜单模块的请求===========
//菜单添加
const reqMenuAdd = data => {
  return axios({
    url: baseUrl + "/api/menuadd",
    method: "post",
    data: data
  });
};

//菜单列表  get方式需要用params接收参数
const reqMenuList = data => {
  return axios({
    url: `${baseUrl}/api/menulist`,
    method: "get",
    params: data
  });
};

//菜单获取一条数据
const reqMenuOne = data => {
  return axios({
    url: `${baseUrl}/api/menuinfo`,
    method: "get",
    params: data
  });
};

//菜单修改
const reqMenuChange = data => {
  return axios({
    url: `${baseUrl}/api/menuedit`,
    method: "post",
    data
  });
};

//菜单删除一条数据
const reqMenuDel = data => {
  return axios({
    url: `${baseUrl}/api/menudelete`,
    method: "post",
    data
  });
};



//================角色管理================
//角色添加
const reqRoleAdd = data=>{
  return axios({
    url:`${baseUrl}/api/roleadd`,
    method:'post',
    data,
  })
}


//角色列表的查询
const reqRoleList = data=>{
    return axios({
        url: `${baseUrl}/api/rolelist`,
        method: "get",
        params:data,
      });
}

//角色获取一条
const reqRoleOne = data=>{
  return axios({
    url:`${baseUrl}/api/roleinfo`,
    method:'get',
    params:data,
  })
}

//角色修改
const reqRoleChange = data=>{
  return axios({
    url:`${baseUrl}/api/roleedit`,
    method:'post',
    data,
  })
}

//角色删除功能
const reqRoleDel = data=>{
  return axios({
    url:`${baseUrl}/api/roledelete`,
    method:'post',
    data,
  })
}

//=============== 管理员功能 =================
//管理员添加 需要传参
const reqMangerAdd = data=>{
  return axios({
    url:`${baseUrl}/api/useradd`,
    method:'post',
    data,
  })
}
//管理员总数（用于计算分页） 不需要传参
const reqMangerNum = data=>{
  return axios({
    url:`${baseUrl}/api/usercount`,
    method:'get',
    params:data,
  })
}
//管理员列表（分页  需要传参
const reqMangerList = data=>{
  return axios({
    url:`${baseUrl}/api/userlist`,
    method:'get',
    params:data,
  })
}
//管理员获取（一条   需要传参
const reqMangerOne = data=>{
  return axios({
    url:`${baseUrl}/api/userinfo`,
    method:'get',
    params:data,
  })
}
//管路员修改  需要传参
const reqMangerChange = data=>{
  return axios({
    url:`${baseUrl}/api/useredit`,
    method:'post',
    data,
  })
}
//管理员删除  需要传参
const reqMangerDel = data=>{
  return axios({
    url:`${baseUrl}/api/userdelete`,
    method:'post',
    data,
  })
}
//管理员登录  需要传参
const reqMangerLogin = data=>{
  return axios({
    url:`${baseUrl}/api/userlogin`,
    method:'post',
    data,
  })
}


//=============  商品分类   ===========
//添加
const reqCateAdd = data=>{
  let form = new FormData()
  for(let i in data){
    form.append(i,data[i])
  }
  return axios({
    url:`${baseUrl}/api/cateadd`,
    method:'post',
    data:form,
  })
}


//列表的查询
const reqCateList = data=>{
    return axios({
        url: `${baseUrl}/api/catelist`,
        method: "get",
        params:data,
      });
}

//获取一条
const reqCateOne = data=>{
  return axios({
    url:`${baseUrl}/api/cateinfo`,
    method:'get',
    params:data,
  })
}

//修改
const reqCateChange = data=>{
  let form = new FormData()
  for(let i in data){
    form.append(i,data[i])
  }
  return axios({
    url:`${baseUrl}/api/cateedit`,
    method:'post',
    data:form,
  })
}

//删除功能
const reqCateDel = data=>{
  return axios({
    url:`${baseUrl}/api/catedelete`,
    method:'post',
    data,
  })
}

// ============== 商品规格 ==========
//商品规格添加 需要传参
const reqSpecsAdd = data=>{
  return axios({
    url:`${baseUrl}/api/specsadd`,
    method:'post',
    data,
  })
}
//商品规格总数（用于计算分页） 不需要传参
const reqSpecsNum = data=>{
  return axios({
    url:`${baseUrl}/api/specscount`,
    method:'get',
    params:data,
  })
}
//商品规格列表（分页  需要传参
const reqSpecsList = data=>{
  return axios({
    url:`${baseUrl}/api/specslist`,
    method:'get',
    params:data,
  })
}
//商品规格获取（一条   需要传参
const reqSpecsOne = data=>{
  return axios({
    url:`${baseUrl}/api/specsinfo`,
    method:'get',
    params:data,
  })
}
//商品规格修改  需要传参
const reqSpecsChange = data=>{
  return axios({
    url:`${baseUrl}/api/specsedit`,
    method:'post',
    data,
  })
}
//商品规格删除  需要传参
const reqSpecsDel = data=>{
  return axios({
    url:`${baseUrl}/api/specsdelete`,
    method:'post',
    data,
  })
}


export { 
  //菜单功能
    reqMenuAdd,
    reqMenuList,
    reqMenuOne, 
    reqMenuDel, 
    reqMenuChange ,
    //角色功能
    reqRoleList,
    reqRoleAdd,
    reqRoleOne,
    reqRoleChange,
    reqRoleDel,
    //管理员功能
    reqMangerAdd,
    reqMangerNum,
    reqMangerList,
    reqMangerOne,
    reqMangerChange,
    reqMangerDel,
    reqMangerLogin,
    //商品分类功能
    reqCateList,
    reqCateAdd,
    reqCateOne,
    reqCateChange,
    reqCateDel,
    //商品规格
    reqSpecsAdd,
    reqSpecsNum,
    reqSpecsList,
    reqSpecsOne,
    reqSpecsChange,
    reqSpecsDel,

};
